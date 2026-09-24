'use client';

import Link from 'next/link';
import PageHeader from '../components/PageHeader';
import LibraryCard from '../components/LibraryCard';
import OutlineIcon from '../components/OutlineIcon';
import JoinSection from '../components/Join';
import { articles, medicalDisclaimer, readLabel, type Article } from '../data/knowledge';
import { useScrollReveal } from '../hooks/useScrollReveal';

function Body({ article }: { article: Article }) {
  const { ref, visible } = useScrollReveal(0.05);
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1fr_18rem] gap-12 lg:gap-16 items-start">
        <article ref={ref} className={`max-w-3xl reveal-hidden ${visible ? 'reveal-visible' : ''}`}>
          <p className="text-dark text-lg lg:text-xl leading-loose font-semibold mb-12">{article.lead}</p>

          <div className="space-y-12">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-extrabold text-dark mb-5 leading-snug">{section.heading}</h2>
                {section.paragraphs?.map((p) => (
                  <p key={p} className="text-ink text-base lg:text-lg leading-loose mb-4 last:mb-0">{p}</p>
                ))}
                {section.bullets && (
                  <ul className={`space-y-3.5 ${section.paragraphs?.length ? 'mt-5' : ''}`}>
                    {section.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-ink text-base lg:text-lg leading-loose">
                        <span className="w-2 h-2 rounded-full bg-gold-400 mt-3 flex-shrink-0" aria-hidden="true" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-14 flex items-start gap-3 bg-cream border border-purple-100 rounded-2xl p-5">
            <OutlineIcon name="shield" className="w-5 h-5 mt-0.5 flex-shrink-0 text-purple-500" />
            <p className="text-mid text-sm leading-relaxed"><span className="font-bold text-dark">تنويه: </span>{medicalDisclaimer}</p>
          </div>

          <section className="mt-12 pt-10 border-t border-purple-100">
            <h2 className="text-lg font-extrabold text-dark mb-5">المصادر</h2>
            <ol className="space-y-3">
              {article.sources.map((s, i) => (
                <li key={s.url} className="flex items-start gap-3 text-sm leading-relaxed">
                  <span className="w-6 h-6 rounded-full bg-purple-50 text-purple-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {(i + 1).toLocaleString('ar-SA')}
                  </span>
                  <span>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-bold text-purple-600 hover:underline underline-offset-4">
                      {s.title}
                    </a>
                    <span className="text-mid"> — {s.publisher}{s.year ? `، ${s.year}` : ''}</span>
                  </span>
                </li>
              ))}
            </ol>
          </section>
        </article>

        {/* Side rail: at a glance + related pages */}
        <aside className="lg:sticky lg:top-28 space-y-5">
          <div className="bg-cream border border-purple-100 rounded-2xl p-6">
            <h2 className="font-extrabold text-dark mb-4">في هذا {article.type === 'دليل' ? 'الدليل' : 'المقال'}</h2>
            <ol className="space-y-2.5">
              {article.sections.map((s) => (
                <li key={s.heading} className="text-sm text-mid leading-relaxed flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-300 mt-2 flex-shrink-0" aria-hidden="true" />
                  {s.heading}
                </li>
              ))}
            </ol>
          </div>
          {article.related && article.related.length > 0 && (
            <div className="bg-dark rounded-2xl p-6">
              <h2 className="font-extrabold text-white mb-4">من ناجية</h2>
              <ul className="space-y-3">
                {article.related.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className="inline-flex items-start gap-2 text-gold-200 text-sm font-bold leading-relaxed hover:text-white transition-colors">
                      <svg className="w-4 h-4 mt-1 rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}

function OtherArticles({ current }: { current: Article }) {
  const { ref, visible } = useScrollReveal(0.08);
  const others = articles.filter((a) => a.slug !== current.slug);
  return (
    <section className="py-20 lg:py-24 bg-cream border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-dark">
              مقالات <span className="text-purple-500">أخرى</span>
            </h2>
          </div>
          <Link href="/discover#knowledge" className="inline-flex items-center gap-2 text-purple-500 font-bold text-sm hover:gap-3 transition-all">
            كل المكتبة
            <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
        <div ref={ref} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-hidden ${visible ? 'reveal-visible' : ''}`}>
          {others.map((a, i) => (
            <div key={a.slug} style={{ transitionDelay: `${i * 60}ms` }}>
              <LibraryCard article={a} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ArticlePage({ article }: { article: Article }) {
  return (
    <>
      <PageHeader
        meta={`${article.type} · ${article.topic} · ${readLabel(article)}`}
        title={article.title}
        subtitle={article.desc}
        crumbs={[
          { label: 'الرئيسية', to: '/' },
          { label: 'المكتبة', to: '/discover#knowledge' },
          { label: article.title, to: `/articles/${article.slug}` },
        ]}
      />
      <Body article={article} />
      <OtherArticles current={article} />
      <JoinSection />
    </>
  );
}
