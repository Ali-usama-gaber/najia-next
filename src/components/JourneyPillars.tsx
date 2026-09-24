'use client';

import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import OutlineIcon, { type IconName } from './OutlineIcon';

// رحلة الناجية والركائز في قسم واحد هادئ: المراحل سلسلة أفقية تضيء
// واحدة تلو الأخرى، والركائز الأربع مفتوحة جنبًا إلى جنب بعرض أوسع.

const stages = [
  { ar: 'العلاج', desc: 'بداية المواجهة — كل يوم خطوة نحو الأمام', color: 'var(--color-purple-500)' },
  { ar: 'التعافي', desc: 'انتهاء البروتوكول الطبي وبداية التعافي الجسدي', color: 'var(--color-purple-600)' },
  { ar: 'التكيّف', desc: 'التأقلم مع الحياة الجديدة وفهم احتياجاتها', color: 'var(--color-purple-400)' },
  { ar: 'استعادة الحياة', desc: 'العودة للأسرة والعمل والمحيط بثقة متجددة', color: 'var(--color-gold-400)' },
  { ar: 'القدرة', desc: 'اكتشاف قوة داخلية لم تعرفيها من قبل', color: 'var(--color-gold-300)' },
  { ar: 'الإنتاج', desc: 'توظيف التجربة في الإبداع والعطاء والإنجاز', color: 'var(--color-gold-400)' },
  { ar: 'الإلهام', desc: 'قصتك تصبح مصدر قوة لنساء يسرن بعدك', color: 'var(--color-purple-600)' },
];

const pillars: { ar: string; icon: IconName; color: string; points: string[] }[] = [
  {
    ar: 'الدعم', icon: 'heart', color: 'var(--color-purple-500)',
    points: [
      'مساحة آمنة للتواصل ومشاركة التجربة.',
      'تقليل العزلة والشعور بأن الناجية تواجه تجربتها وحدها.',
      'دعم متبادل بين الناجيات والمريضات في مراحل مختلفة من الرحلة.',
    ],
  },
  {
    ar: 'المعرفة', icon: 'book', color: 'var(--color-gold-400)',
    points: [
      'معلومات طبية موثوقة ومبسطة.',
      'لقاءات مباشرة مع الأطباء والمتخصصين.',
      'تصحيح المفاهيم الخاطئة ومواجهة المعلومات الطبية غير الموثوقة.',
    ],
  },
  {
    ar: 'التمكين', icon: 'spark', color: 'var(--color-purple-600)',
    points: [
      'مساعدة الناجية على استعادة أدوارها الأسرية والاجتماعية والمهنية.',
      'تعزيز الاستقلالية والثقة بالنفس.',
      'تشجيع العودة إلى الإنتاج والعمل والإبداع.',
    ],
  },
  {
    ar: 'المناصرة والعطاء', icon: 'shield', color: 'var(--color-gold-500)',
    points: [
      'إعطاء الناجيات صوتًا ومساحة للتعبير عن احتياجاتهن.',
      'تحويل الخبرة الشخصية إلى مصدر دعم للناجيات الأخريات.',
      'إشراك الناجيات في تطوير البرامج والموضوعات التي تمس حياتهن.',
    ],
  },
];

const notJustAnEvent = [
  'مجتمع مستمر', 'شبكة دعم', 'منصة معرفة', 'مساحة آمنة',
  'صوت للناجيات', 'منصة للتمكين', 'نموذج للرعاية بعد السرطان',
];

export default function JourneyPillars() {
  const header = useScrollReveal(0.1);
  const chain = useScrollReveal(0.3);
  const pillarsReveal = useScrollReveal(0.2);
  const band = useScrollReveal(0.2);

  const [activeStage, setActiveStage] = useState(0);
  const sweepRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Once the chain enters view, sweep through the stages one by one — a
  // single storytelling pass. Any click hands control to the user.
  useEffect(() => {
    if (!chain.visible) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let i = 0;
    sweepRef.current = setInterval(() => {
      i += 1;
      if (i >= stages.length) {
        if (sweepRef.current) clearInterval(sweepRef.current);
        return;
      }
      setActiveStage(i);
    }, 1000);
    return () => { if (sweepRef.current) clearInterval(sweepRef.current); };
  }, [chain.visible]);

  const selectStage = (i: number) => {
    if (sweepRef.current) clearInterval(sweepRef.current);
    setActiveStage(i);
  };

  return (
    <section id="journey" className="py-24 lg:py-36 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          ref={header.ref}
          className={`text-center mb-14 lg:mb-16 reveal-hidden ${header.visible ? 'reveal-visible' : ''}`}
        >
          <h2 className="text-3xl lg:text-5xl font-extrabold text-dark leading-snug">
            الحياة بعد السرطان{' '}
            <span className="text-purple-500">رحلة</span>، ليست نهاية
          </h2>
        </div>

        {/* ── The journey: one luminous chain of stages ── */}
        <div
          ref={chain.ref}
          className={`reveal-hidden ${chain.visible ? 'reveal-visible' : ''}`}
        >
          <div className="flex flex-wrap items-center justify-center gap-y-4">
            {stages.map((stage, i) => (
              <span key={stage.ar} className="flex items-center">
                <button
                  type="button"
                  onClick={() => selectStage(i)}
                  aria-pressed={activeStage === i}
                  className="relative px-3 py-2 text-lg sm:text-xl lg:text-2xl font-extrabold transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/40 rounded-xl"
                  style={{
                    color: i <= activeStage ? stage.color : 'var(--color-quiet)',
                    transform: activeStage === i ? 'scale(1.12)' : 'scale(1)',
                  }}
                >
                  {stage.ar}
                  <span
                    className="absolute right-3 left-3 -bottom-0.5 h-[3px] rounded-full origin-right transition-transform duration-500"
                    style={{
                      backgroundColor: stage.color,
                      transform: `scaleX(${activeStage === i ? 1 : 0})`,
                    }}
                  />
                </button>
                {i < stages.length - 1 && (
                  <svg
                    className="w-4 h-4 mx-1 sm:mx-2 transition-colors duration-500"
                    style={{ color: i < activeStage ? 'var(--color-gold-400)' : 'var(--color-line)' }}
                    fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                )}
              </span>
            ))}
          </div>

          {/* Active stage description — one calm line */}
          <div className="relative h-16 sm:h-12 mt-6">
            {stages.map((stage, i) => (
              <p
                key={stage.ar}
                aria-hidden={activeStage !== i}
                className="absolute inset-0 flex items-center justify-center text-center text-mid leading-relaxed px-4 transition-all duration-500"
                style={{
                  opacity: activeStage === i ? 1 : 0,
                  transform: activeStage === i ? 'translateY(0)' : 'translateY(8px)',
                }}
              >
                <span>{stage.desc}</span>
              </p>
            ))}
          </div>
        </div>

        </div>

        {/* ── Divider ── */}
        <div className="flex items-center gap-5 my-14 lg:my-20">
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-line" />
          <p className="text-purple-600 font-extrabold text-xl lg:text-3xl">وأربع ركائز تسند كل خطوة</p>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-line" />
        </div>

        {/* ── Pillars: all four in the open, side by side ── */}
        <div
          ref={pillarsReveal.ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
        >
          {pillars.map((p, i) => (
            <article
              key={p.ar}
              className={`pillar-card bg-white border border-purple-100 rounded-[1.75rem] p-7 lg:p-8 min-h-[22rem] reveal-hidden ${pillarsReveal.visible ? 'reveal-visible' : ''}`}
              style={{ transitionDelay: `${i * 100}ms`, borderTopColor: p.color, borderTopWidth: 4 }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: `color-mix(in srgb, ${p.color} 9%, transparent)`, color: p.color }}
              >
                <OutlineIcon name={p.icon} className="w-8 h-8" />
              </div>
              <h3 className="text-xl lg:text-2xl font-extrabold text-dark leading-tight mb-5">{p.ar}</h3>
              <ul className="space-y-3.5">
                {p.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-mid text-base leading-relaxed">
                    <OutlineIcon name="check" className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: p.color }} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Not just an annual event — one quiet closing line */}
        <div
          ref={band.ref}
          className={`mt-16 max-w-5xl mx-auto text-center reveal-hidden ${band.visible ? 'reveal-visible' : ''}`}
        >
          <p className="text-dark font-extrabold mb-3">
            ناجية ليست مجرد <span className="text-purple-500">فعالية سنوية</span>
          </p>
          <p className="text-sm text-mid leading-loose max-w-2xl mx-auto">
            {notJustAnEvent.join(' · ')}
          </p>
        </div>
      </div>
    </section>
  );
}
