'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import PageHeader from '../components/PageHeader';
import JoinSection from '../components/Join';
import { CollectionFrame, FilterBar, FilterSelect, SearchBox, countLabel, matches, usePaged } from '../components/Collection';
import { knowledgeTopics } from '../data/knowledge';
import { clipsOf, totalMinutes, videoSeriesList, type VideoSeries } from '../data/videos';
import { Disclaimer } from './KnowledgePage';
import { asset } from '../lib/asset';

// «المعرفة ← فيديوهات»: each recorded session is one card; its page holds
// every clip with a playlist. Search and the topic filter look inside the clips.

const PAGE_SIZE = 6;
const ALL_TOPICS = 'كل الموضوعات';
const ALL_YEARS = 'كل السنوات';
const ar = (n: number) => n.toLocaleString('ar-SA');
const topics = [ALL_TOPICS, ...knowledgeTopics.filter((t) => videoSeriesList.some((s) => clipsOf(s.slug).some((c) => c.topic === t)))];
const years = [ALL_YEARS, ...Array.from(new Set(videoSeriesList.map((s) => s.year)))];

function SeriesCard({ series, deepLink, matched }: { series: VideoSeries; deepLink?: string; matched: string[] }) {
  return (
    <Link
      href={`/knowledge/videos/${series.slug}${deepLink ? `#${deepLink}` : ''}`}
      className="story-card group h-full flex flex-col bg-cream border border-line-soft rounded-[1.5rem] overflow-hidden hover:border-purple-200 hover:shadow-xl hover:shadow-purple-100/60 hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-500/30"
    >
      <span className="relative block aspect-video bg-dark overflow-hidden">
        <img src={asset(series.cover)} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
        <span className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/10 to-transparent" />
        <span className="absolute top-4 right-4 bg-gold-400 text-dark text-xs font-bold px-3 py-1 rounded-full">{series.year}</span>
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-14 h-14 rounded-full bg-white/95 text-purple-600 flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
            <svg className="w-6 h-6 translate-x-[2px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg>
          </span>
        </span>
        <span className="absolute bottom-3 right-4 left-4 flex items-center justify-between text-white text-xs font-bold">
          <span>{ar(clipsOf(series.slug).length)} مقطعًا</span>
          <span>نحو {ar(totalMinutes(series.slug))} دقيقة</span>
        </span>
      </span>
      <span className="p-6 flex-1 flex flex-col">
        <span className="text-xs font-bold text-purple-500 mb-1.5">{series.kind} · {series.date}</span>
        <span className="block font-extrabold text-dark text-lg leading-snug mb-2 group-hover:text-purple-600 transition-colors">{series.title}</span>
        <span className="block text-mid text-sm leading-relaxed mb-4">{series.summary}</span>
        {matched.length > 0 && (
          <span className="block text-xs text-mid bg-white border border-purple-100 rounded-xl p-3 mb-4 leading-relaxed">
            <span className="font-bold text-purple-600">مقاطع مطابقة: </span>
            {matched.slice(0, 3).join('، ')}{matched.length > 3 ? ` و${ar(matched.length - 3)} غيرها` : ''}
          </span>
        )}
        <span className="mt-auto inline-flex items-center gap-2 text-purple-500 text-sm font-bold group-hover:gap-3 transition-all">
          شاهدي المقاطع
          <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </span>
      </span>
    </Link>
  );
}

function Library() {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState(ALL_TOPICS);
  const [year, setYear] = useState(ALL_YEARS);
  const filtering = query.trim() !== '' || topic !== ALL_TOPICS;

  const results = useMemo(
    () =>
      videoSeriesList
        .filter((s) => year === ALL_YEARS || s.year === year)
        .map((s) => ({
          series: s,
          clips: clipsOf(s.slug).filter((c) => (topic === ALL_TOPICS || c.topic === topic) && matches(query, c.title, c.desc, c.topic, s.title)),
        }))
        .filter((r) => r.clips.length > 0),
    [query, topic, year],
  );
  const { page, pages, slice, setPage } = usePaged(results, PAGE_SIZE, `${query}|${topic}|${year}`);
  const reset = () => { setQuery(''); setTopic(ALL_TOPICS); setYear(ALL_YEARS); };

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <CollectionFrame
          controls={
            <FilterBar
              search={<SearchBox value={query} onChange={setQuery} placeholder="الشعر، الحمل، الوذمة اللمفاوية…" label="البحث في الفيديوهات" />}
              filters={<>
                <FilterSelect options={topics} value={topic} onChange={setTopic} label="الموضوع" />
                <FilterSelect options={years} value={year} onChange={setYear} label="السنة" />
              </>}
            />
          }
          count={results.length}
          noun={(n) => countLabel(n, 'لقاء واحد', 'لقاءان', 'لقاءات', 'لقاءً')}
          page={page}
          pages={pages}
          onPage={setPage}
          onReset={reset}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {slice.map(({ series, clips }) => (
              <SeriesCard
                key={series.slug}
                series={series}
                deepLink={filtering ? clips[0]?.slug : undefined}
                matched={filtering ? clips.map((c) => c.title) : []}
              />
            ))}
          </div>
        </CollectionFrame>
        <Disclaimer />
      </div>
    </section>
  );
}

export default function VideosPage() {
  return <>
    <PageHeader
      title="فيديوهات"
      highlight="المعرفة"
      subtitle="لقاءات ناجية المسجّلة، مقسّمة سؤالًا بسؤال: أسئلة الناجيات وإجابات الأطباء والمختصين عن الحياة بعد العلاج."
      crumbs={[{ label: 'الرئيسية', to: '/' }, { label: 'فيديوهات', to: '/knowledge/videos' }]}
    />
    <Library />
    <JoinSection />
  </>;
}
