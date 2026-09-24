'use client';

import Link from 'next/link';
import LibraryCard from './LibraryCard';
import { articles, medicalDisclaimer } from '../data/knowledge';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Knowledge() {
  const header = useScrollReveal(0.1);
  const grid = useScrollReveal(0.08);

  return (
    <section id="knowledge" className="py-24 lg:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          ref={header.ref}
          className={`text-center mb-14 reveal-hidden ${header.visible ? 'reveal-visible' : ''}`}
        >
          <h2 className="text-3xl lg:text-5xl font-extrabold text-dark mb-5 leading-snug">
            معرفة موثوقة{' '}
            <span className="text-purple-500">عن الحياة بعد السرطان</span>
          </h2>
          <p className="text-mid text-lg max-w-2xl mx-auto leading-loose">
            محتوى عربي مبسط يجيب عن الأسئلة التي لا يتّسع لها وقت العيادة، مبني على إرشادات طبية موثوقة تُذكر مصادرها أسفل كل مقال.
          </p>
        </div>

        {/* Library preview */}
        <div
          ref={grid.ref}
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 reveal-hidden ${grid.visible ? 'reveal-visible' : ''}`}
        >
          {articles.slice(0, 3).map((article, i) => (
            <div key={article.slug} style={{ transitionDelay: `${i * 80}ms` }}>
              <LibraryCard article={article} />
            </div>
          ))}
        </div>

        <p className="text-center text-mid text-xs leading-relaxed mt-8 max-w-2xl mx-auto">{medicalDisclaimer}</p>

        {/* CTA */}
        <div className={`text-center mt-10 reveal-hidden ${grid.visible ? 'reveal-visible' : ''}`} style={{ transitionDelay: '350ms' }}>
          <Link
            href="/discover#knowledge"
            className="inline-flex items-center gap-2 border-2 border-purple-500 text-purple-500 px-8 py-4 rounded-full font-bold text-sm hover:bg-purple-500 hover:text-white transition-all duration-300 group"
          >
            اكتشفي المكتبة
            <svg className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
