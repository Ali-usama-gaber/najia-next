import type { Metadata } from 'next';
import NotFound from '@/views/NotFound';

export const metadata: Metadata = {
  title: 'الصفحة غير موجودة',
};

export default function NotFoundPage() {
  return <NotFound />;
}
