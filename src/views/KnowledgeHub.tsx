'use client';

import Link from 'next/link';
import PageHeader from '../components/PageHeader';
import JoinSection from '../components/Join';
import LibraryCard from '../components/LibraryCard';
import OutlineIcon, { type IconName } from '../components/OutlineIcon';
import { articles, knowledgeTopics } from '../data/knowledge';
import { libraryVideos } from '../data/videos';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { asset } from '../lib/asset';
import { Disclaimer } from './KnowledgePage';

// /knowledge: the landing for «المعرفة». The nav opens its two parts
// directly; this page is where the breadcrumb and old links arrive.

const ar = (n: number) => n.toLocaleString('ar-SA');

function Door({ href, icon, title, desc, count, image }: { href: string; icon: IconName; title: string; desc: string; count: string; image?: string }) {
  return (
    <Link
      href={href}
      className="story-card group relative overflow-hidden flex flex-col justify-end min-h-[18rem] rounded-[1.75rem] bg-purple-500 p-7 lg:p-9 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-purple-300/40 transition-all duration-400"
    >
      {image && <img src={asset(image)} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" />}
      <span className="absolute inset-0 bg-gradient-to-t from-purple-700 via-purple-600/70 to-transparent" />
      <span className="relative">
        <span className="w-12 h-12 rounded-full bg-white/15 text-gold-200 flex items-center justify-center mb-5"><OutlineIcon name={icon} className="w-6 h-6" /></span>
        <span className="block text-gold-200 text-sm font-bold mb-1">{count}</span>
        <span className="block text-white text-2xl lg:text-3xl font-extrabold mb-2">{title}</span>
        <span className="block text-purple-100 leading-relaxed max-w-md mb-5">{desc}</span>
        <span className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-full text-sm font-bold group-hover:gap-3 transition-all">
          تصفّحي
          <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </span>
      </span>
    </Link>
  );
}

export default function KnowledgeHub() {
  const topicsReveal = useScrollReveal(0.15);
  return (
    <>
      <PageHeader
        title="المعرفة"
        highlight="عن الحياة بعد السرطان"
        subtitle="محتوى عربي مبسّط يجيب عن الأسئلة التي لا يتّسع لها وقت العيادة: أدلة ومقالات مكتوبة، وإجابات مصوّرة من أطباء ومختصين."
        crumbs={[{ label: 'الرئيسية', to: '/' }, { label: 'المعرفة', to: '/knowledge' }]}
      />
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <Door href="/knowledge/articles" icon="book" title="أدلة ومقالات" desc="قراءات مكتوبة بمصادرها العلمية عن أكثر ما تسأل عنه الناجيات." count={`${ar(articles.length)} مواد مكتوبة`} image="/community-stage.jpg" />
            <Door href="/knowledge/videos" icon="spark" title="فيديوهات" desc="أسئلة الناجيات وإجابات الأطباء والمختصين، مقطعًا لكل سؤال." count={`${ar(libraryVideos.length)} مقطعًا مصوّرًا`} image={libraryVideos[1]?.poster} />
          </div>

          <div ref={topicsReveal.ref} className="mb-16">
            <h2 className="text-xl font-extrabold text-dark mb-2">الموضوعات التي نغطيها</h2>
            <p className="text-mid text-sm mb-6">ثلاثة عشر محورًا تمسّ الحياة الحقيقية بعد العلاج.</p>
            <div className="flex flex-wrap gap-2.5">
              {knowledgeTopics.map((topic, i) => (
                <span key={topic} className="bg-purple-50 border border-purple-100 text-mid px-4 py-2 rounded-full text-sm font-semibold" style={{ opacity: topicsReveal.visible ? 1 : 0, transform: topicsReveal.visible ? 'translateY(0)' : 'translateY(10px)', transition: `opacity 0.45s ease ${i * 45}ms, transform 0.45s cubic-bezier(0.16,1,0.3,1) ${i * 45}ms` }}>
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-end justify-between gap-4 mb-6">
            <h2 className="text-xl font-extrabold text-dark">من المكتبة</h2>
            <Link href="/knowledge/articles" className="text-purple-500 text-sm font-bold hover:text-purple-700">كل الأدلة والمقالات</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(0, 3).map((a) => <LibraryCard key={a.slug} article={a} />)}
          </div>
          <Disclaimer />
        </div>
      </section>
      <JoinSection />
    </>
  );
}
