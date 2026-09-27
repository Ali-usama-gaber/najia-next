'use client';

import Link from 'next/link';
import PageHeader from '../components/PageHeader';
import Impact from '../components/Impact';
import JoinSection from '../components/Join';
import OutlineIcon from '../components/OutlineIcon';
import { mediaVideos, pressItems, recognitionItems, researchItems } from '../data/impact';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { asset } from '../lib/asset';

function Arrow() {
  return (
    <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function External() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5M19 5l-8 8M10 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}

function SectionHead({ id, title, highlight, intro, dark }: { id: string; title: string; highlight: string; intro: string; dark?: boolean }) {
  return (
    <div className="mb-10 lg:mb-12 max-w-3xl">
      <h2 id={id} className={`scroll-mt-28 text-3xl lg:text-4xl font-extrabold leading-snug mb-3 ${dark ? 'text-white' : 'text-dark'}`}>
        {title} <span className={dark ? 'text-gold-200' : 'text-purple-500'}>{highlight}</span>
      </h2>
      <p className={`leading-loose ${dark ? 'text-dusk-200' : 'text-mid'}`}>{intro}</p>
    </div>
  );
}

function JumpBar() {
  const links = [
    { href: '#recognition', label: 'التكريم' },
    { href: '#media', label: 'في الإعلام' },
    { href: '#research', label: 'أبحاث ومنشورات' },
    { href: '#impact', label: 'الأثر بالأرقام' },
  ];
  return (
    <div className="bg-cream border-b border-line-soft">
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex flex-wrap gap-2" aria-label="أقسام الصفحة">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="min-h-10 inline-flex items-center bg-white border border-purple-100 text-purple-600 px-4 rounded-full text-sm font-bold hover:border-purple-300 transition-colors">
            {l.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

function RecognitionSection() {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHead id="recognition" title="تكريم" highlight="ناجية" intro="محطات تقدير لمبادرة بدأت مجموعةَ دعم صغيرة، موثّقة بصورها ومصادرها." />
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recognitionItems.map((r, i) => (
            <Link
              key={r.title}
              href={r.href}
              className={`story-card group flex flex-col bg-cream border border-purple-100 rounded-[1.5rem] overflow-hidden hover:shadow-xl hover:shadow-purple-100/60 hover:-translate-y-1.5 transition-all duration-400 reveal-hidden ${visible ? 'reveal-visible' : ''}`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="relative aspect-[4/3] bg-white overflow-hidden">
                <img src={asset(r.image)} alt={r.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute top-4 right-4 bg-gold-400 text-dark text-xs font-bold px-3 py-1 rounded-full">{r.year}</span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <span className="text-xs font-bold text-purple-500 mb-1.5">{r.by}</span>
                <h3 className="font-extrabold text-dark text-lg leading-snug mb-2 group-hover:text-purple-500 transition-colors">{r.title}</h3>
                <p className="text-mid text-sm leading-loose mb-5">{r.desc}</p>
                <span className="mt-auto inline-flex items-center gap-2 text-purple-500 text-sm font-bold group-hover:gap-3 transition-all">
                  التفاصيل
                  <Arrow />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function MediaSection() {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section className="py-20 lg:py-28 bg-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHead dark id="media" title="ناجية" highlight="في الإعلام" intro="تغطيات تلفزيونية لملتقيات ناجية، وأخبار نشرتها الصحف ووكالة الأنباء السعودية." />
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {mediaVideos.map((v, i) => (
            <figure key={v.src} className={`reveal-hidden ${visible ? 'reveal-visible' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}>
              <video src={asset(v.src)} poster={asset(v.poster)} controls preload="none" playsInline className="w-full aspect-video rounded-2xl bg-black object-contain" />
              <figcaption className="mt-4">
                <span className="block text-white font-extrabold leading-snug mb-1">{v.title}</span>
                <span className="block text-purple-200 text-sm leading-relaxed">{v.caption}</span>
                <Link href={`/events/${v.event}`} className="inline-flex items-center gap-2 mt-3 text-gold-200 text-sm font-bold hover:gap-3 transition-all">
                  صفحة الملتقى
                  <Arrow />
                </Link>
              </figcaption>
            </figure>
          ))}
        </div>

        <h3 className="text-white font-extrabold text-xl mb-5">في الصحف</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pressItems.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="group h-full flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-gold-200/40 transition-colors">
                <span className="flex-1">
                  <span className="block text-xs font-bold text-gold-200 mb-1.5">{[s.publisher, s.date].filter(Boolean).join(' · ')}</span>
                  <span className="block font-bold text-white leading-snug">{s.title}</span>
                  <span className="block text-xs text-dusk-200 mt-2">عن: {s.event.title}</span>
                </span>
                <span className="text-gold-200 mt-1"><External /></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ResearchSection() {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHead id="research" title="أبحاث" highlight="ومنشورات علمية" intro="من مجموعة واتساب إلى موضوع للبحث العلمي: منشورات وثّقت تجربة ناجية أو ذكرتها، مع رابط كل منها إلى مصدره الأصلي." />
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {researchItems.map((r, i) => (
            <article
              key={r.url}
              className={`flex flex-col bg-white border border-purple-100 rounded-[1.5rem] p-6 lg:p-7 reveal-hidden ${visible ? 'reveal-visible' : ''}`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="flex items-center justify-between gap-3 mb-5">
                <span className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-3 py-1.5 rounded-full text-xs font-bold">
                  <OutlineIcon name="book" className="w-4 h-4" />
                  {r.kind}
                </span>
                <span className="text-gold-600 font-extrabold">{r.year}</span>
              </div>
              <h3 className="font-extrabold text-dark text-lg leading-snug mb-2">{r.title}</h3>
              <p className="text-xs text-mid font-semibold leading-relaxed mb-4">{r.venue} · {r.authors}</p>
              <p className="text-mid text-sm leading-loose mb-6">{r.desc}</p>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 text-purple-500 text-sm font-bold hover:text-purple-700 transition-colors">
                المصدر الأصلي
                <External />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ImpactPage() {
  return (
    <>
      <PageHeader
        title="أثر"
        highlight="ناجية"
        subtitle="عشر سنوات من الدعم تركت أثرًا يمكن رؤيته: تكريم، وحضور في الإعلام، وأبحاث منشورة، وأرقام تحكي عن آلاف المستفيدات."
        crumbs={[{ label: 'الرئيسية', to: '/' }, { label: 'أثر ناجية', to: '/impact' }]}
      />
      <JumpBar />
      <RecognitionSection />
      <MediaSection />
      <ResearchSection />
      <Impact />
      <JoinSection />
    </>
  );
}
