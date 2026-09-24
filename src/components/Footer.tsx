import Link from 'next/link';
import { asset } from '../lib/asset';
const logo = '/logo.svg';

const columns = [
  {
    section: 'الأقسام',
    links: [
      { label: 'الرئيسية', to: '/' },
      { label: 'عن ناجية', to: '/about' },
      { label: 'المجتمع', to: '/community' },
      { label: 'الملتقيات', to: '/discover#events' },
      { label: 'المعرفة', to: '/discover#knowledge' },
      { label: 'شاركينا', to: '/get-involved' },
    ],
  },
  {
    section: 'روابط',
    links: [
      { label: 'الانضمام للمجتمع', to: '/join' },
      { label: 'التطوّع والشراكة', to: '/get-involved#volunteer' },
      { label: 'التواصل الإعلامي', to: '/get-involved#media' },
      { label: 'المكتبة', to: '/discover#knowledge' },
    ],
  },
];

// Approved platforms: Instagram, X, YouTube. YouTube is Najia's own channel
// (the uploader of the 2020 session recordings). Instagram and X show their
// icon without a link until the client sends the official account URLs.
const socials: { name: string; href: string; icon: React.ReactNode }[] = [
  {
    name: 'إنستغرام',
    href: '',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.3 6.7h.01" />
      </svg>
    ),
  },
  {
    name: 'إكس',
    href: '',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4l16 16M20 4 4 20" />
      </svg>
    ),
  },
  {
    name: 'قناة ناجية على يوتيوب',
    href: 'https://www.youtube.com/@najia4315',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="m10 9.5 4.5 2.5-4.5 2.5z" />
      </svg>
    ),
  },
];

export default function Footer() {

  return (
    <footer className="bg-dark pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 overflow-hidden">
                <img src={asset(logo)} alt="شعار ناجية" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="text-gold-400 font-extrabold text-xl leading-none">ناجية</div>
                <div className="text-dusk-200 text-xs mt-1.5">مجتمع الحياة بعد السرطان</div>
              </div>
            </Link>
            <p className="text-dusk-200 text-sm leading-loose mb-6">
              مجتمع عربي للحياة بعد السرطان — تأسّس ٢٠١٦.
            </p>
            <div className="flex gap-3">
              {socials.map((s) =>
                s.href ? (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-11 h-11 rounded-full bg-white/10 text-dusk-200 hover:bg-purple-500 hover:text-white flex items-center justify-center transition-all duration-200"
                  >
                    {s.icon}
                  </a>
                ) : (
                  <span
                    key={s.name}
                    role="img"
                    aria-label={s.name}
                    className="w-11 h-11 rounded-full bg-white/10 text-dusk-200 flex items-center justify-center"
                  >
                    {s.icon}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.section}>
              <h4 className="text-white font-bold text-sm mb-5">{col.section}</h4>
              <ul className="space-y-3">
                {col.links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      href={to}
                      className="text-dusk-200 hover:text-gold-200 text-sm font-medium transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Message */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5">رسالتنا</h4>
            <p className="text-gold-200 font-bold leading-loose">
              <span className="block text-white text-lg">أنا ناجية:</span>
              واعية، مطمئنة، قادرة، منتجة، ملهمة.
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-dusk-300">
          <div>© ٢٠٢٦ مجتمع ناجية. جميع الحقوق محفوظة.</div>
          <div className="text-center">محتوى الموقع تثقيفي ولا يُغني عن الاستشارة الطبية.</div>
        </div>
      </div>
    </footer>
  );
}
