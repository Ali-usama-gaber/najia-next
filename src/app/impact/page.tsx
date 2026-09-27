import type { Metadata } from 'next';
import ImpactPage from '@/views/ImpactPage';

export const metadata: Metadata = {
  title: 'أثر ناجية',
  description: 'تكريم مجتمع ناجية، وحضوره في الإعلام، والأبحاث المنشورة عنه، وأثره بالأرقام.',
};

export default function Page() {
  return <ImpactPage />;
}
