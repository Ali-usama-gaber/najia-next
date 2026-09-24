'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import NajiaMark from './NajiaMark';

import { asset } from '../lib/asset';
const stats = [
  { num: '~٣٠٠', label: 'عضوة أساسية' },
  { num: '٩٠٠+', label: 'مستفيد حضوريًا' },
  { num: '٣٥٠٠+', label: 'مستفيد افتراضيًا' },
];

// The core message arrives word by word — the page's one authored entrance.
const headline: { word: string; className?: string; underline?: boolean; break?: boolean }[] = [
  { word: 'الرعاية' },
  { word: 'لا' },
  { word: 'تنتهي', break: true },
  { word: 'بانتهاء', className: 'text-purple-500' },
  { word: 'العلاج', className: 'text-gold-500', underline: true },
];

/* ── The mark ──────────────────────────────────────────────────────────
   The logo's own figure, inlined so it can perform: its 28 parts gather
   one by one, the colors wake from faded to natural, then it keeps a calm
   breathing float. «أنتِ لستِ وحدك» arrives beneath it word by word. */

const phraseWords = ['أنتِ', 'لستِ', 'وحدك'];

function MarkVisual({ layer }: { layer: (depth: number) => React.CSSProperties }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* The mark — assembling, waking, breathing; free on the page, no frame */}
      <div className="relative" style={layer(10)}>
        <div style={{ animation: 'markBreathe 9s ease-in-out 3.5s infinite' }}>
          <NajiaMark className="mark-awaken h-72 sm:h-80 lg:h-[440px] w-auto drop-shadow-[0_18px_30px_rgba(28,18,34,0.10)]" />
        </div>
      </div>

      {/* أنتِ لستِ وحدك */}
      <div className="relative mt-6 lg:mt-8 flex items-center gap-2.5" style={layer(18)}>
        {phraseWords.map((word, i) => (
          <span key={word} className="word-mask">
            <span
              className="inline-block text-2xl lg:text-3xl font-black text-purple-600"
              style={{ animation: `wordReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${2 + i * 0.18}s both` }}
            >
              {word}
            </span>
          </span>
        ))}
        <span
          className="w-2.5 h-2.5 rounded-full bg-gold-400 mt-3"
          style={{ animation: `wordReveal 0.6s ease 2.7s both, dotPulse 2.6s ease-in-out 3.4s infinite` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export default function Hero() {
  const [phase, setPhase] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 150),
      setTimeout(() => setPhase(2), 350),
      setTimeout(() => setPhase(3), 1150), // underline draws after the words land
      setTimeout(() => setPhase(4), 1450),
      setTimeout(() => setPhase(5), 1750),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Subtle pointer parallax on the bloom. Skipped for touch input and reduced
  // motion; the rAF loop only runs while the hero is on screen.
  useEffect(() => {
    const section = sectionRef.current;
    const visual = visualRef.current;
    if (!section || !visual) return;
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    ) return;

    let raf = 0;
    let running = false;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      visual.style.setProperty('--px', current.x.toFixed(4));
      visual.style.setProperty('--py', current.y.toFixed(4));
      if (Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > 0.001) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };
    const wake = () => { if (!running) { running = true; raf = requestAnimationFrame(tick); } };
    const onMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      wake();
    };
    const onLeave = () => { target.x = 0; target.y = 0; wake(); };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        section.addEventListener('pointermove', onMove);
        section.addEventListener('pointerleave', onLeave);
      } else {
        section.removeEventListener('pointermove', onMove);
        section.removeEventListener('pointerleave', onLeave);
        onLeave();
      }
    });
    observer.observe(section);

    return () => {
      observer.disconnect();
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const show = (n: number) =>
    phase >= n ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';
  const layer = (depth: number): React.CSSProperties => ({
    transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px), 0)`,
  });

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-cream">
      {/* Ambient background — one soft directional wash */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-24 w-[620px] h-[620px] rounded-full opacity-[0.10]"
          style={{
            background: 'radial-gradient(circle at 40% 40%, var(--color-purple-500) 0%, transparent 68%)',
          }}
        />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle, var(--color-purple-500) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24 lg:py-36 w-full grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* ── Text column — leads on every viewport ── */}
        <div className="space-y-7">
          {/* Badge */}
          <div className={`transition-all duration-700 ${show(1)}`}>
            <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-5 py-2 rounded-full text-sm font-bold">
              <span className="w-2 h-2 rounded-full bg-gold-400 inline-block" />
              ٢٠١٦ — ٢٠٢٦ · عشر سنوات
            </span>
          </div>

          {/* Headline — word-by-word masked reveal */}
          <h1 className="text-[2.4rem] sm:text-5xl lg:text-[3.4rem] font-black text-dark leading-[1.25] tracking-tight">
            {headline.map((item, i) => (
              <span key={item.word} className={item.break ? 'contents' : undefined}>
                <span className="relative inline-block align-bottom">
                  <span className="word-mask align-bottom">
                    <span
                      className={item.className}
                      style={{
                        transform: phase >= 2 ? 'translateY(0)' : 'translateY(115%)',
                        opacity: phase >= 2 ? 1 : 0,
                        transitionDelay: `${i * 95}ms`,
                      }}
                    >
                      {item.word}
                    </span>
                  </span>
                  {item.underline && (
                    // Outside the mask so it isn't clipped below the baseline.
                    <svg
                      className="absolute -bottom-2 right-0 w-full"
                      height="6"
                      viewBox="0 0 200 6"
                      fill="none"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M0 4 Q50 0 100 4 Q150 8 200 4"
                        className="stroke-gold-400"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.55"
                        pathLength={1}
                        style={{
                          strokeDasharray: 1,
                          strokeDashoffset: phase >= 3 ? 0 : 1,
                          transition: 'stroke-dashoffset 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />
                    </svg>
                  )}
                </span>
                {item.break ? <br /> : ' '}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p
            className={`text-mid text-lg leading-loose max-w-[500px] transition-all duration-800 ${show(3)}`}
          >
            مجتمع ناجية مساحة عربية آمنة للناجيات من سرطان الثدي، بدأت كمجموعة واتساب صغيرة عام ٢٠١٦ وصارت منظومة متكاملة للدعم والمعرفة والتمكين في مرحلة ما بعد السرطان.
          </p>

          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-800 ${show(4)}`}>
            <Link
              href="/join"
              className="inline-flex items-center justify-center gap-2 bg-purple-500 text-white px-9 py-4 rounded-full font-bold text-base hover:bg-purple-600 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-400/30 hover:-translate-y-1 group"
            >
              انضمي إلى المجتمع
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1 rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center border-2 border-purple-500 text-purple-500 px-9 py-4 rounded-full font-bold text-base hover:bg-purple-100 transition-all duration-300"
            >
              تعرّفي على ناجية
            </Link>
          </div>

          {/* Founder credit */}
          <div className={`flex items-center gap-3 transition-all duration-800 ${show(4)}`}>
            <img
              src={asset('/founder.jpg')}
              alt="أ.د. أطلال أبوسند"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md shadow-purple-200/50 flex-shrink-0"
            />
            <p className="text-sm text-mid leading-relaxed">
              <span className="font-bold text-dark">أ.د. أطلال أبوسند</span> — أستاذ واستشاري طب الأورام وأورام الثدي — مؤسِّسة المجتمع
            </p>
          </div>

          {/* Stats strip */}
          <div
            className={`flex flex-wrap gap-x-10 gap-y-4 pt-8 mt-2 border-t border-line transition-all duration-800 ${show(5)}`}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-extrabold text-gold-500">{s.num}</div>
                <div className="text-xs text-mid font-medium mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Visual column — the bloom ── */}
        <div
          ref={visualRef}
          className={`flex items-center justify-center transition-all duration-1000 ${
            phase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <MarkVisual layer={layer} />
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 transition-all duration-700 ${
          phase >= 5 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-6 h-10 rounded-full border-2 border-purple-300 flex items-start justify-center pt-2">
          <div
            className="w-1 h-2 rounded-full bg-gold-400"
            style={{ animation: 'floatGently 1.8s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  );
}
