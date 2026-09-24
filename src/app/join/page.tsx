import type { Metadata } from 'next';
import JoinPage from '@/views/JoinPage';

export const metadata: Metadata = {
  title: 'انضمي إلينا',
};

export default function Page() {
  return <JoinPage />;
}
