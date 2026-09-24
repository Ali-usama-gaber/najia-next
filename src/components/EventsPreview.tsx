'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import OutlineIcon from './OutlineIcon';
import { timelineEvents, type TimelineEvent } from './Timeline';
import { eventForTitle, type NajiaEvent } from '../data/events';

// Scroll-pinned milestones: the section sticks while scrolling walks through
// the years ٢٠١٦ → ٢٠٢٦, then the page continues normally. The full editorial
// timeline lives on عن ناجية and عالم ناجية.
type YearStop = { year: string; events: TimelineEvent[]; cover?: NajiaEvent };

const VH_PER_STOP = 28; // scroll budget per year (45 felt sluggish)

// Opacity for a card `t` stops away from the current position (t in 0..1).
// Full strength until 0.3, gone by 0.55, so the hand-off window is short and
// both neighbours are faint inside it — a constant-power (cosine) curve instead
// leaves the two cards at ~0.71 each right in the middle of the hand-off, which
// stacks two readable cards on top of each other.
const fade = (t: number) => Math.min(1, Math.max(0, 1 - (t - 0.3) / 0.25));

// Years without an event page keep the same three-zone card layout: a tinted
// tile carrying the Najia mark stands in for the missing cover, so a card
// never leaves half its width empty. Colours follow Timeline's type map.
const TILE: Record<TimelineEvent['type'], { bg: string; fg: string }> = {
  founding: { bg: 'bg-gold-50 border border-gold-200', fg: 'text-gold-500' },
  award: { bg: 'bg-purple-50 border border-purple-200', fg: 'text-purple-500' },
  event: { bg: 'bg-purple-50 border border-purple-200', fg: 'text-purple-500' },
  milestone: { bg: 'bg-white/70 border border-gold-200', fg: 'text-gold-500' },
};

export default function EventsPreview() {
  const stops = useMemo<YearStop[]>(() => {
    const byYear: YearStop[] = [];
    for (const event of timelineEvents) {
      const last = byYear[byYear.length - 1];
      if (last && last.year === event.year) last.events.push(event);
      else byYear.push({ year: event.year, events: [event] });
    }
    // One cover per year. A year's first entry is not always its headline
    // event (the survivors' day booth opens both ٢٠٢٤ and ٢٠٢٥, so both years
    // used to show the same photo): prefer the year's ملتقى, and never repeat
    // a cover an earlier year already used.
    const used = new Set<string>();
    for (const stop of byYear) {
      const pages = stop.events
        .map((ev) => eventForTitle(ev.title))
        .filter((e): e is NajiaEvent => Boolean(e) && !used.has(e!.slug));
      stop.cover = pages.find((e) => e.kind === 'ملتقى') ?? pages[0];
      if (stop.cover) used.add(stop.cover.slug);
    }
    return byYear;
  }, []);

  const wrapRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // Scroll position drives the progress bar and the card cross-fade by
  // writing styles straight onto the elements. React only re-renders when the
  // active year changes (seven times across the whole section), not on every
  // scroll frame — re-rendering all seven cards per frame is what stalled the
  // renderer here.
  useEffect(() => {
    let raf = 0;
    const apply = (p: number) => {
      if (trackRef.current) trackRef.current.style.transform = `scaleX(${p})`;
      const pos = Math.min(stops.length - 1, Math.max(0, p * stops.length - 0.5));
      const current = Math.min(stops.length - 1, Math.floor(p * stops.length));
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const delta = i - pos;
        const t = Math.min(1, Math.abs(delta));
        const o = fade(t);
        el.style.opacity = String(o);
        el.style.transform = `translateY(${delta * 72}px) scale(${1 - t * 0.03})`;
        el.style.visibility = o <= 0.01 ? 'hidden' : 'visible';
        el.style.willChange = o > 0.01 ? 'opacity, transform' : 'auto';
        el.style.pointerEvents = i === current ? 'auto' : 'none';
      });
      setActive(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const wrap = wrapRef.current;
        if (!wrap) return;
        const total = wrap.offsetHeight - window.innerHeight;
        if (total <= 0) return;
        apply(Math.min(1, Math.max(0, -wrap.getBoundingClientRect().top / total)));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [stops.length]);

  // Clicking a year scrolls to its slice of the pinned range.
  const jumpTo = (i: number) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const total = wrap.offsetHeight - window.innerHeight;
    const top = wrap.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((i + 0.5) / stops.length) * total, behavior: 'smooth' });
  };

  return (
    <section
      id="milestones"
      ref={wrapRef}
      className="relative bg-cream"
      style={{ height: `calc(${stops.length * VH_PER_STOP}vh + 100vh)` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden pt-16 lg:pt-0">
        <div className="w-full max-w-5xl mx-auto px-6 lg:px-12 py-6">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-dark mb-3">
              رحلة ناجية من{' '}
              <span className="text-gold-500">٢٠١٦ إلى ٢٠٢٦</span>
            </h2>
            <p className="hidden sm:block text-mid text-base lg:text-lg">مرّري خلال السنوات — أو اختاري سنة مباشرة.</p>
          </div>

          {/* Year rail */}
          <div role="group" aria-label="سنوات رحلة ناجية" className="relative flex justify-between items-start mb-8 lg:mb-10">
            {/* Track + continuous progress (fills from the 2016 side) */}
            <div className="absolute top-[9px] right-5 left-5 h-0.5 bg-line" aria-hidden="true">
              <div
                className="h-full bg-gradient-to-l from-gold-400 to-purple-500 origin-right"
                ref={trackRef}
                style={{ transform: 'scaleX(0)' }}
              />
            </div>

            {stops.map((s, i) => {
              const reached = i <= active;
              return (
                <button
                  key={s.year}
                  type="button"
                  aria-pressed={i === active}
                  onClick={() => jumpTo(i)}
                  className="relative z-10 flex flex-col items-center gap-2.5 min-w-11 min-h-11 px-1 group focus-visible:outline-none"
                >
                  <span
                    className="w-[18px] h-[18px] rounded-full border-2 border-white shadow-md transition-all duration-300 group-focus-visible:ring-4 group-focus-visible:ring-purple-500/30"
                    style={{
                      backgroundColor: i === active ? 'var(--color-gold-400)' : reached ? 'var(--color-purple-500)' : 'var(--color-purple-200)',
                      transform: i === active ? 'scale(1.35)' : 'scale(1)',
                    }}
                  />
                  <span
                    className={`text-xs sm:text-sm font-extrabold transition-colors duration-300 ${
                      i === active ? 'text-dark' : 'text-mid group-hover:text-purple-500'
                    }`}
                  >
                    {s.year}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Year cards — stacked in one cell and cross-faded continuously
              with scroll, so the hand-off between years is seamless. */}
          <div className="grid">
            {stops.map((s, i) => {
              // Initial state (first year shown); the scroll effect takes over.
              const t = Math.min(1, i);
              const upcoming = i === stops.length - 1;
              const covered = s.cover;
              const opacity = fade(t);
              const tile = TILE[s.events[0].type];
              return (
                <div
                  key={s.year}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  aria-hidden={i !== active}
                  className={`[grid-area:1/1] self-center rounded-[2rem] border p-6 lg:p-10 ${
                    upcoming
                      ? 'bg-gradient-to-br from-gold-50 to-gold-100 border-gold-200'
                      : 'bg-white border-purple-100 shadow-lg shadow-purple-100/40'
                  }`}
                  style={{
                    // Sequential fade (see `fade`): one year is already faint
                    // before the next arrives, and the 72px offset keeps the
                    // brief overlap from landing one card's lines between the
                    // other's. Written imperatively on scroll (see the effect).
                    opacity,
                    transform: `translateY(${i * 72}px) scale(${1 - t * 0.03})`,
                    visibility: opacity <= 0.01 ? 'hidden' : 'visible',
                    pointerEvents: i === 0 ? 'auto' : 'none',
                  }}
                >
                  <div className="w-full flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
                    {covered ? (
                      <img
                        src={covered.cover}
                        alt={`غلاف ${covered.title}`}
                        loading="lazy"
                        className="hidden lg:block w-44 h-32 rounded-2xl object-cover ring-1 ring-black/5 shadow-md flex-shrink-0"
                        style={{ objectPosition: covered.coverPosition ?? 'center' }}
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className={`hidden lg:flex w-44 h-32 rounded-2xl shadow-sm flex-shrink-0 items-center justify-center ${tile.bg} ${tile.fg}`}
                      >
                        <img src="/logo-mark.svg" alt="" className="h-24 w-auto" />
                      </div>
                    )}
                    <div className="flex-shrink-0 flex lg:block items-center gap-4 text-right">
                      <div className="text-4xl lg:text-6xl font-black text-gold-500 leading-none">{s.year}</div>
                      {upcoming && (
                        <span className="inline-block lg:mt-3 bg-white/80 text-gold-600 px-3 py-1 rounded-full text-xs font-bold">
                          العام العاشر
                        </span>
                      )}
                    </div>

                    <div className="flex-1 space-y-4 lg:space-y-5">
                      {s.events.map((event) => (
                        <div key={event.title}>
                          {(() => {
                            const page = eventForTitle(event.title);
                            return page ? (
                              <Link href={`/events/${page.slug}`} className="group/ev flex flex-wrap items-center gap-x-3 gap-y-2 font-extrabold text-dark text-base lg:text-xl leading-snug hover:text-purple-600 transition-colors">
                                <span>{event.title}</span>
                                {/* A card that leads to a page says so with a real button. */}
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-purple-500 group-hover/ev:bg-purple-600 px-3.5 py-2 rounded-full whitespace-nowrap shadow-sm shadow-purple-300/40 transition-colors">
                                  صفحة الفعالية
                                  <svg className="w-3.5 h-3.5 rotate-180 group-hover/ev:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </span>
                              </Link>
                            ) : (
                              <h3 className="font-extrabold text-dark text-base lg:text-xl leading-snug">{event.title}</h3>
                            );
                          })()}
                          {(event.date || event.venue) && (
                            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-1.5 text-xs lg:text-sm text-mid">
                              {event.date && (
                                <span className="inline-flex items-center gap-1.5">
                                  <OutlineIcon name="calendar" className="w-4 h-4 text-purple-500" />
                                  {event.date}{event.time && ` · ${event.time}`}
                                </span>
                              )}
                              {event.venue && (
                                <span className="inline-flex items-center gap-1.5">
                                  <OutlineIcon name="pin" className="w-4 h-4 text-purple-500" />
                                  {event.venue}
                                </span>
                              )}
                            </div>
                          )}
                          <p className={`text-mid text-xs lg:text-sm leading-loose mt-1.5 ${s.events.length > 1 ? 'hidden sm:block' : ''}`}>
                            {event.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    {upcoming && (
                      <Link
                        href="/get-involved#other"
                        className="self-start lg:self-auto flex-shrink-0 inline-flex items-center bg-gold-400 text-dark px-7 py-3.5 rounded-full font-bold text-sm hover:bg-gold-500 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-400/30"
                      >
                        سجّلي اهتمامك
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-8 lg:mt-10">
            <Link
              href="/discover#events"
              className="inline-flex items-center gap-2 border-2 border-gold-400 text-gold-600 px-8 py-3.5 rounded-full font-bold text-sm hover:bg-gold-400 hover:text-dark transition-all duration-300 group"
            >
              كل الملتقيات
              <svg className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
