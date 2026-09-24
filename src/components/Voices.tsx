'use client';

import Link from 'next/link';
import OutlineIcon from './OutlineIcon';
import { useScrollReveal } from '../hooks/useScrollReveal';

// قصص ناجيات + ناجية مبدعة · ناجية منتجة in one section: the stories are told
// through what survivors make and say. Both clips come from the client's own
// material; the quote is transcribed from the speaker in the first clip, and
// the second clip shows the «من الصمود إلى الانتصار» banner beside the painting.

const points = [
  'عرض منتجات وأعمال الناجيات',
  'دعم المشاريع الفردية والإبداعية',
  'تعزيز الاستقلال الاقتصادي والاجتماعي',
  'أكثر من ٥٠ ناجية شاركن بأعمالهن وتجاربهن',
];

type Voice = {
  src: string;
  poster: string;
  orientation: 'landscape' | 'portrait';
  label: string;
  title: string;
  caption: string;
  quote?: string;
  event?: { href: string; label: string };
};

const voices: Voice[] = [
  {
    src: '/creative/najia-muntija.mp4',
    poster: '/creative/najia-muntija-poster.jpg',
    orientation: 'landscape',
    label: 'ناجية منتجة',
    title: '«صُنع بحب»: حكاية ناجية منتجة',
    caption: 'إحدى عضوات ناجية تحكي فكرة «ناجية منتجة» من ركن منتجات الناجيات في أحد ملتقيات المجتمع.',
    quote: 'نشجّع كل سيدة محاربة على أن تُنتج أشياء تخصّها وتصنعها بحب… ودائمًا نقول: صُنعت بحب، لأنها صُنعت بكفاح ناجية.',
  },
  {
    src: '/events/sumud/video-2.mp4',
    poster: '/events/sumud/poster-2.jpg',
    orientation: 'portrait',
    label: 'ناجية مبدعة',
    title: 'لوحة اليدين والشريطة الوردية',
    caption: 'رسّامة وفنانة كروشيه من مبدعات ناجية ترسم لوحتها خطوة بخطوة، ثم تقف بجانبها في الملتقى.',
    event: { href: '/events/sumud', label: 'ملتقى «من الصمود إلى الانتصار» ٢٠٢٤' },
  },
];

function Arrow() {
  return (
    <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function Ctas() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        href="/get-involved#story"
        className="inline-flex items-center gap-2 bg-gold-400 text-dark px-7 py-3.5 rounded-full font-bold text-sm hover:bg-gold-500 transition-all duration-300 hover:-translate-y-0.5"
      >
        احكي قصتك
      </Link>
      <Link
        href="/get-involved#product"
        className="inline-flex items-center gap-2 border-2 border-gold-400/60 text-gold-200 px-7 py-3 rounded-full font-bold text-sm hover:bg-gold-400 hover:text-dark hover:border-gold-400 transition-all duration-300"
      >
        اعرضي منتجك
      </Link>
    </div>
  );
}

function PlayBadge() {
  return (
    <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <span className="w-14 h-14 rounded-full bg-white/90 text-dark flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
        <svg className="w-5 h-5 -mr-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></svg>
      </span>
    </span>
  );
}

// Homepage preview: the promise, both invitations, and the two clips as
// gateways to the full section on /community.
export function VoicesPreview() {
  const { ref, visible } = useScrollReveal(0.15);
  return (
    <section id="stories" className="scroll-mt-24 py-20 lg:py-28 bg-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center reveal-hidden ${visible ? 'reveal-visible' : ''}`}
        >
          <div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white leading-snug mb-4">
              كل امرأة تحمل <span className="text-gold-400">قصة</span> تستحق أن تُروى
            </h2>
            <p className="text-dusk-200 leading-loose max-w-xl mb-8">
              بعضها يُحكى بالكلمات، وبعضها يُصنع باليد في «ناجية مبدعة» و«ناجية منتجة»: مساحات تُعيد تقديم الناجية للمجتمع باعتبارها قادرة ومنتجة وصاحبة تجربة وقيمة — أكثر من ٥٠ ناجية شاركن بأعمالهن وتجاربهن.
            </p>
            <Ctas />
            <Link href="/community#stories" className="inline-flex items-center gap-2 mt-6 text-gold-200 font-bold text-sm hover:gap-3 transition-all">
              شاهدي قصص الناجيات وأعمالهن
              <Arrow />
            </Link>
          </div>

          <div className="grid grid-cols-[1.55fr_1fr] gap-4 items-end">
            {voices.map((v, i) => (
              <Link
                key={v.src}
                href="/community#stories"
                aria-label={`${v.label}: ${v.title}`}
                className={`group relative block overflow-hidden rounded-2xl ring-1 ring-white/10 ${v.orientation === 'portrait' ? 'aspect-[9/14]' : 'aspect-[4/3]'}`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.6s ease ${250 + i * 120}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${250 + i * 120}ms`,
                }}
              >
                <img src={v.poster} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-dark/85 via-transparent to-transparent" />
                <PlayBadge />
                <span className="absolute bottom-3 right-3 left-3 text-white">
                  <span className="block text-gold-200 text-xs font-bold mb-0.5">{v.label}</span>
                  <span className="block text-sm font-extrabold leading-snug">{v.title}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Voices() {
  const header = useScrollReveal(0.1);
  const grid = useScrollReveal(0.08);

  return (
    <section id="stories" className="scroll-mt-24 py-24 lg:py-36 bg-dark overflow-hidden">
      {/* Old deep links to /community#creative land here too. */}
      <span id="creative" className="block scroll-mt-24" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          ref={header.ref}
          className={`grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 mb-14 reveal-hidden ${header.visible ? 'reveal-visible' : ''}`}
        >
          <div>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-white leading-snug">
              كل امرأة تحمل <span className="text-gold-400">قصة</span>
              <br />
              تستحق أن تُروى
            </h2>
            <p className="text-dusk-200 text-base mt-5 max-w-xl leading-loose">
              لم يكن الهدف أن تبقى المرأة متلقية للدعم فقط، لذلك فتحت ناجية مساحتَي «ناجية مبدعة» و«ناجية منتجة» لتُعيد تقديم الناجية للمجتمع باعتبارها قادرة ومنتجة وصاحبة تجربة وقيمة — بعضها يُحكى بالكلمات، وبعضها يُصنع باليد.
            </p>
          </div>
          <div className="lg:pt-14">
            <ul className="space-y-4 mb-8">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-white/90 leading-relaxed">
                  <OutlineIcon name="check" className="w-5 h-5 mt-0.5 flex-shrink-0 text-gold-400" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <Ctas />
          </div>
        </div>

        <div
          ref={grid.ref}
          className={`grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-6 lg:gap-8 items-start reveal-hidden ${grid.visible ? 'reveal-visible' : ''}`}
        >
          {voices.map((v, i) => (
            <figure
              key={v.src}
              className="rounded-[1.75rem] bg-white/5 border border-white/10 p-4 lg:p-5"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <video
                src={v.src}
                poster={v.poster}
                controls
                playsInline
                preload="none"
                className={`w-full rounded-2xl bg-black ${v.orientation === 'portrait' ? 'aspect-[9/16] max-h-[34rem] object-cover' : 'aspect-video object-cover'}`}
              />
              <figcaption className="px-1 pt-5 pb-1">
                <span className="inline-block bg-gold-400/15 text-gold-200 px-3 py-1 rounded-full text-xs font-bold mb-3">{v.label}</span>
                <h3 className="text-white font-extrabold text-lg lg:text-xl leading-snug mb-2">{v.title}</h3>
                <p className="text-dusk-200 text-sm leading-loose">{v.caption}</p>
                {v.quote && (
                  <blockquote className="mt-5 text-white text-lg font-semibold leading-loose"><span className="text-gold-400 text-3xl leading-none align-[-0.35em] ml-1" aria-hidden="true">«</span>{v.quote}<span className="text-gold-400 text-3xl leading-none align-[-0.35em] mr-1" aria-hidden="true">»</span></blockquote>
                )}
                {v.event && (
                  <Link href={v.event.href} className="inline-flex items-center gap-2 mt-4 text-gold-200 text-sm font-bold hover:gap-3 transition-all">
                    {v.event.label}
                    <Arrow />
                  </Link>
                )}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-10 text-center text-dusk-200 text-sm leading-loose">
          قصتك تُنشر بموافقتك وحدك — تجربتك قد تكون الطمأنينة التي تبحث عنها ناجية أخرى اليوم.
        </p>
      </div>
    </section>
  );
}
