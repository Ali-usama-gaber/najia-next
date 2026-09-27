'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import PageHeader from '../components/PageHeader';
import JoinSection from '../components/Join';
import { CollectionFrame, FilterChips, SearchBox, countLabel, matches, usePaged } from '../components/Collection';
import { knowledgeTopics } from '../data/knowledge';
import { libraryVideos, videoSeries, type LibraryVideo } from '../data/videos';
import { Disclaimer } from './KnowledgePage';
import { asset } from '../lib/asset';

// «المعرفة ← فيديوهات»: answers from Najia's specialists, one question per
// clip, hosted on the site and played in place (no trip to YouTube).

const PAGE_SIZE = 9;
const ALL_TOPICS = 'كل الموضوعات';
const topics = [ALL_TOPICS, ...knowledgeTopics.filter((t) => libraryVideos.some((v) => v.topic === t))];

function Play({ size = 'md' }: { size?: 'md' | 'lg' }) {
  return (
    <span className={`rounded-full bg-white/95 text-purple-600 flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110 ${size === 'lg' ? 'w-16 h-16' : 'w-12 h-12'}`}>
      <svg className={`${size === 'lg' ? 'w-7 h-7' : 'w-5 h-5'} translate-x-[2px]`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg>
    </span>
  );
}

function VideoCard({ video, onOpen }: { video: LibraryVideo; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="story-card group h-full flex flex-col text-right bg-cream border border-line-soft rounded-[1.5rem] overflow-hidden hover:border-purple-200 hover:shadow-xl hover:shadow-purple-100/60 hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-500/30"
    >
      <span className="relative block aspect-video bg-dark overflow-hidden">
        <img src={asset(video.poster)} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
        <span className="absolute inset-0 flex items-center justify-center"><Play /></span>
        <span className="absolute bottom-3 left-3 bg-dark/80 text-white text-xs font-bold px-2.5 py-1 rounded-full tabular-nums">{video.duration}</span>
      </span>
      <span className="p-5 flex-1 flex flex-col">
        <span className="text-xs font-bold text-purple-500 mb-1.5">{video.topic}</span>
        <span className="block font-extrabold text-dark leading-snug mb-2 group-hover:text-purple-600 transition-colors">{video.title}</span>
        <span className="block text-mid text-sm leading-relaxed">{video.desc}</span>
      </span>
    </button>
  );
}

function Player({ list, index, onClose, onMove }: { list: LibraryVideo[]; index: number; onClose: () => void; onMove: (i: number) => void }) {
  const video = list[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = overflow; };
  }, [onClose]);

  const prev = list[index - 1];
  const next = list[index + 1];
  const nav = 'min-h-11 inline-flex items-center gap-2 px-4 rounded-full text-sm font-bold transition-colors';

  return (
    <div className="fixed inset-0 z-[60] bg-dark/95 backdrop-blur-sm overflow-y-auto" role="dialog" aria-modal="true" aria-label={video.title} onClick={onClose}>
      <div className="min-h-full flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-start mb-3">
            <button ref={closeRef} type="button" onClick={onClose} aria-label="إغلاق" className="w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <video key={video.src} src={asset(video.src)} poster={asset(video.poster)} controls autoPlay playsInline className="w-full aspect-video rounded-2xl bg-black" />
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-5 items-start">
            <div>
              <span className="text-xs font-bold text-gold-200">{video.topic} · {video.duration}</span>
              <h2 className="text-white text-xl lg:text-2xl font-extrabold leading-snug mt-1 mb-2">{video.title}</h2>
              <p className="text-purple-200 text-sm leading-relaxed max-w-3xl">{video.desc}</p>
              <p className="text-dusk-200 text-xs mt-3">
                من لقاء <Link href={`/events/${video.event}`} className="text-gold-200 font-bold underline underline-offset-4">«{videoSeries.title}»</Link> — {videoSeries.date}
              </p>
            </div>
            <div className="flex gap-2">
              <button type="button" disabled={!prev} onClick={() => onMove(index - 1)} className={`${nav} bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none`}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
                السابق
              </button>
              <button type="button" disabled={!next} onClick={() => onMove(index + 1)} className={`${nav} bg-gold-400 text-dark hover:bg-gold-300 disabled:opacity-30 disabled:pointer-events-none`}>
                التالي
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Library() {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState(ALL_TOPICS);
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);

  const filtered = useMemo(
    () =>
      libraryVideos
        .filter((v) => topic === ALL_TOPICS || v.topic === topic)
        .filter((v) => matches(query, v.title, v.desc, v.topic)),
    [query, topic],
  );
  const { page, pages, slice, setPage } = usePaged(filtered, PAGE_SIZE, `${query}|${topic}`);
  const reset = () => { setQuery(''); setTopic(ALL_TOPICS); };
  const offset = (page - 1) * PAGE_SIZE;

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-dark leading-snug mb-3">
            «{videoSeries.title}»
          </h2>
          <p className="text-mid leading-loose">
            لقاء ناجية الافتراضي ({videoSeries.date}) مقسّمًا سؤالًا بسؤال: أسئلة الناجيات يجيب عنها فريق من الأطباء والمختصين، منهم {videoSeries.speakers.join('، ')}.
            {' '}<Link href={`/events/${videoSeries.event}`} className="font-bold text-purple-500 underline underline-offset-4">صفحة اللقاء</Link>
          </p>
        </div>
        <CollectionFrame
          controls={
            <>
              <SearchBox value={query} onChange={setQuery} placeholder="ابحثي في الفيديوهات: الشعر، الحمل، الوذمة…" label="البحث في الفيديوهات" />
              <FilterChips options={topics} value={topic} onChange={setTopic} label="تصفية حسب الموضوع" />
            </>
          }
          count={filtered.length}
          noun={(n) => countLabel(n, 'مقطع واحد', 'مقطعان', 'مقاطع', 'مقطعًا')}
          page={page}
          pages={pages}
          onPage={setPage}
          onReset={reset}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {slice.map((v, i) => <VideoCard key={v.slug} video={v} onOpen={() => setOpen(offset + i)} />)}
          </div>
        </CollectionFrame>
        <Disclaimer />
      </div>
      {open !== null && filtered[open] && (
        <Player list={filtered} index={open} onClose={close} onMove={setOpen} />
      )}
    </section>
  );
}

export default function VideosPage() {
  return <>
    <PageHeader
      title="فيديوهات"
      highlight="المعرفة"
      subtitle="إجابات مصوّرة من أطباء ومختصين في لقاءات ناجية عن أكثر ما تسأل عنه الناجيات بعد العلاج، مقطعًا لكل سؤال."
      crumbs={[{ label: 'الرئيسية', to: '/' }, { label: 'المعرفة', to: '/knowledge' }, { label: 'فيديوهات', to: '/knowledge/videos' }]}
    />
    <Library />
    <JoinSection />
  </>;
}
