import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-cream pt-20">
      <div className="text-center px-6">
        <div className="text-8xl font-black text-purple-200 mb-6" aria-hidden="true">٤٠٤</div>
        <h1 className="text-2xl font-extrabold text-dark mb-3">الصفحة غير موجودة</h1>
        <p className="text-mid mb-8 leading-loose">يبدو أن هذه الصفحة لا وجود لها — لكن ناجية موجودة دائمًا.</p>
        <Link href="/" className="inline-flex items-center bg-purple-500 text-white px-8 py-3.5 rounded-full font-bold hover:bg-purple-600 transition-colors">
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
