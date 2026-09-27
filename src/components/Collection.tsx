'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Listbox } from './FormField';

// Shared browsing controls for the growing archives (events, articles,
// videos): a search box, filter chips, and numbered pages.

const ar = (n: number) => n.toLocaleString('ar-SA');

// Arabic-insensitive matching: ignore diacritics, tatweel and the common
// letter variants so «الاكتئاب» finds «الإكتئاب» and «ناجيه» finds «ناجية».
export const normalize = (s: string) =>
  s
    .replace(/[ً-ٰٟـ]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .toLowerCase()
    .trim();

export const matches = (query: string, ...fields: (string | undefined)[]) => {
  const q = normalize(query);
  if (!q) return true;
  const hay = normalize(fields.filter(Boolean).join(' '));
  return q.split(/\s+/).every((word) => hay.includes(word));
};

export function usePaged<T>(items: T[], pageSize: number, resetKey: string) {
  const [page, setPage] = useState(1);
  const pages = Math.max(1, Math.ceil(items.length / pageSize));
  useEffect(() => { setPage(1); }, [resetKey]);
  const current = Math.min(page, pages);
  const slice = useMemo(() => items.slice((current - 1) * pageSize, current * pageSize), [items, current, pageSize]);
  return { page: current, pages, slice, setPage };
}

export function SearchBox({ value, onChange, placeholder, label }: { value: string; onChange: (v: string) => void; placeholder: string; label: string }) {
  return (
    <div className="relative w-full">
      <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        className="w-full h-[3.25rem] bg-white border-2 border-purple-200 rounded-xl pr-12 pl-5 text-sm text-dark placeholder:text-quiet focus:outline-none focus:border-purple-500 transition-colors"
      />
    </div>
  );
}

// A labelled dropdown filter (the site's own Listbox, same look as the forms).
export function FilterSelect<T extends string>({ options, value, onChange, label, format }: { options: readonly T[]; value: T; onChange: (v: T) => void; label: string; format?: (v: T) => string }) {
  return (
    <div className="w-full">
      <span className="block text-xs font-bold text-mid mb-1.5">{label}</span>
      <Listbox
        name={label}
        ariaLabel={label}
        value={value}
        onChange={(v) => onChange(v as T)}
        options={options.map((o) => ({ value: o, label: format ? format(o) : o }))}
      />
    </div>
  );
}

// Search on one side, dropdown filters beside it.
export function FilterBar({ search, filters }: { search: ReactNode; filters: ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)] gap-4 md:items-end">
      <div>
        <span className="block text-xs font-bold text-mid mb-1.5">بحث</span>
        {search}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{filters}</div>
    </div>
  );
}

function PageArrow({ dir }: { dir: 'prev' | 'next' }) {
  // RTL: «السابق» points right, «التالي» points left.
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === 'prev' ? 'm9 6 6 6-6 6' : 'm15 6-6 6 6 6'} />
    </svg>
  );
}

export function Pagination({ page, pages, onChange }: { page: number; pages: number; onChange: (p: number) => void }) {
  const btn = 'min-w-11 h-11 px-3 rounded-full text-sm font-bold inline-flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40 disabled:pointer-events-none';
  return (
    <nav className="mt-10 flex items-center justify-center gap-2 flex-wrap" aria-label="صفحات النتائج">
      <button type="button" className={`${btn} text-mid hover:bg-purple-50`} disabled={page === 1} onClick={() => onChange(page - 1)}>
        <PageArrow dir="prev" />
        السابق
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-current={p === page ? 'page' : undefined}
          aria-label={`الصفحة ${ar(p)}`}
          className={`${btn} ${p === page ? 'bg-purple-500 text-white' : 'bg-white border border-purple-100 text-mid hover:border-purple-300'}`}
        >
          {ar(p)}
        </button>
      ))}
      <button type="button" className={`${btn} text-mid hover:bg-purple-50`} disabled={page === pages} onClick={() => onChange(page + 1)}>
        التالي
        <PageArrow dir="next" />
      </button>
    </nav>
  );
}

// The frame around a browsable list: controls on top, a live result count,
// the grid, an empty state, and pages. Changing page scrolls back to the top
// of the frame so the reader lands on the first card of the new page.
export function CollectionFrame({
  controls,
  count,
  noun,
  page,
  pages,
  onPage,
  onReset,
  children,
}: {
  controls: ReactNode;
  count: number;
  noun: (n: number) => string;
  page: number;
  pages: number;
  onPage: (p: number) => void;
  onReset: () => void;
  children: ReactNode;
}) {
  const top = useRef<HTMLDivElement>(null);
  const go = (p: number) => {
    onPage(p);
    const el = top.current;
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: 'smooth' });
  };
  return (
    <div ref={top}>
      <div className="relative z-10 bg-purple-50/70 border border-purple-100 rounded-[1.5rem] p-4 lg:p-5 mb-8">{controls}</div>
      <p className="text-mid text-sm mb-6" aria-live="polite">{noun(count)}</p>
      {count === 0 ? (
        <div className="text-center py-16 bg-cream rounded-[1.5rem] border border-line-soft">
          <p className="font-bold text-dark mb-2">لا توجد نتائج مطابقة</p>
          <p className="text-mid text-sm mb-5">جرّبي كلمة أخرى أو امسحي التصفية.</p>
          <button type="button" onClick={onReset} className="min-h-11 px-6 rounded-full bg-purple-500 text-white text-sm font-bold hover:bg-purple-600 transition-colors">
            عرض الكل
          </button>
        </div>
      ) : (
        children
      )}
      <Pagination page={page} pages={pages} onChange={go} />
    </div>
  );
}

export const countLabel = (n: number, one: string, two: string, few: string, many: string) =>
  n === 0 ? 'لا نتائج' : n === 1 ? one : n === 2 ? two : n <= 10 ? `${ar(n)} ${few}` : `${ar(n)} ${many}`;
