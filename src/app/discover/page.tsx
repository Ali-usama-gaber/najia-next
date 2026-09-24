import type { Metadata } from 'next';
import Discovery from '@/views/Discovery';

export const metadata: Metadata = {
  title: 'عالم ناجية',
};

export default function Page() {
  return <Discovery />;
}
