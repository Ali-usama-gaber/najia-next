'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Nav from './Nav';
import Footer from './Footer';

// Scrolls to the element targeted by `hash` (e.g. "#events").
function scrollToHash(hash: string) {
  if (!hash || hash === '#') return;
  try {
    document.querySelector(hash)?.scrollIntoView({ block: 'start' });
  } catch {
    // Not a valid CSS selector (e.g. "#1"); nothing to scroll to.
  }
}

// Replaces the Root layout (src/layouts/Root.tsx) from the Vite app:
// Nav + keyed <main> (re-runs the page-enter animation per route) + Footer,
// with scroll-to-top / scroll-to-hash on route changes.
export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      const frame = window.requestAnimationFrame(() => {
        scrollToHash(hash);
      });
      return () => window.cancelAnimationFrame(frame);
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  // In-page hash changes (native #anchor links, back/forward between hashes).
  useEffect(() => {
    const onHashChange = () => {
      const { hash } = window.location;
      window.requestAnimationFrame(() => {
        scrollToHash(hash);
      });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Next treats a Link to the URL already in the address bar as a no-op, so
  // neither Next nor the pathname effect above scrolls. The Vite app did:
  // - the Stories/Creative links (legacy /stories and /creative, now
  //   /community#stories and /community#creative) went through a redirect,
  //   which re-ran Root's effect and scrolled back to the section;
  // - a hash that Next never saw (typed in the address bar or set by a native
  //   #anchor) followed by a Link without the hash scrolled to the top.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if ((anchor.target && anchor.target !== '_self') || anchor.hasAttribute('download')) return;

      const url = new URL(anchor.href);
      const { location } = window;
      if (
        url.origin !== location.origin ||
        url.pathname !== location.pathname ||
        url.search !== location.search
      ) {
        return;
      }

      if (url.hash && url.hash === location.hash) {
        window.requestAnimationFrame(() => {
          scrollToHash(url.hash);
        });
      } else if (!url.hash && location.hash) {
        window.requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        });
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  // Looping decorations (the hero mark's breathing and limbs, floating
  // blobs, pulsing dots) kept running after their section scrolled away,
  // repainting every frame for the life of the page. Pause each section's
  // animations while it is off screen; see [data-offscreen] in globals.css.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.toggleAttribute('data-offscreen', !e.isIntersecting);
      },
      { rootMargin: '200px 0px' },
    );
    const sections = document.querySelectorAll('main section, main > div');
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [pathname]);

  return (
    <div className="min-h-screen font-sans">
      <Nav />
      <main key={pathname} className="page-enter">
        {children}
      </main>
      <Footer />
    </div>
  );
}
