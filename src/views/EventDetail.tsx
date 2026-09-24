'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import JoinSection from '../components/Join';
import OutlineIcon, { type IconName } from '../components/OutlineIcon';
import { najiaEvents, type EventPhoto, type NajiaEvent, type ProgramItem } from '../data/events';
import { useScrollReveal } from '../hooks/useScrollReveal';

import { asset } from '../lib/asset';
// ── Lightbox: enlarges agenda pages and gallery photos ──
function Lightbox({ items, index, onClose, onMove }: { items: EventPhoto[]; index: number; onClose: () => void; onMove: (i: number) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      // RTL: the visual "next" arrow points left.
      if (e.key === 'ArrowLeft') onMove((index + 1) % items.length);
      if (e.key === 'ArrowRight') onMove((index - 1 + items.length) % items.length);
    };
    document.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [index, items.length, onClose, onMove]);

  const item = items[index];
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-10" role="dialog" aria-modal="true" aria-label={item.caption}>
      <button type="button" aria-label="إغلاق" onClick={onClose} className="absolute inset-0 bg-dark/85 backdrop-blur-sm cursor-default" style={{ animation: 'fadeIn 0.2s ease' }} />
      <figure className="relative max-w-5xl w-full max-h-full flex flex-col items-center" style={{ animation: 'scaleIn 0.3s cubic-bezier(0.16,1,0.3,1)' }}>
        <img key={item.src} src={asset(item.src)} alt={item.caption} className="max-h-[80vh] w-auto rounded-2xl shadow-2xl bg-white" />
        <figcaption className="text-white/90 text-sm mt-4 text-center">{item.caption}</figcaption>
      </figure>
      <button type="button" onClick={onClose} aria-label="إغلاق" className="absolute top-5 left-5 w-11 h-11 rounded-full bg-white/90 text-dark flex items-center justify-center hover:bg-white">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
      {items.length > 1 && (
        <>
          <button type="button" aria-label="السابق" onClick={() => onMove((index - 1 + items.length) % items.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/85 text-dark flex items-center justify-center hover:bg-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
          <button type="button" aria-label="التالي" onClick={() => onMove((index + 1) % items.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/85 text-dark flex items-center justify-center hover:bg-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
        </>
      )}
    </div>
  );
}

function useLightbox(items: EventPhoto[]) {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const node = index === null ? null : <Lightbox items={items} index={index} onClose={close} onMove={setIndex} />;
  return { open: setIndex, node };
}

// ── Sections ──

function SectionTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return <h2 id={id} className="scroll-mt-28 text-2xl lg:text-3xl font-extrabold text-dark mb-8">{children}</h2>;
}

function Hero({ event }: { event: NajiaEvent }) {
  const [entered, setEntered] = useState(false);
  useEffect(() => { const t = requestAnimationFrame(() => setEntered(true)); return () => cancelAnimationFrame(t); }, []);
  const step = (i: number): React.CSSProperties => ({
    opacity: entered ? 1 : 0,
    transform: entered ? 'translateY(0)' : 'translateY(18px)',
    transition: `opacity 0.6s ease ${i * 110}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 110}ms`,
  });

  const chips: { icon: IconName; text?: string }[] = [
    { icon: 'calendar', text: event.date },
    { icon: 'clock', text: event.time },
    { icon: 'pin', text: event.venue },
  ];

  // The page's own cover: a real photo shown whole and sharp beside the title,
  // not stretched full-bleed under a dark veil. Event photos come from phone
  // footage (~850px wide), so they are displayed near their native size.
  const hero = event.hero ?? event.cover;
  const heroPosition = event.heroPosition ?? (event.hero ? 'center' : event.coverPosition ?? 'center');

  return (
    <header className="relative overflow-hidden bg-dark">
      {/* Soft wash of the same photo behind everything, for colour only. */}
      <img src={asset(hero)} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/80 to-dark" />

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 pt-32 lg:pt-36 pb-14 lg:pb-20 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
        <div>
          <nav className="flex flex-wrap items-center gap-2 text-xs mb-6 text-white/70" aria-label="مسار التنقل" style={step(0)}>
            <Link href="/" className="py-1.5 hover:text-white">الرئيسية</Link><span aria-hidden="true">/</span>
            <Link href="/discover#events" className="py-1.5 hover:text-white">الملتقيات</Link><span aria-hidden="true">/</span>
            <span className="text-gold-200">{event.title}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-3 mb-5" style={step(1)}>
            <span className="bg-gold-400 text-dark px-3.5 py-1 rounded-full text-sm font-bold">{event.year}</span>
            <span className="bg-white/15 text-white px-3.5 py-1 rounded-full text-sm font-bold">{event.kind}</span>
          </div>
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight mb-7" style={step(2)}>{event.fullTitle}</h1>
          <div className="flex flex-wrap gap-3" style={step(3)}>
            {chips.filter((c) => c.text).map((c) => (
              <span key={c.icon} className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold">
                <OutlineIcon name={c.icon} className="w-4 h-4 text-gold-200" />
                {c.text}
              </span>
            ))}
          </div>
        </div>

        <figure style={step(2)}>
          <img
            src={asset(hero)}
            alt={`من ${event.fullTitle}`}
            className="w-full max-w-[44rem] mx-auto aspect-[16/10] object-cover rounded-[1.75rem] ring-1 ring-white/15 shadow-2xl shadow-black/40 transition-transform duration-[1600ms] ease-out"
            style={{ objectPosition: heroPosition, transform: entered ? 'scale(1)' : 'scale(1.03)' }}
          />
        </figure>
      </div>
    </header>
  );
}

function Overview({ event }: { event: NajiaEvent }) {
  const { ref, visible } = useScrollReveal(0.12);
  const jump = [
    event.program?.length || event.agendaImages?.length ? { id: 'program', label: 'برنامج اليوم' } : null,
    event.videos?.length ? { id: 'videos', label: 'الفيديوهات' } : null,
    event.photos?.length ? { id: 'photos', label: 'الصور' } : null,
    event.sources?.length ? { id: 'sources', label: 'في الإعلام' } : null,
  ].filter(Boolean) as { id: string; label: string }[];

  return (
    <section className="py-16 lg:py-20 bg-cream">
      <div ref={ref} className={`max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-10 lg:gap-16 reveal-hidden ${visible ? 'reveal-visible' : ''}`}>
        <div>
          <p className="text-xl lg:text-2xl font-extrabold text-dark leading-relaxed mb-5">{event.summary}</p>
          {event.details?.map((p) => <p key={p} className="text-mid leading-loose mb-4 max-w-3xl">{p}</p>)}
          {event.notes && <p className="text-gold-600 text-sm mt-4">{event.notes}</p>}
        </div>
        <aside className="space-y-6">
          {jump.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-mid mb-3">في هذه الصفحة</h3>
              <div className="flex flex-wrap gap-2">
                {jump.map((j) => (
                  <a key={j.id} href={`#${j.id}`} className="bg-white border border-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-bold hover:border-purple-300 transition-colors">{j.label}</a>
                ))}
              </div>
            </div>
          )}
          {[
            { label: 'بالشراكة مع', items: event.partners },
            { label: 'برعاية', items: event.sponsors },
          ].map((group) => group.items && group.items.length > 0 && (
            <div key={group.label}>
              <h3 className="text-sm font-bold text-mid mb-3">{group.label}</h3>
              <ul className="space-y-2">
                {group.items.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-dark font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0" />{p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}

function Program({ event }: { event: NajiaEvent }) {
  const { ref, visible } = useScrollReveal(0.08);
  const agenda = event.agendaImages ?? [];
  const lightbox = useLightbox(agenda);
  const rows = event.program ?? [];
  if (!rows.length && !agenda.length) return null;

  // Group rows by day when the program spans several days.
  const days = rows.reduce<Record<string, ProgramItem[]>>((acc, row) => {
    const key = row.day ?? '';
    (acc[key] ||= []).push(row);
    return acc;
  }, {});

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionTitle id="program">برنامج <span className="text-purple-500">اليوم</span></SectionTitle>
        <div className={`grid grid-cols-1 ${agenda.length ? 'lg:grid-cols-[1.3fr_0.7fr]' : ''} gap-10 items-start`}>
          {rows.length > 0 && (
            <div className="space-y-10">
              {Object.entries(days).map(([day, items]) => (
                <div key={day || 'single'}>
                  {day && <h3 className="text-lg font-extrabold text-purple-600 mb-4">{day}</h3>}
                  <ol className="relative border-r-2 border-purple-100 pr-6 space-y-5">
                    {items.map((row, i) => (
                      <li
                        key={`${row.time}-${i}`}
                        className="relative"
                        style={{
                          opacity: visible ? 1 : 0,
                          transform: visible ? 'translateY(0)' : 'translateY(12px)',
                          transition: `opacity 0.5s ease ${i * 60}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms`,
                        }}
                      >
                        <span className="absolute -right-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-white border-[3px] border-gold-400" />
                        <div className="text-sm font-extrabold text-gold-600 mb-0.5" dir="ltr" style={{ textAlign: 'right' }}>{row.time}</div>
                        <div className="font-bold text-dark leading-relaxed">{row.title}</div>
                        {row.speaker && <div className="text-sm text-mid mt-0.5">{row.speaker}</div>}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          )}
          {agenda.length > 0 && (
            <div className="space-y-4 lg:sticky lg:top-28">
              {agenda.map((img, i) => (
                <button key={img.src} type="button" onClick={() => lightbox.open(i)} className="group block w-full text-right focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-500/30 rounded-2xl">
                  <img src={asset(img.src)} alt={img.caption} loading="lazy" className="w-full rounded-2xl border border-purple-100 shadow-sm group-hover:shadow-lg transition-shadow" />
                  <span className="block text-xs text-mid mt-2">{img.caption} — اضغطي للتكبير</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {lightbox.node}
    </section>
  );
}

// Click-to-load: the poster stands in until the visitor presses play, so no
// YouTube script or cookie loads with the page.
function YouTubeEmbed({ id, poster, title }: { id: string; poster: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        className="w-full aspect-video rounded-2xl bg-black"
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`تشغيل: ${title}`}
      className="group relative block w-full aspect-video rounded-2xl overflow-hidden bg-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold-200/50"
    >
      <img src={asset(poster)} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="w-16 h-16 rounded-full bg-white/95 text-purple-600 flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
          <svg className="w-7 h-7 translate-x-[2px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg>
        </span>
      </span>
      <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded-full">يوتيوب</span>
    </button>
  );
}

function Videos({ event }: { event: NajiaEvent }) {
  const { ref, visible } = useScrollReveal(0.08);
  const videos = event.videos ?? [];
  if (!videos.length) return null;
  // All-landscape sets sit two per row; mixed sets let landscape clips span two of three columns.
  const allLandscape = videos.every((v) => v.orientation === 'landscape');
  return (
    <section className="py-16 lg:py-20 bg-dark">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 id="videos" className="scroll-mt-28 text-2xl lg:text-3xl font-extrabold text-white mb-8">من أجواء <span className="text-gold-200">الفعالية</span></h2>
        <div className={`grid grid-cols-1 gap-6 items-start ${allLandscape ? (videos.length > 1 ? 'lg:grid-cols-2' : 'max-w-4xl') : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
          {videos.map((v, i) => (
            <figure
              key={v.src ?? v.youtubeId}
              className={`${!allLandscape && v.orientation === 'landscape' ? 'sm:col-span-2' : ''} reveal-hidden ${visible ? 'reveal-visible' : ''}`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              {v.youtubeId ? (
                <YouTubeEmbed id={v.youtubeId} poster={asset(v.poster)} title={v.caption} />
              ) : (
                <video
                  src={v.src && asset(v.src)}
                  poster={asset(v.poster)}
                  controls
                  preload="none"
                  playsInline
                  className={`w-full rounded-2xl bg-black ${v.orientation === 'portrait' ? 'aspect-[9/16] object-cover' : 'aspect-video object-contain'}`}
                />
              )}
              <figcaption className="text-purple-200 text-sm leading-relaxed mt-3">{v.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Photos({ event }: { event: NajiaEvent }) {
  const { ref, visible } = useScrollReveal(0.08);
  const photos = event.photos ?? [];
  const lightbox = useLightbox(photos);
  if (!photos.length) return null;
  return (
    <section className="py-16 lg:py-20 bg-cream">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionTitle id="photos">صور <span className="text-purple-500">من الفعالية</span></SectionTitle>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => lightbox.open(i)}
              className={`story-card group mb-5 block w-full break-inside-avoid text-right rounded-2xl overflow-hidden bg-white border border-purple-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-500/30 reveal-hidden ${visible ? 'reveal-visible' : ''}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <img src={asset(p.src)} alt={p.caption} loading="lazy" className="w-full" />
              <span className="block p-4 text-sm text-mid leading-relaxed">{p.caption}</span>
            </button>
          ))}
        </div>
      </div>
      {lightbox.node}
    </section>
  );
}

const sourceKindLabel: Record<string, string> = {
  news: 'خبر', video: 'فيديو', social: 'منشور', official: 'مصدر رسمي', academic: 'منشور علمي',
};

function Sources({ event }: { event: NajiaEvent }) {
  const sources = event.sources ?? [];
  if (!sources.length) return null;
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionTitle id="sources">في <span className="text-purple-500">الإعلام</span></SectionTitle>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 bg-cream border border-purple-100 rounded-2xl p-5 hover:border-purple-300 hover:shadow-md transition-all">
                <span className="bg-white text-purple-600 px-3 py-1 rounded-full text-xs font-bold flex-shrink-0">{sourceKindLabel[s.kind] ?? 'رابط'}</span>
                <span className="flex-1">
                  <span className="block font-bold text-dark leading-snug group-hover:text-purple-500 transition-colors">{s.title}</span>
                  {(s.publisher || s.date) && <span className="block text-xs text-mid mt-1">{[s.publisher, s.date].filter(Boolean).join(' · ')}</span>}
                </span>
                <svg className="w-4 h-4 mt-1 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5M19 5l-8 8M10 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4" /></svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PrevNext({ event }: { event: NajiaEvent }) {
  const i = najiaEvents.findIndex((e) => e.slug === event.slug);
  const prev = najiaEvents[i - 1];
  const next = najiaEvents[i + 1];
  if (!prev && !next) return null;
  const card = (e: NajiaEvent, label: string) => (
    <Link href={`/events/${e.slug}`} className="story-card group flex items-center gap-4 bg-white border border-purple-100 rounded-2xl p-3 pl-5 hover:shadow-lg hover:shadow-purple-100/60 transition-all">
      <span className="w-24 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-dark">
        <img src={asset(e.cover)} alt="" className="w-full h-full object-cover" style={{ objectPosition: e.coverPosition ?? 'center' }} />
      </span>
      <span>
        <span className="block text-xs text-mid mb-1">{label} · {e.year}</span>
        <span className="block font-extrabold text-dark leading-snug group-hover:text-purple-500 transition-colors">{e.title}</span>
      </span>
    </Link>
  );
  return (
    <section className="py-12 bg-cream border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>{prev && card(prev, 'الفعالية السابقة')}</div>
        <div>{next && card(next, 'الفعالية التالية')}</div>
      </div>
    </section>
  );
}

export default function EventDetail({ event }: { event: NajiaEvent }) {
  return (
    <>
      <Hero event={event} />
      <Overview event={event} />
      <Program event={event} />
      <Videos event={event} />
      <Photos event={event} />
      <Sources event={event} />
      <PrevNext event={event} />
      <JoinSection />
    </>
  );
}
