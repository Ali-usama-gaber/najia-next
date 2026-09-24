import type { Metadata } from 'next';
import About from '@/views/About';

export const metadata: Metadata = {
  title: 'عن ناجية',
};

export default function Page() {
  return <About />;
}
