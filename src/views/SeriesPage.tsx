'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import JoinSection from '../components/Join';
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
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const clip = clips[index];

  // Open the clip named in the hash (links from search results land on it).
  useEffect(() => {
    const fromHash = () => {
      const i = clips.findIndex((c) => `#${c.slug}` === window.location.hash);
      if (i >= 0) setIndex(i);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, [clips]);

  // Keep the active item visible inside the playlist without moving the page.
  useEffect(() => {
    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>(`[data-index="${index}"]`);
    if (list && item) list.scrollTo({ top: item.offsetTop - list.clientHeight / 2 + item.clientHeight / 2, behavior: 'smooth' });
  }, [index]);

  const play = useCallback((i: number) => {
    setIndex(i);
    setAutoplay(true);
    history.replaceState(null, '', `#${clips[i].slug}`);
  }, [clips]);

  const onEnded = () => { if (index < clips.length - 1) play(index + 1); };

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
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[22rem_minmax(0,1fr)] gap-6 items-start">
          {/* Playlist: first in the DOM, so it sits on the right in RTL. */}
          <aside className="order-2 lg:order-1 bg-white/5 border border-white/10 rounded-[1.5rem] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-white font-extrabold">قائمة المقاطع</h2>
              <span className="text-dusk-200 text-xs font-bold">{ar(index + 1)} من {ar(clips.length)}</span>
            </div>
            <ol ref={listRef} className="relative max-h-[26rem] lg:max-h-[34rem] overflow-y-auto p-2 space-y-1">
              {clips.map((c, i) => (
                <li key={c.slug} data-index={i}>
                  <button
                    type="button"
                    onClick={() => play(i)}
                    aria-current={i === index ? 'true' : undefined}
                    className={`w-full flex items-start gap-3 text-right rounded-xl p-3 transition-colors ${i === index ? 'bg-purple-500 text-white' : 'text-purple-100 hover:bg-white/10'}`}
                  >
                    <span className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${i === index ? 'bg-gold-400 text-dark' : 'bg-white/10 text-white'}`}>
                      {i === index ? (
                        <svg className="w-3.5 h-3.5 translate-x-[1px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg>
                      ) : ar(i + 1)}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-bold text-sm leading-snug">{c.title}</span>
                      <span className={`block text-xs mt-1 ${i === index ? 'text-purple-100' : 'text-dusk-200'}`}>{c.topic} · {c.duration}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </aside>

          <div className="order-1 lg:order-2">
            <video
              ref={videoRef}
              key={clip.src}
              src={asset(clip.src)}
              poster={asset(clip.poster)}
              controls
              playsInline
              autoPlay={autoplay}
              preload="metadata"
              onEnded={onEnded}
              className="w-full aspect-video rounded-[1.5rem] bg-black"
            />
            <div className="mt-5 flex flex-col sm:flex-row sm:items-start justify-between gap-5">
              <div>
                <span className="text-xs font-bold text-gold-200">المقطع {ar(index + 1)} · {clip.topic} · {clip.duration}</span>
                <h2 className="text-white text-xl lg:text-2xl font-extrabold leading-snug mt-1 mb-2">{clip.title}</h2>
                <p className="text-purple-200 text-sm leading-relaxed max-w-3xl">{clip.desc}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button type="button" disabled={index === 0} onClick={() => play(index - 1)} className="min-h-11 inline-flex items-center gap-2 px-4 rounded-full text-sm font-bold bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
                  السابق
                </button>
                <button type="button" disabled={index === clips.length - 1} onClick={() => play(index + 1)} className="min-h-11 inline-flex items-center gap-2 px-4 rounded-full text-sm font-bold bg-gold-400 text-dark hover:bg-gold-300 disabled:opacity-30 disabled:pointer-events-none transition-colors">
                  التالي
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
                </button>
              </div>
            </div>
          </div>
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
