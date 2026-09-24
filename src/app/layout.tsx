import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import SiteShell from '@/components/SiteShell';
import './globals.css';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'مجتمع ناجية',
    template: '%s | مجتمع ناجية',
  },
  description:
    'مجتمع عربي آمن للناجيات من سرطان الثدي منذ ٢٠١٦: دعم متبادل، ومعرفة موثوقة، وتمكين يعيد للناجية دورها في أسرتها ومجتمعها وعملها — لأن الرعاية لا تنتهي بانتهاء العلاج.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'مجتمع ناجية',
    description:
      'مجتمع عربي آمن للناجيات من سرطان الثدي منذ ٢٠١٦: دعم متبادل، ومعرفة موثوقة، وتمكين يعيد للناجية دورها في أسرتها ومجتمعها وعملها — لأن الرعاية لا تنتهي بانتهاء العلاج.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" data-scroll-behavior="smooth" className={cairo.variable}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
