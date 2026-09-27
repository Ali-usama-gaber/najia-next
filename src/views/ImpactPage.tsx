'use client';

import PageHeader from '../components/PageHeader';
import Impact from '../components/Impact';
import JoinSection from '../components/Join';
import ImpactCard from '../components/ImpactCard';
import { mediaItems, pressItems, recognitionItems, researchItems, type ImpactItem } from '../data/impact';
import { useScrollReveal } from '../hooks/useScrollReveal';

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

function Grid({ items, dark }: { items: ImpactItem[]; dark?: boolean }) {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, i) => (
        <div key={item.slug} className={`reveal-hidden ${visible ? 'reveal-visible' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}>
          <ImpactCard item={item} dark={dark} />
        </div>
      ))}
    </div>
  );
}

function RecognitionSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHead id="recognition" title="تكريم" highlight="ناجية" intro="محطات تقدير لمبادرة بدأت مجموعةَ دعم صغيرة — لكل تكريم صفحته بصوره وتفاصيله." />
        <Grid items={recognitionItems} />
      </div>
    </section>
  );
}

function MediaSection() {
  return (
    <section className="py-20 lg:py-28 bg-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHead dark id="media" title="ناجية" highlight="في الإعلام" intro="تغطيات تلفزيونية ومحاضرات عن ناجية، وأخبار نشرتها الصحف عن ملتقياتها وتكريمها." />
        <Grid items={mediaItems} dark />
        {pressItems.length > 0 && (
          <>
            <h3 id="press" className="scroll-mt-28 text-white font-extrabold text-2xl mt-16 mb-8">في <span className="text-gold-200">الصحف</span></h3>
            <Grid items={pressItems} dark />
          </>
        )}
      </div>
    </section>
  );
}

function ResearchSection() {
  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHead id="research" title="أبحاث" highlight="ومنشورات علمية" intro="من مجموعة واتساب إلى موضوع للبحث العلمي: منشورات وثّقت تجربة ناجية أو ذكرتها." />
        <Grid items={researchItems} />
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
