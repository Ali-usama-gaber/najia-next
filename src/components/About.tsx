'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useScrollReveal } from '../hooks/useScrollReveal';

import { asset } from '../lib/asset';
export default function About({ preview = false }: { preview?: boolean }) {
  const pathname = usePathname();
  const left = useScrollReveal(0.12);
  const right = useScrollReveal(0.12);

  return (
    <section id="about" className="py-24 lg:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
        {/* Image side */}
        <div
          ref={left.ref}
          className={`relative reveal-left ${left.visible ? 'reveal-visible' : ''}`}
        >
          {/* Main image — from a real Najia gathering */}
          <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] shadow-2xl shadow-purple-200/40">
            <img
              src={asset('/community-stage.jpg')}
              alt="ناجيات ومتخصصات على المسرح في إحدى فعاليات مجتمع ناجية"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent" />
          </div>

          {/* Year chip */}
          <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl px-6 py-4 shadow-xl shadow-purple-100/80">
            <div className="text-3xl font-black text-gold-500">٢٠١٦</div>
            <div className="text-mid text-xs font-semibold mt-0.5 max-w-[130px] leading-snug">
              انطلاق مجتمع ناجية كمجموعة رقمية صغيرة
            </div>
          </div>

          {/* Purple accent blob */}
          <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-purple-500/12 blur-2xl" />
        </div>

        {/* Text side */}
        <div
          ref={right.ref}
          className={`reveal-right ${right.visible ? 'reveal-visible' : ''}`}
        >

          <h2 className="text-3xl lg:text-[2.6rem] font-extrabold text-dark leading-snug mb-7">
            من مجموعة واتساب صغيرة
            <br />
            <span className="text-purple-500">إلى مجتمع مستدام</span>
          </h2>

          <p className="text-mid text-base lg:text-lg leading-[2] mb-8">
            بدأت ناجية من حاجة بسيطة وواضحة: نساء انتهين من العلاج ولم ينتهِ سؤالهن. مجموعة رقمية صغيرة جمعت ناجيات من سرطان الثدي حول طبيبة تعرف تفاصيل رحلتهن، فتحوّل الحديث من «ماذا بعد؟» إلى إجابات موثوقة وتجارب حقيقية.
          </p>

          <blockquote className="relative my-9 bg-cream rounded-2xl py-6 pr-14 pl-6">
            <span className="absolute top-3 right-5 text-5xl font-black text-gold-400/45 leading-none select-none" aria-hidden="true">”</span>
            <p className="text-xl font-extrabold text-dark leading-relaxed">
              الرعاية لا تنتهي بانتهاء العلاج
            </p>
            <cite className="text-mid text-sm mt-2 block not-italic">— الفكرة الأساسية لمجتمع ناجية</cite>
          </blockquote>

          {!preview && (
            <p className="text-mid text-base leading-loose">
              تطوّرت المجموعة تدريجيًا إلى مجتمع متكامل يجمع بين الدعم النفسي والاجتماعي، والتثقيف الصحي، والتمكين، والمناصرة. ويضم اليوم نحو ٣٠٠ عضوة أساسيات ضمن بيئة تحرص على الخصوصية والسرية قبل أي شيء.
            </p>
          )}

          <div className="flex flex-wrap gap-3 mt-10">
            {['الدعم', 'المعرفة', 'التمكين', 'المناصرة والعطاء'].map((tag, i) => (
              <span
                key={tag}
                className="bg-purple-50 text-purple-600 border border-purple-200 px-4 py-1.5 rounded-full text-sm font-semibold"
                style={{
                  opacity: right.visible ? 1 : 0,
                  transform: right.visible ? 'translateY(0)' : 'translateY(10px)',
                  transition: `opacity 0.5s ease ${250 + i * 80}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${250 + i * 80}ms`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {pathname !== '/about' && (
            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-8 text-purple-500 font-bold text-sm hover:gap-4 transition-all duration-300 group"
            >
              تعرّفي على ناجية
              <svg className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
