'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import OutlineIcon, { type IconName } from './OutlineIcon';
import { asset } from '../lib/asset';
const logo = '/logo.svg';

type NavLink = { label: string; to: string; match?: RegExp };

// المعرفة is not a page of its own: it opens a small menu with its two parts.
const knowledgeMenu: { label: string; to: string; desc: string; icon: IconName }[] = [
  { label: 'أدلة ومقالات', to: '/knowledge/articles', desc: 'قراءات مكتوبة عن الحياة بعد العلاج', icon: 'book' },
  { label: 'فيديوهات', to: '/knowledge/videos', desc: 'إجابات مختصين مصوّرة، موضوعًا بموضوع', icon: 'spark' },
];

const before: NavLink[] = [
  { label: 'الرئيسية', to: '/' },
  { label: 'عن ناجية', to: '/about' },
  { label: 'المجتمع', to: '/community' },
];
const after: NavLink[] = [
  { label: 'الفعاليات', to: '/events' },
  { label: 'أثر ناجية', to: '/impact' },
];

// GitHub Pages serves every route with a trailing slash; compare without it.
const clean = (p: string) => (p.length > 1 ? p.replace(/\/$/, '') : p);
const isActive = (to: string, pathname: string) => {
  const p = clean(pathname);
  return to === '/' ? p === '/' : p === to || p.startsWith(`${to}/`);
};
const knowledgeActive = (pathname: string) => /^\/(knowledge|articles)(\/|$)/.test(clean(pathname));

const linkClass = (active: boolean) =>
  `font-semibold text-sm transition-colors duration-200 relative after:absolute after:bottom-0 after:right-0 after:h-0.5 after:w-0 after:bg-gold-400 after:transition-all after:duration-300 hover:after:w-full ${
    active ? 'text-purple-500 after:!w-full after:bg-purple-500' : 'text-mid hover:text-purple-500'
  }`;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function KnowledgeDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const active = knowledgeActive(pathname);
  return (
    <li ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className={`${linkClass(active)} inline-flex items-center gap-1.5 py-2`}
      >
        المعرفة
        <Chevron open={open} />
      </button>
      {open && (
        <div className="absolute top-full right-1/2 translate-x-1/2 pt-3 z-50" style={{ animation: 'fadeIn 0.15s ease' }}>
          <ul className="w-72 bg-white border border-purple-100 rounded-2xl shadow-xl shadow-purple-200/40 p-2">
            {knowledgeMenu.map((item) => (
              <li key={item.to}>
                <Link
                  href={item.to}
                  className={`flex items-start gap-3 rounded-xl px-3 py-3 transition-colors ${isActive(item.to, pathname) ? 'bg-purple-50' : 'hover:bg-purple-50'}`}
                >
                  <span className="w-10 h-10 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center flex-shrink-0">
                    <OutlineIcon name={item.icon} className="w-5 h-5" />
                  </span>
                  <span>
                    <span className="block font-bold text-dark text-sm">{item.label}</span>
                    <span className="block text-xs text-mid mt-0.5 leading-relaxed">{item.desc}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileKnowledge, setMobileKnowledge] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => { setOpen(false); setMobileKnowledge(false); }, [pathname]);

  const isHome = clean(pathname) === '/';

  const mobileLink = (l: NavLink) => (
    <Link
      key={l.label}
      href={l.to}
      className={`block py-3 font-semibold border-b border-purple-50 transition-colors ${isActive(l.to, pathname) ? 'text-purple-500' : 'text-mid hover:text-purple-500'}`}
    >
      {l.label}
    </Link>
  );

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? 'bg-cream/94 backdrop-blur-xl shadow-sm shadow-purple-100/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-12 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="w-11 h-11 overflow-hidden group-hover:scale-105 transition-all duration-300">
            <img src={asset(logo)} alt="شعار ناجية" className="w-full h-full object-contain" />
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="text-purple-500 font-extrabold text-lg leading-none">ناجية</div>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden xl:flex items-center gap-6">
          {before.map((l) => (
            <li key={l.label}><Link href={l.to} className={linkClass(isActive(l.to, pathname))}>{l.label}</Link></li>
          ))}
          <KnowledgeDropdown pathname={pathname} />
          {after.map((l) => (
            <li key={l.label}><Link href={l.to} className={linkClass(isActive(l.to, pathname))}>{l.label}</Link></li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/join"
          className="hidden xl:inline-flex items-center bg-purple-500 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-purple-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-400/30 hover:-translate-y-0.5 flex-shrink-0"
        >
          انضمي إلى المجتمع
        </Link>

        {/* Mobile toggle */}
        <button
          className="xl:hidden w-11 h-11 flex items-center justify-center text-purple-500 rounded-lg hover:bg-purple-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="القائمة"
          aria-expanded={open}
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`xl:hidden overflow-hidden transition-all duration-400 ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
      >
        <div className="bg-cream/98 backdrop-blur-xl border-t border-purple-100/60 px-6 py-5 space-y-1">
          {before.map(mobileLink)}
          <div className="border-b border-purple-50">
            <button
              type="button"
              aria-expanded={mobileKnowledge}
              onClick={() => setMobileKnowledge((o) => !o)}
              className={`w-full flex items-center justify-between py-3 font-semibold transition-colors ${knowledgeActive(pathname) ? 'text-purple-500' : 'text-mid'}`}
            >
              المعرفة
              <Chevron open={mobileKnowledge} />
            </button>
            {mobileKnowledge && (
              <div className="pb-3 pr-4 space-y-1">
                {knowledgeMenu.map((item) => (
                  <Link
                    key={item.to}
                    href={item.to}
                    className={`flex items-center gap-3 py-2.5 text-sm font-semibold ${isActive(item.to, pathname) ? 'text-purple-500' : 'text-mid'}`}
                  >
                    <OutlineIcon name={item.icon} className="w-4 h-4 text-purple-500" />
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {after.map(mobileLink)}
          <Link
            href="/join"
            className="block mt-4 bg-purple-500 text-white text-center py-3.5 rounded-full font-bold hover:bg-purple-600 transition-colors"
          >
            انضمي إلى المجتمع
          </Link>
        </div>
      </div>
    </nav>
  );
}
