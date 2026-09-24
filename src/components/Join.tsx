'use client';

import Link from 'next/link';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Join() {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section id="join" className="py-24 lg:py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className={`relative bg-gradient-to-br from-purple-50 via-cream to-gold-50 rounded-[2.5rem] overflow-hidden p-10 lg:p-20 reveal-hidden ${
            visible ? 'reveal-visible' : ''
          }`}
        >
          {/* Decorative shapes */}
          <div className="absolute top-0 left-0 w-80 h-80 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, var(--color-purple-500) 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }} />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, var(--color-gold-400) 0%, transparent 70%)', transform: 'translate(30%, 30%)' }} />
          <div className="absolute top-1/2 right-1/2 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, var(--color-blush-400) 0%, transparent 70%)' }} />

          <div className="relative max-w-xl mx-auto text-center">
            {/* Main message */}
            <h2 className="text-4xl lg:text-6xl font-black text-dark leading-snug mb-6">
              مكانك{' '}
              <span className="text-purple-500">
                محفوظ بيننا
              </span>
            </h2>

            <p className="text-mid text-lg leading-loose mb-12 max-w-md mx-auto">
              إن كنتِ ناجية أو تمرّين بالرحلة الآن — ابدئي من هنا.
            </p>

            <div className="flex justify-center">
              <Link
                href="/join"
                className="inline-flex items-center gap-3 bg-purple-500 text-white px-10 py-4 rounded-full font-bold text-base hover:bg-purple-600 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-400/30 hover:-translate-y-1 group"
              >
                انضمي إلى المجتمع
                <svg className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <p className="text-mid text-xs mt-6 leading-relaxed max-w-sm mx-auto">
              المشاركة اختيارية دائمًا، وبياناتك لا تُنشر ولا تُشارَك.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
