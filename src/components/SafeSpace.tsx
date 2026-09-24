'use client';

import Link from 'next/link';
import { useScrollReveal } from '../hooks/useScrollReveal';
import OutlineIcon, { type IconName } from './OutlineIcon';

// ميثاق المساحة الآمنة — approved wording.
const principles = [
  {
    icon: 'lock' as IconName,
    title: 'السرية',
    desc: 'ما يُقال في المجموعة يبقى في المجموعة.',
  },
  {
    icon: 'shield' as IconName,
    title: 'الخصوصية',
    desc: 'لا تُنشر أسماء أو صور أو تفاصيل طبية لأي عضوة خارجها.',
  },
  {
    icon: 'book' as IconName,
    title: 'معلومة طبية مُراجَعة',
    desc: 'المعلومة الطبية تُراجَع، والشائعات تُصحَّح.',
  },
  {
    icon: 'users' as IconName,
    title: 'لا مقارنات بين الحالات',
    desc: 'لا مقارنات بين الحالات — لكل رحلة تفاصيلها.',
  },
  {
    icon: 'flower' as IconName,
    title: 'المشاركة اختيارية',
    desc: 'المشاركة اختيارية دائمًا، والصمت مقبول.',
  },
];

// Homepage version: the charter's five principles, all open, in a 3 + 2 grid.
export function SafeSpaceStrip() {
  const { ref, visible } = useScrollReveal(0.12);
  return (
    <section id="safespace" className="py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className={`bg-gradient-to-br from-purple-100 to-purple-50 rounded-[2rem] p-8 lg:p-12 reveal-hidden ${visible ? 'reveal-visible' : ''}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <span className="inline-block bg-white/70 text-purple-600 px-4 py-1.5 rounded-full text-xs font-bold mb-4">
                ميثاق المساحة الآمنة
              </span>
              <h2 className="text-2xl lg:text-4xl font-extrabold text-dark leading-snug">
                مساحة <span className="text-purple-500">آمنة</span> لكِ
              </h2>
            </div>
            <Link
              href="/community#safespace"
              className="inline-flex items-center gap-2 text-purple-500 font-bold text-sm hover:gap-3 transition-all duration-300"
            >
              عن المجتمع
              <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {principles.map((p, i) => (
              <li
                key={p.title}
                className={`flex items-start gap-4 bg-white/85 rounded-2xl p-5 lg:p-6 ${i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'} ${i === 4 ? 'sm:col-span-2 lg:col-span-3' : ''}`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(12px)',
                  transition: `opacity 0.5s ease ${150 + i * 80}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${150 + i * 80}ms`,
                }}
              >
                <span className="w-11 h-11 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center flex-shrink-0">
                  <OutlineIcon name={p.icon} className="w-5 h-5" />
                </span>
                <span>
                  <span className="block text-dark font-extrabold mb-1">{p.title}</span>
                  <span className="block text-mid text-sm leading-loose">{p.desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function SafeSpace() {
  const header = useScrollReveal(0.1);
  const grid = useScrollReveal(0.08);

  return (
    <section id="safespace" className="scroll-mt-24 py-24 lg:py-40 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          ref={header.ref}
          className={`text-center mb-16 reveal-hidden ${header.visible ? 'reveal-visible' : ''}`}
        >
          <h2 className="text-3xl lg:text-5xl font-extrabold text-dark mb-5">
            مساحة{' '}
            <span className="text-purple-500">آمنة</span> لكِ
          </h2>
        </div>

        {/* Principles — all open: three across, then two sharing the full row */}
        <div ref={grid.ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
          {principles.map((p, i) => (
            <article
              key={p.title}
              className={`pillar-card bg-white rounded-2xl p-7 border border-line-soft ${i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'} ${i === 4 ? 'sm:col-span-2 lg:col-span-3' : ''} reveal-hidden ${grid.visible ? 'reveal-visible' : ''}`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center flex-shrink-0">
                  <OutlineIcon name={p.icon} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-dark text-lg mb-1.5">{p.title}</h3>
                  <p className="text-mid leading-loose">{p.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
