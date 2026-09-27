import Link from 'next/link';
import OutlineIcon from './OutlineIcon';
import { sectionLabel, type ImpactItem } from '../data/impact';
import { asset } from '../lib/asset';

// One card per recognition / media piece / news item / publication. Every
// card opens its own page under /impact; nothing opens in a popup.

function Arrow() {
  return (
    <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

const cta: Record<ImpactItem['section'], string> = {
  recognition: 'تفاصيل التكريم',
  media: 'شاهدي التغطية',
  press: 'اقرئي الخبر',
  research: 'ملخص البحث',
};

export default function ImpactCard({ item, dark }: { item: ImpactItem; dark?: boolean }) {
  const image = item.image ?? item.video?.poster;
  return (
    <Link
      href={`/impact/${item.slug}`}
      className={`story-card group h-full flex flex-col rounded-[1.5rem] overflow-hidden border transition-all duration-400 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-500/30 ${
        dark ? 'bg-white/5 border-white/10 hover:border-gold-200/40' : 'bg-cream border-purple-100 hover:shadow-xl hover:shadow-purple-100/60'
      }`}
    >
      {image ? (
        <span className={`relative block ${item.video ? 'aspect-video' : 'aspect-[4/3]'} overflow-hidden bg-dark`}>
          <img src={asset(image)} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <span className="absolute top-4 right-4 bg-gold-400 text-dark text-xs font-bold px-3 py-1 rounded-full">{item.year}</span>
          {item.video && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-14 h-14 rounded-full bg-white/95 text-purple-600 flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
                <svg className="w-6 h-6 translate-x-[2px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg>
              </span>
            </span>
          )}
        </span>
      ) : (
        <span className={`flex items-center justify-between gap-3 px-6 pt-6 ${dark ? 'text-gold-200' : 'text-purple-600'}`}>
          <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${dark ? 'bg-white/10' : 'bg-purple-50'}`}>
            <OutlineIcon name={item.section === 'research' ? 'book' : 'message'} className="w-4 h-4" />
            {sectionLabel[item.section]}
          </span>
          <span className={`font-extrabold ${dark ? 'text-gold-200' : 'text-gold-600'}`}>{item.year}</span>
        </span>
      )}
      <span className="p-6 flex-1 flex flex-col">
        <span className={`text-xs font-bold mb-1.5 ${dark ? 'text-gold-200' : 'text-purple-500'}`}>{[item.by, item.date].filter(Boolean).join(' · ')}</span>
        <span className={`block font-extrabold text-lg leading-snug mb-2 transition-colors ${dark ? 'text-white' : 'text-dark group-hover:text-purple-500'}`}>{item.title}</span>
        <span className={`block text-sm leading-loose mb-5 ${dark ? 'text-dusk-200' : 'text-mid'}`}>{item.summary}</span>
        <span className={`mt-auto inline-flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all ${dark ? 'text-gold-200' : 'text-purple-500'}`}>
          {item.section === 'media' && !item.video ? 'التفاصيل' : cta[item.section]}
          <Arrow />
        </span>
      </span>
    </Link>
  );
}
