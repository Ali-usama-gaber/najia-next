'use client';

import { useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader';
import LibraryCard from '../components/LibraryCard';
import JoinSection from '../components/Join';
import OutlineIcon from '../components/OutlineIcon';
import { CollectionFrame, FilterChips, SearchBox, countLabel, matches, usePaged } from '../components/Collection';
import { articles, knowledgeTopics, medicalDisclaimer, type LibraryType } from '../data/knowledge';

// «المعرفة ← أدلة ومقالات»: the written library, browsable by search, type
// and topic, a page at a time.

const PAGE_SIZE = 6;
const ALL_TYPES = 'الكل';
const ALL_TOPICS = 'كل الموضوعات';
const typeFilters = [ALL_TYPES, 'دليل', 'مقال'] as const;
const typeLabel = (t: (typeof typeFilters)[number]) => (t === ALL_TYPES ? 'الكل' : t === 'دليل' ? 'الأدلة' : 'المقالات');
// Only topics that have at least one article, in the approved order.
const topics = [ALL_TOPICS, ...knowledgeTopics.filter((t) => articles.some((a) => a.topic === t))];

export function Disclaimer() {
  return (
    <div className="mt-12 flex items-start gap-3 bg-cream border border-purple-100 rounded-2xl p-5">
      <OutlineIcon name="shield" className="w-5 h-5 mt-0.5 flex-shrink-0 text-purple-500" />
      <p className="text-mid text-sm leading-relaxed"><span className="font-bold text-dark">تنويه: </span>{medicalDisclaimer}</p>
    </div>
  );
}

function Library() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<(typeof typeFilters)[number]>(ALL_TYPES);
  const [topic, setTopic] = useState(ALL_TOPICS);

  const filtered = useMemo(
    () =>
      articles
        .filter((a) => type === ALL_TYPES || a.type === (type as LibraryType))
        .filter((a) => topic === ALL_TOPICS || a.topic === topic)
        .filter((a) => matches(query, a.title, a.desc, a.topic, a.lead, a.sections.map((s) => s.heading).join(' '))),
    [query, type, topic],
  );
  const { page, pages, slice, setPage } = usePaged(filtered, PAGE_SIZE, `${query}|${type}|${topic}`);
  const reset = () => { setQuery(''); setType(ALL_TYPES); setTopic(ALL_TOPICS); };

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <CollectionFrame
          controls={
            <>
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
                <SearchBox value={query} onChange={setQuery} placeholder="ابحثي في المكتبة: الحمل، الرياضة، الخوف…" label="البحث في الأدلة والمقالات" />
                <FilterChips options={typeFilters} value={type} onChange={setType} label="تصفية حسب النوع" format={typeLabel} />
              </div>
              <FilterChips options={topics} value={topic} onChange={setTopic} label="تصفية حسب الموضوع" />
            </>
          }
          count={filtered.length}
          noun={(n) => countLabel(n, 'مادة واحدة', 'مادتان', 'مواد', 'مادة')}
          page={page}
          pages={pages}
          onPage={setPage}
          onReset={reset}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {slice.map((article) => <LibraryCard key={article.slug} article={article} />)}
          </div>
        </CollectionFrame>
        <Disclaimer />
      </div>
    </section>
  );
}

export default function KnowledgePage() {
  return <>
    <PageHeader
      title="أدلة"
      highlight="ومقالات"
      subtitle="قراءات عربية مبسّطة تجيب عن الأسئلة التي لا يتّسع لها وقت العيادة، مبنية على إرشادات طبية موثوقة تُذكر مصادرها أسفل كل مقال."
      crumbs={[{ label: 'الرئيسية', to: '/' }, { label: 'المعرفة', to: '/knowledge' }, { label: 'أدلة ومقالات', to: '/knowledge/articles' }]}
    />
    <Library />
    <JoinSection />
  </>;
}
