'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useScrollReveal } from '../hooks/useScrollReveal';
import OutlineIcon from './OutlineIcon';
import { eventForTitle } from '../data/events';

export type TimelineEvent = {
  year: string;
  title: string;
  desc: string;
  type: 'founding' | 'award' | 'event' | 'milestone';
  date?: string;
  time?: string;
  venue?: string;
};

// Dates, venues and times follow the original event files (PDFs, flyers, video cards).
export const timelineEvents: TimelineEvent[] = [
  {
    year: '٢٠١٦',
    title: 'انطلاق مجتمع ناجية',
    desc: 'مجموعة رقمية صغيرة بمبادرة من أ.د. أطلال أبوسند.',
    type: 'founding',
  },
  {
    year: '٢٠٢٠',
    title: 'أول ملتقى افتراضي واسع',
    date: '١٥ أكتوبر ٢٠٢٠',
    time: '٧ – ٩ مساءً',
    desc: 'وصل إلى أكثر من ١٠٠٠ مستفيد.',
    type: 'event',
  },
  {
    year: '٢٠٢١',
    title: 'جائزة جدة للإبداع',
    desc: 'المركز الثالث في مجال الإبداع المجتمعي عن مبادرة «ناجية».',
    date: 'أكتوبر ٢٠٢١',
    venue: 'جامعة الملك عبدالعزيز، جدة',
    type: 'award',
  },
  {
    year: '٢٠٢٣',
    title: 'ملتقى «معًا نتعافى»',
    date: '٢٨ أكتوبر ٢٠٢٣',
    time: '٧:٣٠ – ١١ مساءً',
    venue: 'فندق أصيلة، جدة',
    desc: 'التعافي كرحلة جماعية لا فردية.',
    type: 'event',
  },
  {
    year: '٢٠٢٤',
    title: 'المشاركة في «اليوم العالمي للمتعافين من السرطان»',
    date: '٢ يونيو ٢٠٢٤',
    venue: 'مركز روشانا التحلية، جدة',
    desc: 'جناح «مجموعة ناجية» مع مستشفى الملك فيصل التخصصي ومركز الأبحاث.',
    type: 'event',
  },
  {
    year: '٢٠٢٤',
    title: 'ملتقى «من الصمود إلى الانتصار»',
    date: '١–٢ يوليو ٢٠٢٤',
    time: '٥ – ٩ مساءً',
    venue: 'فندق موفنبيك التحلية، جدة',
    desc: 'على مدار يومين وبمشاركة تقارب ٣٠٠ شخص.',
    type: 'event',
  },
  {
    year: '٢٠٢٤',
    title: '«أزهري بعد السرطان»',
    desc: 'برنامج في التمكين والإزهار.',
    type: 'event',
  },
  {
    year: '٢٠٢٤',
    title: '«معرفة اليوم لحماية الغد»',
    date: '٢٨ أكتوبر ٢٠٢٤',
    time: '٦ – ٩ مساءً',
    venue: 'فندق هيلتون، قاعة القصر، جدة',
    desc: 'برنامج في الوقاية والكشف المبكر.',
    type: 'event',
  },
  {
    year: '٢٠٢٥',
    title: 'الاحتفال بـ«اليوم العالمي للمتعافين من السرطان»',
    date: '٢٦ يونيو ٢٠٢٥',
    venue: 'مركز روشانا التحلية، جدة',
    desc: 'شهادة شكر وعرفان لمجتمع ناجية من مجموعة دعم المرضى المصابين بالسرطان.',
    type: 'event',
  },
  {
    year: '٢٠٢٥',
    title: 'ملتقى «في الحركة بركة ونحو التعافي نمضي»',
    date: '١ أكتوبر ٢٠٢٥',
    time: '٥ – ٨:٣٠ مساءً',
    venue: 'فندق فوكو، جدة',
    desc: 'تركيز على النشاط البدني ونمط الحياة بعد السرطان.',
    type: 'event',
  },
  {
    year: '٢٠٢٦',
    title: 'عشر سنوات على التأسيس',
    desc: 'عقد من الدعم والتمكين وصناعة الأثر.',
    type: 'milestone',
  },
];

export default function Timeline({ showCta = true }: { showCta?: boolean }) {
  const header = useScrollReveal(0.1);
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineVisible, setLineVisible] = useState(false);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setLineVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="timeline" className="py-24 lg:py-40 bg-cream">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          ref={header.ref}
          className={`text-center mb-20 reveal-hidden ${header.visible ? 'reveal-visible' : ''}`}
        >
          <h2 className="text-3xl lg:text-5xl font-extrabold text-dark mb-5">
            رحلة ناجية من{' '}
            <span className="text-gold-500">٢٠١٦ إلى ٢٠٢٦</span>
          </h2>
        </div>

        {/* Timeline */}
        <div ref={lineRef} className="relative">
          {/* Center line */}
          <div className="absolute top-0 bottom-0 right-1/2 translate-x-1/2 w-0.5 bg-purple-100">
            <div
              className="w-full h-full bg-gradient-to-b from-gold-400 to-purple-500 origin-top"
              style={{
                transform: `scaleY(${lineVisible ? 1 : 0})`,
                transition: 'transform 2s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            />
          </div>

          <div className="space-y-14">
            {timelineEvents.map((ev, i) => {
              const isLeft = i % 2 === 0;
              return (
                <TimelineItem key={`${ev.year}-${i}`} ev={ev} isLeft={isLeft} lineVisible={lineVisible} delay={i * 150} />
              );
            })}
          </div>
        </div>

        {/* CTA */}
        {showCta && <div className={`text-center mt-16 reveal-hidden ${header.visible ? 'reveal-visible' : ''}`} style={{ transitionDelay: '600ms' }}>
          <Link
            href="/discover#events"
            className="inline-flex items-center gap-2 border-2 border-gold-400 text-gold-600 px-8 py-4 rounded-full font-bold text-sm hover:bg-gold-400 hover:text-dark transition-all duration-300 group"
          >
            كل الملتقيات
            <svg className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>}
      </div>
    </section>
  );
}

function TimelineItem({
  ev,
  isLeft,
  lineVisible,
  delay,
}: {
  ev: TimelineEvent;
  isLeft: boolean;
  lineVisible: boolean;
  delay: number;
}) {
  const { ref, visible } = useScrollReveal(0.2);

  const typeColor = {
    founding: 'var(--color-gold-500)',
    award: 'var(--color-purple-500)',
    event: 'var(--color-mid)',
    milestone: 'var(--color-gold-500)',
  }[ev.type] ?? 'var(--color-purple-500)';

  const typeBg = {
    founding: 'bg-gold-50 border-gold-200',
    award: 'bg-purple-50 border-purple-200',
    event: 'bg-white border-line',
    milestone: 'bg-gold-50 border-gold-200',
  }[ev.type] ?? 'bg-white border-gray-200';

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Mobile: one calm, full-width card per point */}
      <div className="md:hidden grid grid-cols-[auto_minmax(0,1fr)] gap-4 items-start pr-1">
        <div className="flex flex-col items-center z-10 mt-5"><div className="w-4 h-4 rounded-full border-2 border-white shadow-md" style={{ backgroundColor: typeColor, animation: lineVisible ? `dotPulse 2.5s ease-in-out ${delay}ms infinite` : 'none' }} /></div>
        <div className={`${typeBg} border rounded-2xl p-5 shadow-sm`}><EventContent ev={ev} typeColor={typeColor} /></div>
      </div>

      {/* Tablet and desktop: alternating editorial timeline */}
      <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-0 items-start">
        <div className={`px-6 ${isLeft ? '' : 'invisible'} text-right`}>
          {isLeft && <div className={`inline-block ${typeBg} border rounded-2xl p-5 max-w-xs shadow-sm hover:shadow-md transition-shadow duration-300`}><EventContent ev={ev} typeColor={typeColor} /></div>}
        </div>
        <div className="flex flex-col items-center z-10 mt-5"><div className="w-4 h-4 rounded-full border-2 border-white shadow-md flex-shrink-0" style={{ backgroundColor: typeColor, animation: lineVisible ? `dotPulse 2.5s ease-in-out ${delay}ms infinite` : 'none' }} /></div>
        <div className={`px-6 ${!isLeft ? '' : 'invisible'} text-right`}>
          {!isLeft && <div className={`inline-block ${typeBg} border rounded-2xl p-5 max-w-xs shadow-sm hover:shadow-md transition-shadow duration-300`}><EventContent ev={ev} typeColor={typeColor} /></div>}
        </div>
      </div>
    </div>
  );
}

function EventContent({ ev, typeColor }: { ev: TimelineEvent; typeColor: string }) {
  return (
    <>
      <div className="mb-2">
        <span className="text-2xl font-extrabold" style={{ color: typeColor }}>
          {ev.year}
        </span>
      </div>
      {(() => {
        const page = eventForTitle(ev.title);
        return page ? (
          <Link href={`/events/${page.slug}`} className="block font-extrabold text-dark text-base mb-1 hover:text-purple-500 underline-offset-4 hover:underline">{ev.title}</Link>
        ) : (
          <h3 className="font-extrabold text-dark text-base mb-1">{ev.title}</h3>
        );
      })()}
      {ev.date && <div className="text-xs text-mid font-medium mb-1">{ev.date}{ev.time && ` · ${ev.time}`}</div>}
      {ev.venue && <div className="text-xs text-mid mb-2 flex items-center gap-1.5"><OutlineIcon name="pin" className="w-3.5 h-3.5 text-purple-500" />{ev.venue}</div>}
      <p className="text-mid text-xs leading-relaxed">{ev.desc}</p>
    </>
  );
}
