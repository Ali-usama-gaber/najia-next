import { NextResponse, type NextRequest } from 'next/server';

// The Vite app's router matched routes case-insensitively, so it rendered
// /About, /DISCOVER, ... as the normal pages. App Router routes are
// case-sensitive, so send mixed-case variants of the page routes to their
// lowercase path instead of the 404 page. (The legacy redirects in
// next.config.ts already match case-insensitively.)
const PAGE_ROUTES = new Set(['/about', '/community', '/discover', '/join', '/get-involved']);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lower = pathname.toLowerCase();
  if (lower === pathname || !PAGE_ROUTES.has(lower)) return;

  const url = request.nextUrl.clone();
  url.pathname = lower;
  return NextResponse.redirect(url);
}

export const config = {
  // Only paths containing an uppercase letter, outside Next's own assets.
  matcher: ['/((?!_next/).*[A-Z].*)'],
};
