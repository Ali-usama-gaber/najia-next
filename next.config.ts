import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
