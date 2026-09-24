'use client';

import { useScrollReveal } from '../hooks/useScrollReveal';

import { asset } from '../lib/asset';
export default function Founder() {
  const { ref, visible } = useScrollReveal(0.15);

  return (
    <section id="founder" className="py-20 lg:py-28 bg-white border-t border-line-soft">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className={`flex flex-col sm:flex-row items-center gap-8 reveal-hidden ${visible ? 'reveal-visible' : ''}`}
        >
          {/* Portrait */}
          <img
            src={asset('/founder.jpg')}
            alt="أ.د. أطلال أبوسند"
            className={`flex-shrink-0 w-24 h-24 rounded-full object-cover ring-4 ring-purple-100 shadow-lg shadow-purple-200/40 transition-all duration-700 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
          />

          {/* Text */}
          <div className="text-center sm:text-right">
            <span className="text-gold-600 text-sm font-bold">المؤسِّسة</span>
            <h3 className="text-xl font-extrabold text-dark mt-1">أ.د. أطلال أبوسند</h3>
            <p className="text-purple-600 text-sm font-semibold mt-1 mb-3">أستاذ واستشاري طب الأورام وأورام الثدي</p>
            <p className="text-mid text-base leading-loose">
              أسست مجتمع ناجية عام ٢٠١٦ إيمانًا بأن رعاية المريضة لا تنتهي بانتهاء بروتوكول العلاج، وقادت تحوّله من مجموعة رقمية صغيرة إلى نموذج للرعاية الممتدة يجمع الخدمة المجتمعية بالبحث العلمي.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
