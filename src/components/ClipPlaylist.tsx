'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { asset } from '../lib/asset';

// A recording cut into clips: the player sits on the left, the playlist on
// the right (RTL start), and each clip rolls into the next. The current clip
// is kept in the URL hash so a clip can be shared or linked to.

export type PlaylistClip = {
  slug: string;
  title: string;
  meta: string; // short line under the title (topic / speaker · duration)
  desc?: string;
  src: string;
  poster: string;
};

const ar = (n: number) => n.toLocaleString('ar-SA');

export default function ClipPlaylist({ clips, heading = 'قائمة المقاطع', unit = 'المقطع' }: { clips: PlaylistClip[]; heading?: string; unit?: string }) {
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
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
    <div className="grid grid-cols-1 lg:grid-cols-[22rem_minmax(0,1fr)] gap-6 items-start">
      {/* Playlist: first in the DOM, so it sits on the right in RTL. */}
      <aside className="order-2 lg:order-1 bg-white/5 border border-white/10 rounded-[1.5rem] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-white font-extrabold">{heading}</h2>
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
                  <span className={`block text-xs mt-1 ${i === index ? 'text-purple-100' : 'text-dusk-200'}`}>{c.meta}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </aside>

      <div className="order-1 lg:order-2">
        <video
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
            <span className="text-xs font-bold text-gold-200">{unit} {ar(index + 1)} · {clip.meta}</span>
            <h2 className="text-white text-xl lg:text-2xl font-extrabold leading-snug mt-1 mb-2">{clip.title}</h2>
            {clip.desc && <p className="text-purple-200 text-sm leading-relaxed max-w-3xl">{clip.desc}</p>}
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
  );
}
