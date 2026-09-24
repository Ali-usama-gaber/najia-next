import Link from 'next/link';
import OutlineIcon, { type IconName } from './OutlineIcon';
import { readLabel, type Article, type LibraryType } from '../data/knowledge';

const typeIcon: Record<LibraryType, IconName> = {
  'دليل': 'book',
  'مقال': 'message',
};

export default function LibraryCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group h-full bg-cream border border-line-soft rounded-2xl p-6 flex flex-col hover:border-purple-200 hover:bg-purple-50 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-center justify-between gap-3 mb-5">
        <span className="inline-flex items-center gap-2 bg-white text-purple-600 px-3 py-1.5 rounded-full text-xs font-bold">
          <OutlineIcon name={typeIcon[article.type]} className="w-4 h-4" />
          {article.type}
        </span>
        <span className="inline-flex items-center gap-1.5 text-mid text-xs font-semibold">
          <OutlineIcon name="clock" className="w-4 h-4 text-purple-500" />
          {readLabel(article)}
        </span>
      </div>
      <h3 className="font-extrabold text-dark text-base mb-2 leading-snug group-hover:text-purple-600 transition-colors">{article.title}</h3>
      <p className="text-mid text-sm leading-relaxed mb-5">{article.desc}</p>
      <span className="mt-auto inline-flex items-center gap-2 text-purple-500 text-sm font-bold group-hover:gap-3 transition-all">
        اقرئي {article.type === 'دليل' ? 'الدليل' : 'المقال'}
        <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
      </span>
    </Link>
  );
}
