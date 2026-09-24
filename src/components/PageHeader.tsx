'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Crumb { label: string; to: string }

interface PageHeaderProps {
  title: string;
  /** Small factual line under the subtitle (e.g. an article's type and reading time). */
  meta?: string;
  highlight?: string;
  subtitle?: string;
  crumbs?: Crumb[];
  dark?: boolean;
}

export default function PageHeader({ title, meta, highlight, subtitle, crumbs, dark }: PageHeaderProps) {
  // Staggered entrance on mount — the internal pages' one authored moment.
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const step = (i: number): React.CSSProperties => ({
    opacity: entered ? 1 : 0,
    transform: entered ? 'translateY(0)' : 'translateY(18px)',
    transition: `opacity 0.6s ease ${i * 110}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 110}ms`,
  });

  return (
    <div
      className={`relative pt-36 pb-20 overflow-hidden ${dark ? 'bg-dark' : 'bg-cream'}`}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-0 w-[500px] h-[350px] rounded-full opacity-[0.07] transition-transform duration-1000"
          style={{ background: 'radial-gradient(circle, var(--color-purple-500) 0%, transparent 70%)', transform: entered ? 'translateY(0)' : 'translateY(-40px)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full opacity-[0.05] transition-transform duration-1000"
          style={{ background: 'radial-gradient(circle, var(--color-gold-400) 0%, transparent 70%)', transform: entered ? 'translateY(0)' : 'translateY(40px)' }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Breadcrumbs */}
        {crumbs && crumbs.length > 0 && (
          <nav className="flex items-center justify-center gap-2 text-xs mb-6" aria-label="مسار التنقل" style={step(0)}>
            {crumbs.map((c, i) => (
              <span key={c.to} className="flex items-center gap-2">
                {i > 0 && <span className="text-purple-500" aria-hidden="true">/</span>}
                <Link href={c.to} className={`inline-block py-1.5 font-medium transition-colors ${i === crumbs.length - 1 ? 'text-purple-500' : dark ? 'text-subtle hover:text-muted' : 'text-subtle hover:text-purple-500'}`}>
                  {c.label}
                </Link>
              </span>
            ))}
          </nav>
        )}

        <h1 className={`text-4xl lg:text-6xl font-extrabold leading-tight mb-5 ${dark ? 'text-white' : 'text-dark'}`} style={step(2)}>
          {highlight ? (
            <>
              {title}{' '}
              <span className="text-purple-500">{highlight}</span>
            </>
          ) : (
            title
          )}
        </h1>

        {subtitle && (
          <p className={`text-lg leading-loose max-w-xl mx-auto ${dark ? 'text-muted' : 'text-mid'}`} style={step(3)}>
            {subtitle}
          </p>
        )}

        {meta && (
          <p className={`mt-5 text-sm font-bold ${dark ? 'text-gold-200' : 'text-gold-600'}`} style={step(4)}>
            {meta}
          </p>
        )}
      </div>
    </div>
  );
}
