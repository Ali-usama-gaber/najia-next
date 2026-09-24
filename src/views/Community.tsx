'use client';

import Link from 'next/link';
import PageHeader from '../components/PageHeader';
import Survivor from '../components/Survivor';
import SafeSpace from '../components/SafeSpace';
import Voices from '../components/Voices';
import JoinSection from '../components/Join';
import OutlineIcon, { type IconName } from '../components/OutlineIcon';
import { useScrollReveal } from '../hooks/useScrollReveal';

const audience: { title: string; desc: string; icon: IconName; href?: string }[] = [
  { title: 'ناجيات من سرطان الثدي', desc: 'أنهيتِ العلاج وتبحثين عن رفقة تفهم ما بعده.', icon: 'heart' },
  { title: 'مريضات في مرحلة العلاج', desc: 'تحتاجين إلى من سبقنكِ في الطريق وإلى إجابات موثوقة.', icon: 'flower' },
  { title: 'متخصصون وأطباء', desc: 'تودّون المشاركة في اللقاءات العلمية وتقديم المعرفة للمجتمع.', icon: 'book', href: '/get-involved#expertise' },
  { title: 'داعمات ومتطوعات', desc: 'تملكين وقتًا أو مهارة تضيف للمجتمع وبرامجه.', icon: 'users', href: '/get-involved#volunteer' },
];

const ways: { title: string; desc: string; icon: IconName }[] = [
  { title: 'مجموعة رقمية مغلقة', desc: 'نقاش يومي بين العضوات، وأسئلة تجد إجاباتها من تجربة حقيقية أو من متخصص.', icon: 'lock' },
  { title: 'لقاءات مباشرة مع أطباء', desc: 'جلسات دورية تغطي موضوعات ما بعد العلاج وتفتح باب الأسئلة المباشرة.', icon: 'message' },
  { title: 'ملتقيات حضورية وافتراضية', desc: 'محطة سنوية تجمع الناجيات وعائلاتهن والمتخصصين.', icon: 'calendar' },
  { title: 'مسارات التمكين', desc: 'مساحات مثل «ناجية مبدعة» و«ناجية منتجة» لعرض أعمال الناجيات ومشاريعهن.', icon: 'spark' },
];

function AudienceSection() {
  const { ref, visible } = useScrollReveal(0.1);
  return <section className="py-24 bg-white"><div ref={ref} className={`max-w-7xl mx-auto px-6 lg:px-12 reveal-hidden ${visible ? 'reveal-visible' : ''}`}>
    <div className="max-w-2xl mb-12"><h2 className="text-3xl lg:text-4xl font-extrabold text-dark leading-snug">مساحة تتسع <span className="text-purple-500">للرحلة ومن يرافقها</span></h2></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">{audience.map((item, i) => <article key={item.title} className="pillar-card bg-cream border border-purple-100 rounded-2xl p-6 flex flex-col" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: `opacity 0.5s ease ${i * 90}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms` }}>
      <div className="w-11 h-11 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center mb-5"><OutlineIcon name={item.icon} className="w-5 h-5" /></div>
      <h3 className="font-extrabold text-dark leading-relaxed mb-2">{item.title}</h3>
      <p className="text-mid text-sm leading-loose">{item.desc}</p>
      {item.href && <Link href={item.href} className="mt-auto pt-4 text-purple-500 text-sm font-bold hover:underline underline-offset-4">شاركينا</Link>}
    </article>)}</div>
  </div></section>;
}

function HowItWorks() {
  const { ref, visible } = useScrollReveal(0.1);
  return <section className="py-24 bg-cream"><div ref={ref} className={`max-w-7xl mx-auto px-6 lg:px-12 reveal-hidden ${visible ? 'reveal-visible' : ''}`}>
    <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-12 items-start">
      <div className="lg:sticky lg:top-28"><h2 className="text-3xl lg:text-4xl font-extrabold text-dark leading-snug">مجتمع مغلق، آمن، <span className="text-gold-500">ومستمر على مدار العام</span></h2></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{ways.map((way, index) => <article key={way.title} className="bg-white rounded-2xl p-6 border border-purple-100" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: `opacity 0.5s ease ${index * 90}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${index * 90}ms` }}>
        <div className="flex items-center gap-3 mb-4"><span className="text-gold-600 font-black text-xl">{`٠${'١٢٣٤'[index]}`}</span><div className="w-9 h-9 rounded-full bg-gold-50 text-gold-500 flex items-center justify-center"><OutlineIcon name={way.icon} className="w-4 h-4" /></div></div>
        <h3 className="font-extrabold text-dark mb-2">{way.title}</h3>
        <p className="text-mid text-sm leading-loose">{way.desc}</p>
      </article>)}</div>
    </div>
  </div></section>;
}

export default function Community() {
  return <>
    <PageHeader title="أنتِ" highlight="لستِ وحدك." subtitle="ناجية ليست صفحة تتابعينها، بل مجموعة تنتمين إليها. الحديث فيها بين ناجيات ومريضات في مراحل مختلفة، بإشراف طبي وبيئة تحرص على السرية." crumbs={[{ label: 'الرئيسية', to: '/' }, { label: 'المجتمع', to: '/community' }]} />
    <AudienceSection />
    <HowItWorks />
    <SafeSpace />
    <Survivor />
    <Voices />
    <JoinSection />
  </>;
}
