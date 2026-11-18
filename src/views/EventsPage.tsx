'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import PageHeader from '../components/PageHeader';
import JoinSection from '../components/Join';
import OutlineIcon, { type IconName } from '../components/OutlineIcon';
import { gatherings, type NajiaEvent } from '../data/events';
import { CollectionFrame, FilterBar, FilterSelect, SearchBox, countLabel, matches, usePaged } from '../components/Collection';
import { useScrollReveal } from '../hooks/useScrollReveal';

import { asset } from '../lib/asset';
const programs: { title: string; desc: string; icon: IconName }[] = [
  { title: 'لقاءات مباشرة مع الأطباء', desc: 'جلسات دورية حول محاور ما بعد العلاج مع مساحة مفتوحة للأسئلة.', icon: 'message' },
  { title: 'ورش التمكين', desc: 'ورش عملية في المهارات والمشاريع الصغيرة والعودة إلى العمل.', icon: 'spark' },
  { title: 'جلسات الدعم النفسي', desc: 'مساحات مصغّرة أكثر خصوصية لمن تحتاج حديثًا أعمق.', icon: 'heart' },
  { title: 'مبادرات الوقاية والكشف المبكر', desc: 'برامج توعية تمتد إلى خارج المجتمع، للعائلات والمجتمع الأوسع.', icon: 'shield' },
];

// The latest gathering, featured above the archive.
function LatestSection() {
  const { ref, visible } = useScrollReveal(0.1);
  const latest = gatherings[gatherings.length - 1];
  if (!latest) return null;
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={`/events/${latest.slug}`}
          className={`group grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] overflow-hidden rounded-[1.75rem] bg-dark hover:shadow-2xl hover:shadow-purple-200/50 transition-shadow reveal-hidden ${visible ? 'reveal-visible' : ''}`}
        >
          <span className="relative block aspect-[16/10] lg:aspect-auto lg:min-h-[22rem] overflow-hidden">
            <img src={asset(latest.hero ?? latest.cover)} alt={`من ${latest.fullTitle}`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </span>
          <span className="p-8 lg:p-10 flex flex-col justify-center">
            <span className="text-gold-200 font-bold text-sm mb-2">أحدث ملتقى · {latest.year}</span>
            <span className="block text-white font-extrabold text-2xl lg:text-3xl leading-snug mb-3">{latest.fullTitle}</span>
            <span className="block text-purple-200 leading-loose mb-6">{latest.summary}</span>
            <span className="flex flex-wrap gap-2 mb-7 text-sm">
              {[latest.date, latest.venue].filter(Boolean).map((t) => <span key={t} className="bg-white/10 text-white px-3.5 py-1.5 rounded-full font-semibold">{t}</span>)}
            </span>
            <span className="self-start inline-flex items-center gap-2 bg-gold-400 text-dark px-7 py-3.5 rounded-full font-bold text-sm group-hover:bg-gold-300 transition-colors">
              {latest.sessions?.length ? 'شاهدي فقرات الملتقى' : 'صفحة الفعالية'}
              <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
          </span>
        </Link>
      </div>
    </section>
  );
}

// ── أرشيف الفعاليات: أغلفة حقيقية من مواد الفعاليات، وكل فعالية لها صفحتها.
// الأرشيف سيكبر كل عام، لذلك يُتصفَّح بالبحث والتصفية وعلى صفحات.

const PAGE_SIZE = 6;
const ALL = 'كل السنوات';
const ALL_KINDS = 'كل الأنواع';

const years = [ALL, ...Array.from(new Set(gatherings.flatMap((e) => e.year.split(' · '))))].sort((a, b) =>
  a === ALL ? -1 : b === ALL ? 1 : b.localeCompare(a, 'ar'),
);
const kinds = [ALL_KINDS, ...Array.from(new Set(gatherings.map((e) => e.kind)))];

function EventCard({ event }: { event: NajiaEvent }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="story-card group h-full flex flex-col text-right bg-white rounded-[1.5rem] overflow-hidden border border-purple-100 hover:shadow-xl hover:shadow-purple-100/60 transition-all duration-400 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-500/30"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-dark">
        <img
          src={asset(event.cover)}
          alt={`غلاف ${event.title}`}
          loading="lazy"
          className="w-full h-full object-cover"
          style={{ objectPosition: event.coverPosition ?? 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
        <span className="absolute top-4 right-4 bg-gold-400 text-dark text-xs font-bold px-3 py-1 rounded-full">{event.year}</span>
        {event.sessions && event.sessions.length > 0 ? (
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 bg-white/90 text-purple-600 text-xs font-bold px-3 py-1.5 rounded-full">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg>
            {event.sessions.length.toLocaleString('ar-SA')} فقرة مصوّرة
          </span>
        ) : event.videos && event.videos.length > 0 && (
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 bg-white/90 text-purple-600 text-xs font-bold px-3 py-1.5 rounded-full">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg>
            {event.videos.length === 1 ? 'فيديو' : event.videos.length === 2 ? 'فيديوهان' : `${event.videos.length.toLocaleString('ar-SA')} فيديوهات`}
          </span>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <span className="text-xs font-bold text-purple-500">{event.kind}</span>
        <h4 className="font-extrabold text-dark leading-snug mt-1 mb-1.5 group-hover:text-purple-500 transition-colors">{event.title}</h4>
        {event.date && (
          <div className="text-xs text-mid flex items-center gap-1.5">
            <OutlineIcon name="calendar" className="w-3.5 h-3.5 text-purple-500" />
            {event.date}
          </div>
        )}
        {event.venue && (
          <div className="text-xs text-mid flex items-center gap-1.5 mt-1.5">
            <OutlineIcon name="pin" className="w-3.5 h-3.5 text-purple-500" />
            {event.venue}
          </div>
        )}
        <span className="inline-flex items-center gap-1.5 mt-auto pt-4 text-purple-500 text-sm font-bold">
          صفحة الفعالية
          <svg className="w-3.5 h-3.5 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </span>
      </div>
    </Link>
  );
}

function EventsArchive() {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState(ALL);
  const [kind, setKind] = useState(ALL_KINDS);

  const filtered = useMemo(
    () =>
      gatherings
        .filter((e) => year === ALL || e.year.includes(year))
        .filter((e) => kind === ALL_KINDS || e.kind === kind)
        .filter((e) => matches(query, e.title, e.fullTitle, e.kind, e.venue, e.summary, e.program?.map((p) => `${p.title} ${p.speaker ?? ''}`).join(' ')))
        // الأحدث أولًا
        .slice()
        .reverse(),
    [query, year, kind],
  );
  const { page, pages, slice, setPage } = usePaged(filtered, PAGE_SIZE, `${query}|${year}|${kind}`);
  const reset = () => { setQuery(''); setYear(ALL); setKind(ALL_KINDS); };

  return (
    <section id="archive" className="scroll-mt-24 py-16 lg:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-8">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-dark mb-2">أرشيف الفعاليات</h2>
          <p className="text-mid">من مواد الفعاليات الرسمية — ابحثي بالعنوان أو المتحدثة أو الموضوع، أو صفّي حسب السنة والنوع.</p>
        </div>

        <CollectionFrame
          controls={
            <FilterBar
              search={<SearchBox value={query} onChange={setQuery} placeholder="الوذمة، التغذية، د. ريم…" label="البحث في الفعاليات" />}
              filters={<>
                <FilterSelect options={years} value={year} onChange={setYear} label="السنة" />
                <FilterSelect options={kinds} value={kind} onChange={setKind} label="نوع الفعالية" />
              </>}
            />
          }
          count={filtered.length}
          noun={(n) => countLabel(n, 'فعالية واحدة', 'فعاليتان', 'فعاليات', 'فعالية')}
          page={page}
          pages={pages}
          onPage={setPage}
          onReset={reset}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {slice.map((event) => <EventCard key={event.slug} event={event} />)}
          </div>
        </CollectionFrame>

        <p className="text-mid text-xs mt-8">محطات أخرى في رحلة ناجية — الانطلاق ٢٠١٦ وجائزة جدة للإبداع ٢٠٢١ — تجدينها في <Link href="/about#timeline" className="font-bold text-purple-500 underline underline-offset-4">قصة ناجية</Link> و<Link href="/impact" className="font-bold text-purple-500 underline underline-offset-4">أثر ناجية</Link>.</p>
      </div>
    </section>
  );
}

function ProgramsSection() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={ref} className={`reveal-hidden ${visible ? 'reveal-visible' : ''}`}>
          <h3 className="text-2xl font-extrabold text-dark mb-8">برامج على مدار العام</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {programs.map((program, i) => (
              <article
                key={program.title}
                className={`bg-cream border border-purple-100 rounded-2xl p-6 reveal-hidden ${visible ? 'reveal-visible' : ''}`}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className="w-11 h-11 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center mb-5"><OutlineIcon name={program.icon} className="w-5 h-5" /></div>
                <h4 className="font-extrabold text-dark mb-2">{program.title}</h4>
                <p className="text-mid text-sm leading-loose">{program.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function EventsPage() {
  return <>
    <PageHeader title="فعاليات" highlight="ناجية" subtitle="ملتقى سنوي يجمع الناجيات وعائلاتهن والمتخصصين، ولقاءات وورش تمتد على مدار العام — حضوريًا وافتراضيًا." crumbs={[{ label: 'الرئيسية', to: '/' }, { label: 'الفعاليات', to: '/events' }]} />
    <LatestSection />
    <EventsArchive />
    <ProgramsSection />
    <JoinSection />
  </>;
}
