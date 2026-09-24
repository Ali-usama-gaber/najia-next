'use client';

import { useEffect, useRef, useState } from 'react';

const qualities = [
  { word: 'واعية', meaning: 'أفهم صحتي وأشارك في اتخاذ قراراتي.' },
  { word: 'مطمئنة', meaning: 'أتعلّم كيف أعيش بعد السرطان دون أن يسيطر الخوف.' },
  { word: 'قادرة', meaning: 'أستعيد الثقة والاستقلالية والسيطرة على حياتي.' },
  { word: 'منتجة', meaning: 'أعود إلى أسرتي وعملي ومجتمعي وأحقق طموحاتي.' },
  { word: 'ملهمة', meaning: 'أحوّل تجربتي إلى قوة ودعم لغيري.' },
];

export default function Survivor() {
  const sectionRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);
  const [wordIndex, setWordIndex] = useState(-1);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !entered) {
          setEntered(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [entered]);

  useEffect(() => {
    if (!entered) return;
    let i = 0;
    const interval = setInterval(() => {
      setWordIndex(i);
      i++;
      if (i >= qualities.length) clearInterval(interval);
    }, 500);
    return () => clearInterval(interval);
  }, [entered]);

  return (
    <section
      id="survivor"
      ref={sectionRef}
      className="relative py-36 lg:py-52 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, var(--color-dark) 0%, var(--color-dark-2) 50%, var(--color-dark) 100%)' }}
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, var(--color-purple-500) 0%, transparent 70%)',
            animation: 'floatSlow 14s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-20 left-20 w-80 h-80 rounded-full opacity-8"
          style={{
            background: 'radial-gradient(circle, var(--color-gold-400) 0%, transparent 70%)',
            animation: 'floatGently 18s ease-in-out infinite 2s',
          }}
        />
        {/* Star dots */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: i % 3 === 0 ? '3px' : '2px',
              height: i % 3 === 0 ? '3px' : '2px',
              top: `${10 + (i * 37) % 80}%`,
              left: `${5 + (i * 53) % 90}%`,
              opacity: 0.15 + (i % 5) * 0.04,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Overline */}
        <div
          className="text-purple-300 text-sm font-bold mb-10 transition-all duration-700"
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '100ms',
          }}
        >
          هوية ناجية بعد عشر سنوات
        </div>

        {/* أنا ناجية */}
        <div
          className="transition-all duration-900"
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
            transitionDelay: '300ms',
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <h2 className="text-white font-black leading-none mb-14">
            <span className="block text-muted text-2xl lg:text-3xl font-bold mb-3">أنا</span>
            <span
              className="block text-7xl sm:text-8xl lg:text-[9rem] font-black leading-none"
              style={{
                color: 'var(--color-gold-200)',
              }}
            >
              ناجية
            </span>
          </h2>
        </div>

        {/* Quality words */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {qualities.map(({ word, meaning }, i) => (
            <div
              key={word}
              className="relative"
              style={{
                opacity: wordIndex >= i ? 1 : 0,
                animation: wordIndex >= i
                  ? `wordReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.15}s both`
                  : 'none',
              }}
            >
              <span
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold"
                style={{
                  color: i % 2 === 0 ? 'var(--color-line)' : 'var(--color-purple-200)',
                }}
              >
                {word}
              </span>
              <span className="text-gold-400 text-2xl font-bold">.</span>
              <p className="text-dusk-200 text-sm leading-loose mt-3 max-w-[16rem] mx-auto">{meaning}</p>
            </div>
          ))}
        </div>

        {/* Divider line */}
        <div
          className="w-16 h-0.5 mx-auto mt-16 transition-all duration-1000"
          style={{
            background: 'linear-gradient(90deg, transparent, var(--color-gold-400), transparent)',
            opacity: entered ? 1 : 0,
            transitionDelay: '3s',
          }}
        />

        {/* Najia's message */}
        <div
          className="mt-8 transition-all duration-700 max-w-2xl mx-auto"
          style={{
            opacity: entered ? 1 : 0,
            transitionDelay: '3.5s',
          }}
        >
          <div className="text-purple-300 text-sm font-bold mb-4">رسالة ناجية</div>
          <p className="text-white text-xl lg:text-2xl font-extrabold leading-relaxed">
            النجاة من السرطان ليست نهاية رحلة العلاج، بل بداية مرحلة جديدة من الحياة.
          </p>
          <p className="text-dusk-200 text-sm lg:text-base mt-5 leading-loose">
            من المرض إلى التعافي · من التعافي إلى القدرة · من القدرة إلى الإنتاج · ومن التجربة إلى الإلهام
          </p>
        </div>
      </div>
    </section>
  );
}
