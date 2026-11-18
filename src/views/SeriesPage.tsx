'use client';

import Link from 'next/link';
import JoinSection from '../components/Join';
import ClipPlaylist from '../components/ClipPlaylist';
import OutlineIcon from '../components/OutlineIcon';
import { eventBySlug } from '../data/events';
import { clipsOf, type VideoSeries } from '../data/videos';
import { Disclaimer } from './KnowledgePage';
import { asset } from '../lib/asset';

// One recorded session, cut into clips: the player sits on the left, the
// playlist on the right (RTL start), and each clip rolls into the next.
// The current clip is kept in the URL hash so a clip can be shared.

const ar = (n: number) => n.toLocaleString('ar-SA');

export default function SeriesPage({ series }: { series: VideoSeries }) {
  const clips = clipsOf(series.slug);
  const event = eventBySlug(series.slug);
  return (
    <>
      <header className="relative bg-dark pt-32 lg:pt-36 pb-10 overflow-hidden">
        <img src={asset(series.cover)} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 to-dark" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <nav className="flex flex-wrap items-center gap-2 text-xs mb-6 text-white/70" aria-label="مسار التنقل">
            <Link href="/" className="py-1.5 hover:text-white">الرئيسية</Link><span aria-hidden="true">/</span>
            <Link href="/knowledge/videos" className="py-1.5 hover:text-white">فيديوهات</Link><span aria-hidden="true">/</span>
            <span className="text-gold-200">{series.title}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-gold-400 text-dark px-3.5 py-1 rounded-full text-sm font-bold">{series.year}</span>
            <span className="bg-white/15 text-white px-3.5 py-1 rounded-full text-sm font-bold">{series.kind}</span>
            <span className="bg-white/15 text-white px-3.5 py-1 rounded-full text-sm font-bold">{ar(clips.length)} مقطعًا</span>
          </div>
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4">{series.title}</h1>
          <p className="text-purple-200 leading-loose max-w-3xl">{series.summary}</p>
        </div>
      </header>

      <section className="bg-dark pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ClipPlaylist clips={clips.map((c) => ({ slug: c.slug, title: c.title, meta: `${c.topic} · ${c.duration}`, desc: c.desc, src: c.src, poster: c.poster }))} />
        </div>
      </section>

      {event && (
        <section className="py-16 lg:py-20 bg-cream">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-10 lg:gap-16">
            <div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-dark mb-6">عن <span className="text-purple-500">اللقاء</span></h2>
              {event.details?.map((p) => <p key={p} className="text-mid leading-loose mb-4 max-w-3xl">{p}</p>)}
              {event.videos?.map((v) => (
                <figure key={v.src} className="mt-8 max-w-2xl">
                  <video src={asset(v.src)} poster={asset(v.poster)} controls preload="none" playsInline className="w-full aspect-video rounded-2xl bg-black" />
                  <figcaption className="text-mid text-sm mt-3">{v.caption}</figcaption>
                </figure>
              ))}
            </div>
            <aside className="space-y-6">
              <div className="bg-white border border-purple-100 rounded-2xl p-6 space-y-3">
                {[
                  { icon: 'calendar' as const, text: event.date },
                  { icon: 'clock' as const, text: event.time },
                  { icon: 'pin' as const, text: event.venue },
                ].filter((f) => f.text).map((f) => (
                  <div key={f.icon} className="flex items-start gap-3 text-sm text-dark font-semibold">
                    <OutlineIcon name={f.icon} className="w-4 h-4 mt-0.5 text-purple-500 flex-shrink-0" />
                    {f.text}
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-sm font-bold text-mid mb-3">شارك في اللقاء</h3>
                <ul className="space-y-2">
                  {series.speakers.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-dark font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-gold-400" />{s}</li>
                  ))}
                </ul>
              </div>
              {event.sources && event.sources.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-mid mb-3">المصادر</h3>
                  <ul className="space-y-3">
                    {event.sources.map((s) => (
                      <li key={s.title} className="text-sm leading-relaxed">
                        <span className="block text-dark font-semibold">{s.title}</span>
                        <span className="block text-xs text-mid">{[s.publisher, s.date].filter(Boolean).join(' · ')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-12"><Disclaimer /></div>
        </section>
      )}
      <JoinSection />
    </>
  );
}
