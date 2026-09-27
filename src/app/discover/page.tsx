import type { Metadata } from 'next';
import LegacyRedirect from '@/components/LegacyRedirect';

export const metadata: Metadata = {
  title: 'الفعاليات',
  robots: { index: false },
};

// «عالم ناجية» was split into الفعاليات and المعرفة. A static export can't
// send HTTP redirects, so old links are forwarded in the browser.
export default function Page() {
  return <LegacyRedirect to="/events" hashes={{ '#knowledge': '/knowledge/articles', '#events': '/events' }} />;
}
