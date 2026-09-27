'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import JoinSection from '../components/Join';
import ImpactCard from '../components/ImpactCard';
import OutlineIcon from '../components/OutlineIcon';
import { eventBySlug } from '../data/events';
import { impactItems, relatedTo, sectionLabel, type ImpactItem } from '../data/impact';
import { asset } from '../lib/asset';

// The page behind every card in أثر ناجية: a recognition, a TV piece, a
// news story or a publication, told on the site with its source named.

const anchor: Record<ImpactItem['section'], string> = {
  recognition: 'recognition',
  media: 'media',
  press: 'press',
  research: 'research',
};

export default function ImpactDetail({ item }: { item: ImpactItem }) {
  const [entered, setEntered] = useState(false);
  useEffect(() => { const t = requestAnimationFrame(() => setEntered(true)); return () => cancelAnimationFrame(t); }, []);
  const step = (i: number): React.CSSProperties => ({
    opacity: entered ? 1 : 0,
    transform: entered ? 'translateY(0)' : 'translateY(18px)',
    transition: `opacity 0.6s ease ${i * 110}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 110}ms`,
  });

  const event = item.event ? eventBySlug(item.event) : undefined;
  const related = relatedTo(item);
  const more = impactItems.filter((i) => i.section === item.section && i.slug !== item.slug && !related.includes(i)).slice(0, 3);
  const wash = item.image ?? item.video?.poster;

  return (
    <>
      <header className="relative overflow-hidden bg-dark">
        {wash && <img src={asset(wash)} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-30" />}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/85 to-dark" />
        <div className={`relative max-w-7xl mx-auto px-6 lg:px-12 pt-32 lg:pt-36 pb-14 lg:pb-20 grid grid-cols-1 gap-10 lg:gap-14 items-center ${item.image || item.video ? 'lg:grid-cols-[1fr_1fr]' : ''}`}>
          <div>
            <nav className="flex flex-wrap items-center gap-2 text-xs mb-6 text-white/70" aria-label="مسار التنقل" style={step(0)}>
              <Link href="/" className="py-1.5 hover:text-white">الرئيسية</Link><span aria-hidden="true">/</span>
              <Link href="/impact" className="py-1.5 hover:text-white">أثر ناجية</Link><span aria-hidden="true">/</span>
              <Link href={`/impact#${anchor[item.section]}`} className="py-1.5 hover:text-white">{sectionLabel[item.section]}</Link>
            </nav>
            <div className="flex flex-wrap items-center gap-3 mb-5" style={step(1)}>
              <span className="bg-gold-400 text-dark px-3.5 py-1 rounded-full text-sm font-bold">{item.year}</span>
              <span className="bg-white/15 text-white px-3.5 py-1 rounded-full text-sm font-bold">{sectionLabel[item.section]}</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-5" style={step(2)}>{item.title}</h1>
            <p className="text-gold-200 font-bold" style={step(3)}>{[item.by, item.date].filter(Boolean).join(' · ')}</p>
          </div>
          {item.video ? (
            <div style={step(2)}>
              <video src={asset(item.video.src)} poster={asset(item.video.poster)} controls playsInline preload="metadata" className="w-full aspect-video rounded-[1.75rem] bg-black ring-1 ring-white/15 shadow-2xl shadow-black/40" />
            </div>
          ) : item.image ? (
            <figure style={step(2)}>
              <img src={asset(item.image)} alt={item.title} className="w-full max-w-[40rem] mx-auto max-h-[28rem] object-contain rounded-[1.75rem] bg-white ring-1 ring-white/15 shadow-2xl shadow-black/40" />
            </figure>
          ) : null}
        </div>
      </header>

      <section className="py-16 lg:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-10 lg:gap-16">
          <div>
            <p className="text-xl lg:text-2xl font-extrabold text-dark leading-relaxed mb-6">{item.summary}</p>
            {item.body.map((p) => <p key={p} className="text-mid leading-loose mb-4 max-w-3xl">{p}</p>)}
            {item.quote && (
              <blockquote className="mt-8 bg-white border border-purple-100 rounded-2xl p-6 text-dark text-lg font-bold leading-loose">«{item.quote}»</blockquote>
            )}
          </div>
          <aside className="space-y-6">
            {item.facts && item.facts.length > 0 && (
              <dl className="bg-white border border-purple-100 rounded-2xl p-6 space-y-4">
                {item.facts.filter((f) => f.value).map((f) => (
                  <div key={f.label}>
                    <dt className="text-xs font-bold text-mid mb-0.5">{f.label}</dt>
                    <dd className="text-sm font-bold text-dark leading-relaxed">{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {event && (
              <Link href={`/events/${event.slug}`} className="story-card group flex items-center gap-4 bg-white border border-purple-100 rounded-2xl p-3 pl-5 hover:shadow-lg hover:shadow-purple-100/60 transition-all">
                <span className="w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-dark">
                  <img src={asset(event.cover)} alt="" className="w-full h-full object-cover" style={{ objectPosition: event.coverPosition ?? 'center' }} />
                </span>
                <span>
                  <span className="block text-xs text-mid mb-1">صفحة الفعالية · {event.year}</span>
                  <span className="block font-extrabold text-dark leading-snug group-hover:text-purple-500 transition-colors">{event.title}</span>
                </span>
              </Link>
            )}
            {item.sources && item.sources.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-mid mb-3">المصدر</h2>
                <ul className="space-y-2">
                  {item.sources.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-dark leading-relaxed">
                      <OutlineIcon name="book" className="w-4 h-4 mt-0.5 text-purple-500 flex-shrink-0" />{s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 lg:py-20 bg-white border-t border-purple-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-2xl font-extrabold text-dark mb-8">ذات <span className="text-purple-500">صلة</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((m) => <ImpactCard key={m.slug} item={m} />)}
            </div>
          </div>
        </section>
      )}
      {more.length > 0 && (
        <section className="py-16 lg:py-20 bg-cream border-t border-purple-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-end justify-between gap-4 mb-8">
              <h2 className="text-2xl font-extrabold text-dark">المزيد من <span className="text-purple-500">{sectionLabel[item.section]}</span></h2>
              <Link href={`/impact#${anchor[item.section]}`} className="text-purple-500 text-sm font-bold hover:text-purple-700">أثر ناجية</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {more.map((m) => <ImpactCard key={m.slug} item={m} />)}
            </div>
          </div>
        </section>
      )}
      <JoinSection />
    </>
  );
}
