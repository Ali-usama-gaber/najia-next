# najia-next

Arabic, right-to-left marketing site for "Najia Community" (مجتمع ناجية). It was migrated from a Figma Make Vite + react-router app to the Next.js App Router.

## Stack

- Next.js 16 (App Router, Turbopack), React 19.2, TypeScript
- Tailwind CSS v4 via `@tailwindcss/postcss` (`postcss.config.mjs`). There is no `tailwind.config` file: theme tokens live in the `@theme` block of `src/app/globals.css`.
- Package manager: pnpm 10.34.3. It is not installed globally, so run it through npx.

## Commands

```sh
npx -y pnpm@10.34.3 install
npx -y pnpm@10.34.3 dev      # next dev
npx -y pnpm@10.34.3 build    # next build
npx -y pnpm@10.34.3 start    # next start (after build)
```

## Directory map

- `src/app/layout.tsx`: root layout (server). Sets `<html lang="ar" dir="rtl">`, loads the Cairo font, holds site metadata, and wraps pages in `SiteShell`.
- `src/app/globals.css`: global CSS. Contains the Tailwind import, `@theme` tokens (gold/purple/blush/cream colours), keyframes, reveal utilities, and `.page-enter`.
- `src/app/**/page.tsx`: thin route files that render a view. Routes are `/`, `/about`, `/community`, `/discover`, `/join`, and `/get-involved`. `src/app/not-found.tsx` handles 404s.
- `src/views/`: page-level components (Home, About, Community, Discovery, JoinPage, GetInvolvedPage, NotFound, ...).
- `src/components/`: sections and shared UI. `SiteShell.tsx` is the client shell (Nav + keyed `<main className="page-enter">` + Footer, plus scroll-to-top and scroll-to-hash on navigation).
- `src/hooks/`: `useScrollReveal`, `useCounter`.
- `public/logo.svg`: site logo, referenced as `'/logo.svg'`.
- `public/robots.txt`: disallows all crawlers, same as the original site (which is also `noindex, nofollow`).
- `src/proxy.ts`: redirects mixed-case page paths (e.g. `/About`) to their lowercase route. The old router matched paths case-insensitively.
- `next.config.ts`: temporary redirects for legacy paths (`/resources`, `/events`, `/media` go to `/discover#...`; `/stories` and `/creative` go to `/community#...`).
- `docs/briefs/`: the original design and content briefs, kept for reference only.

## Rules

- Page components go in `src/views/`, never in `src/pages/`. A `src/pages` directory would turn on the Pages Router next to the App Router.
- Add `'use client';` to any component that uses hooks, event handlers, or browser globals. Everything else stays a server component.
- Use `next/link` (`<Link href=...>`) and `next/navigation` (`usePathname`). Do not import `react-router`.
- Images stay plain `<img>` tags. Static assets go in `public/`.

## RTL and fonts

- The whole site is RTL. `dir="rtl"` is set on `<html>`, and `globals.css` also sets `direction: rtl`. Write layouts with that in mind: `right-*` is the visual start of the line.
- Cairo is self-hosted through `next/font/google` (arabic + latin subsets, weights 300-900) and exposed as `--font-cairo`. The `font-sans` utility and `body` both use `var(--font-cairo), 'Cairo', sans-serif`. Do not add a Google Fonts `@import`.
- `<html data-scroll-behavior="smooth">` lets Next 16 route transitions work alongside the CSS `scroll-behavior: smooth`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
