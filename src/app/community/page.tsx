import type { Metadata } from 'next';
import Community from '@/views/Community';

export const metadata: Metadata = {
  title: 'المجتمع',
};

export default function Page() {
  return <Community />;
}
