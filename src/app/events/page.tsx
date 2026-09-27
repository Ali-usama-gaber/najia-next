import type { Metadata } from 'next';
import EventsPage from '@/views/EventsPage';

export const metadata: Metadata = {
  title: 'الفعاليات',
  description: 'أرشيف ملتقيات ناجية ولقاءاتها منذ ٢٠٢٠، بالبرامج والصور والفيديوهات.',
};

export default function Page() {
  return <EventsPage />;
}
