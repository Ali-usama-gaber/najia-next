'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { asset } from '../lib/asset';
const logo = '/logo.svg';

const navLinks = [
  { label: 'الرئيسية', to: '/' },
  { label: 'عن ناجية', to: '/about' },
  { label: 'المجتمع', to: '/community' },
  { label: 'عالم ناجية', to: '/discover' },
];

// Event and article pages live under عالم ناجية.
const isActive = (to: string, pathname: string) =>
  to === '/'
    ? pathname === '/'
    : pathname.startsWith(to) || (to === '/discover' && /^\/(events|articles)\//.test(pathname));

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  const isHome = pathname === '/';

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
          {navLinks.map(({ label, to }) => {
            const active = isActive(to, pathname);
            return (
              <li key={label}>
                <Link
                  href={to}
                  className={`font-semibold text-sm transition-colors duration-200 relative after:absolute after:bottom-0 after:right-0 after:h-0.5 after:w-0 after:bg-gold-400 after:transition-all after:duration-300 hover:after:w-full ${
                    active
                      ? 'text-purple-500 after:!w-full after:bg-purple-500'
                      : 'text-mid hover:text-purple-500'
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
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
        className={`xl:hidden overflow-hidden transition-all duration-400 ${
          open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
      >
        <div className="bg-cream/98 backdrop-blur-xl border-t border-purple-100/60 px-6 py-5 space-y-1">
          {navLinks.map(({ label, to }) => {
            const active = isActive(to, pathname);
            return (
              <Link
                key={label}
                href={to}
                className={`block py-3 font-semibold border-b border-purple-50 transition-colors ${
                  active ? 'text-purple-500' : 'text-mid hover:text-purple-500'
                }`}
              >
                {label}
              </Link>
            );
          })}
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
