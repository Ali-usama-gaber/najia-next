// Prefixes files served from /public with the site's base path. Locally the
// base path is empty; the GitHub Pages build serves the site under
// /najia-next, and plain <img>/<video> tags (unlike next/link) don't get the
// prefix on their own.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const asset = (path: string) => (path.startsWith('/') ? `${BASE}${path}` : path);
