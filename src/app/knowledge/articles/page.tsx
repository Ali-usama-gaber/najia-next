import type { Metadata } from 'next';
import KnowledgePage from '@/views/KnowledgePage';

export const metadata: Metadata = {
  title: 'أدلة ومقالات',
  description: 'أدلة ومقالات مكتوبة عن الحياة بعد سرطان الثدي، مع مصادرها العلمية.',
};

export default function Page() {
  return <KnowledgePage />;
}
