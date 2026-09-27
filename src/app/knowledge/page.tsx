import type { Metadata } from 'next';
import KnowledgeHub from '@/views/KnowledgeHub';

export const metadata: Metadata = {
  title: 'المعرفة',
  description: 'أدلة ومقالات وفيديوهات عربية عن الحياة بعد سرطان الثدي.',
};

export default function Page() {
  return <KnowledgeHub />;
}
