'use client';

import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import LibraryCard from '../components/LibraryCard';
import OutlineIcon from '../components/OutlineIcon';
import { articles, knowledgeTopics, medicalDisclaimer, type LibraryType } from '../data/knowledge';
import { useScrollReveal } from '../hooks/useScrollReveal';

const typeFilters: ('الكل' | LibraryType)[] = ['الكل', 'دليل', 'مقال'];

function Topics() {
  const { ref, visible } = useScrollReveal(0.15);
  return (
    <div ref={ref} className="mb-16">
      <h3 className="text-xl font-extrabold text-dark mb-2">الموضوعات التي نغطيها</h3>
      <p className="text-mid text-sm mb-6">ثلاثة عشر محورًا تمسّ الحياة الحقيقية بعد العلاج.</p>
      <div className="flex flex-wrap gap-2.5">
        {knowledgeTopics.map((topic, i) => (
          <span key={topic} className="bg-purple-50 border border-purple-100 text-mid px-4 py-2 rounded-full text-sm font-semibold" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(10px)', transition: `opacity 0.45s ease ${i * 45}ms, transform 0.45s cubic-bezier(0.16,1,0.3,1) ${i * 45}ms` }}>
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
}

function Library() {
  const [type, setType] = useState<(typeof typeFilters)[number]>('الكل');
  const { ref, visible } = useScrollReveal(0.06);
  const filtered = articles.filter((item) => type === 'الكل' || item.type === type);

  return (
    <div>
      <h3 className="text-xl font-extrabold text-dark mb-2">المكتبة</h3>
      <p className="text-mid text-sm leading-relaxed mb-6 max-w-2xl">
        أدلة ومقالات مكتوبة بلغة واضحة عن أكثر ما تسأل عنه الناجيات بعد العلاج، ولكل مادة مصادرها العلمية أسفلها.
      </p>
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="تصفية المكتبة حسب النوع">
        {typeFilters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setType(item)}
            aria-pressed={type === item}
            className={`min-h-11 px-5 py-2 rounded-full text-sm font-bold transition-all ${
              type === item ? 'bg-purple-500 text-white shadow-md shadow-purple-300/30' : 'bg-purple-50 text-mid hover:bg-purple-100'
            }`}
          >
            {item === 'الكل' ? 'الكل' : item === 'دليل' ? 'الأدلة' : 'المقالات'}
          </button>
        ))}
      </div>
      <div
        ref={ref}
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-hidden ${visible ? 'reveal-visible' : ''}`}
      >
        {filtered.map((article, i) => (
          <div key={article.slug} style={{ transitionDelay: `${i * 60}ms` }}>
            <LibraryCard article={article} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function KnowledgeContent() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Topics />
        <Library />
        <div className="mt-12 flex items-start gap-3 bg-cream border border-purple-100 rounded-2xl p-5">
          <OutlineIcon name="shield" className="w-5 h-5 mt-0.5 flex-shrink-0 text-purple-500" />
          <p className="text-mid text-sm leading-relaxed"><span className="font-bold text-dark">تنويه: </span>{medicalDisclaimer}</p>
        </div>
      </div>
    </section>
  );
}

export default function KnowledgePage() {
  return <>
    <PageHeader title="معرفة موثوقة" highlight="عن الحياة بعد السرطان" subtitle="محتوى عربي مبسط يجيب عن الأسئلة التي لا يتّسع لها وقت العيادة، مبني على إرشادات طبية موثوقة تُذكر مصادرها أسفل كل مقال." crumbs={[{ label: 'الرئيسية', to: '/' }, { label: 'المعرفة', to: '/discover#knowledge' }]} />
    <KnowledgeContent />
  </>;
}
