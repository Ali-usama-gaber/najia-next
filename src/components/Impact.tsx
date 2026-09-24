'use client';

import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCounter } from '../hooks/useCounter';

const metrics = [
  { value: 10, suffix: '', label: 'سنوات من الاستمرارية', sub: 'من العمل والاستمرارية منذ عام ٢٠١٦' },
  { value: 300, suffix: '', prefix: '~', label: 'عضوة أساسية', sub: 'في مجتمع ناجية' },
  { value: 900, suffix: '+', label: 'مستفيد حضوريًا', sub: 'من الفعاليات والملتقيات الحضورية' },
  { value: 3500, suffix: '+', label: 'مستفيد افتراضيًا', sub: 'من البرامج والأنشطة الافتراضية' },
  { value: 50, suffix: '+', label: 'ناجية مبدعة ومنتجة', sub: 'شاركن بمنتجاتهن وأعمالهن وتجاربهن ضمن مسارات التمكين' },
];

function CounterCard({
  value,
  suffix,
  prefix = '',
  label,
  sub,
  started,
  delay,
}: {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sub: string;
  started: boolean;
  delay: number;
}) {
  const count = useCounter(value, 2000, started);
  return (
    <div
      className="h-full flex flex-col justify-center bg-dark/70 border border-white/10 rounded-2xl p-6 lg:p-7 text-center hover:border-gold-400/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-gold-400/10 group"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="impact-number text-4xl lg:text-5xl font-black mb-1 group-hover:scale-105 transition-transform duration-300">
        {prefix}{count.toLocaleString('ar-SA')}{suffix}
      </div>
      <div className="text-white font-extrabold text-lg mb-1">{label}</div>
      <div className="text-muted text-sm">{sub}</div>
    </div>
  );
}

export default function Impact() {
  const { ref, visible } = useScrollReveal(0.15);
  const header = useScrollReveal(0.1);

  return (
    <section
      id="impact"
      className="relative py-24 lg:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, var(--color-dark) 0%, var(--color-dark-2) 60%, var(--color-dark-3) 100%)' }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, var(--color-gold-400) 0%, transparent 60%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, var(--color-purple-500) 0%, transparent 60%)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          ref={header.ref}
          className={`text-center mb-16 reveal-hidden ${header.visible ? 'reveal-visible' : ''}`}
        >
          <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-5">
            الأثر{' '}
            <span className="text-gold-400">بالأرقام</span>
          </h2>
        </div>

        {/* Metrics grid */}
        <div
          ref={ref}
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 reveal-hidden ${visible ? 'reveal-visible' : ''}`}
        >
          {metrics.map((m, i) => (
            <CounterCard
              key={m.label}
              value={m.value}
              suffix={m.suffix}
              prefix={m.prefix}
              label={m.label}
              sub={m.sub}
              started={visible}
              delay={i * 120}
            />
          ))}
        </div>

        {/* Quote */}
        <div
          className={`mt-20 text-center max-w-2xl mx-auto reveal-hidden ${visible ? 'reveal-visible' : ''}`}
          style={{ transitionDelay: '500ms' }}
        >
          <p className="text-2xl lg:text-3xl font-extrabold text-white leading-relaxed">
            "الرعاية لا تنتهي بانتهاء العلاج"
          </p>
          <div className="w-12 h-0.5 mx-auto mt-6 bg-gold-400" />
        </div>
      </div>
    </section>
  );
}
