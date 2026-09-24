import type { Metadata } from 'next';
import GetInvolvedPage from '@/views/GetInvolvedPage';

export const metadata: Metadata = {
  title: 'شاركينا',
};

export default function Page() {
  return <GetInvolvedPage />;
}
