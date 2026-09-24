import type { NextConfig } from 'next';

// GitHub Pages build (PAGES=1, see .github/workflows/pages.yml): a static
// export served under https://ali-usama-gaber.github.io/najia-next/. Local
// `dev` / `build` stay a normal Next.js server with no base path.
const pages = process.env.PAGES === '1';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = pages
  ? {
      output: 'export',
      basePath,
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {
      // Legacy paths from the Vite/react-router site now live as sections on merged pages.
      async redirects() {
        return [
          { source: '/resources', destination: '/discover#knowledge', permanent: false },
          { source: '/events', destination: '/discover#events', permanent: false },
          { source: '/media', destination: '/discover', permanent: false },
          { source: '/stories', destination: '/community#stories', permanent: false },
          { source: '/creative', destination: '/community#stories', permanent: false },
        ];
      },
    };

export default nextConfig;
