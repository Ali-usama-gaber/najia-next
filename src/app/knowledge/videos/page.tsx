import type { Metadata } from 'next';
import VideosPage from '@/views/VideosPage';

export const metadata: Metadata = {
  title: 'فيديوهات',
  description: 'أسئلة الناجيات وإجابات الأطباء والمختصين في لقاءات ناجية، مقطعًا لكل سؤال.',
};

export default function Page() {
  return <VideosPage />;
}
