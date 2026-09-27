'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LegacyRedirect({ to, hashes = {} }: { to: string; hashes?: Record<string, string> }) {
  const router = useRouter();
  useEffect(() => { router.replace(hashes[window.location.hash] ?? to); }, [router, to, hashes]);
  return (
    <div className="min-h-[60vh] flex items-center justify-center pt-24">
      <Link href={to} className="text-purple-500 font-bold underline underline-offset-4">انتقلت هذه الصفحة — اضغطي هنا</Link>
    </div>
  );
}
