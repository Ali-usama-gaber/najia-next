'use client';

import PageHeader from '../components/PageHeader';
import Timeline from '../components/Timeline';
import Founder from '../components/Founder';
import AboutIntro from '../components/About';
import JoinSection from '../components/Join';
import OutlineIcon, { type IconName } from '../components/OutlineIcon';
import { useScrollReveal } from '../hooks/useScrollReveal';

const values = [
  { title: 'الخصوصية أولًا', desc: 'بيئة مغلقة تحفظ سرية العضوات، فالثقة شرط لأي حديث صادق.', icon: 'lock' as IconName },
  { title: 'معلومة موثوقة', desc: 'مصدر المعلومة طبيب أو متخصص، ولا مكان للشائعات الطبية.', icon: 'book' as IconName },
  { title: 'التجربة مصدر معرفة', desc: 'صوت الناجية جزء من تصميم البرامج، لا مجرد متلقٍّ لها.', icon: 'message' as IconName },
  { title: 'الاستمرارية', desc: 'برامج على مدار العام، لا موسم واحد في أكتوبر.', icon: 'calendar' as IconName },
];

const survivorshipTopics = [
  'الخوف من عودة المرض', 'الآثار طويلة المدى للعلاج', 'الصحة النفسية وجودة الحياة', 'التغيّرات الجسدية وصورة الجسد',
  'الخصوبة والحمل والصحة الجنسية', 'التغذية والوزن والنشاط البدني', 'صحة القلب والعظام',
  'العلاقات الأسرية والاجتماعية', 'العودة إلى العمل والحياة الطبيعية', 'استعادة الثقة والاستقلالية',
];

const research = [
  'تم توثيق تجربة ناجية وعرضها في محافل متخصصة في طب الأورام.',
  'ارتبط المجتمع بمشاريع بحثية تستكشف احتياجات الناجيات وتجاربهن وجودة حياتهن.',
  'ساهم ذلك في تحويل التجربة المجتمعية إلى معرفة تُستخدم لتطوير خدمات الرعاية بعد السرطان.',
];

const future = [
  'منصة رقمية متخصصة للناجيات', 'برامج تعليمية منظمة ومسارات متدرجة', 'محتوى عربي موثوق حول الحياة بعد السرطان',
  'بودكاست وبرامج رقمية', 'برامج للصحة ونمط الحياة', 'دعم نفسي واجتماعي أكثر تنظيمًا',
  'تمكين مهني واقتصادي للناجيات', 'توسيع البحث العلمي في الرعاية الممتدة للناجيات',
];

function MissionAndVision() {
  const { ref, visible } = useScrollReveal(0.12);
  return <section className="py-24 bg-cream">
    <div ref={ref} className={`max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-6 reveal-hidden ${visible ? 'reveal-visible' : ''}`}>
      <article className="bg-white border border-purple-100 rounded-3xl p-8 lg:p-10">
        <span className="text-gold-600 font-extrabold text-sm">الرسالة</span>
        <p className="text-xl lg:text-2xl font-extrabold text-dark leading-relaxed mt-4">أن ترافق ناجية كل ناجية عربية في مرحلة ما بعد السرطان بدعم آمن، ومعرفة موثوقة، وتمكين يعيد لها دورها في أسرتها ومجتمعها وعملها.</p>
      </article>
      <article className="bg-dark rounded-3xl p-8 lg:p-10">
        <span className="text-gold-400 font-extrabold text-sm">الرؤية</span>
        <p className="text-xl lg:text-2xl font-extrabold text-white leading-relaxed mt-4">منصة رقمية عربية متخصصة في الرعاية الممتدة للناجيات بعد السرطان، تجمع البرامج التعليمية والدعم النفسي والاجتماعي والمحتوى الموثوق والبحث العلمي في منظومة واحدة.</p>
      </article>
    </div>
  </section>;
}

function SurvivorshipCare() {
  const { ref, visible } = useScrollReveal(0.1);
  return <section className="py-24 bg-white">
    <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
      <div className={`lg:sticky lg:top-28 reveal-right ${visible ? 'reveal-visible' : ''}`}>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-dark leading-snug mb-5">ما بعد العلاج مرحلة لها <span className="text-purple-500">رعايتها الخاصة</span></h2>
        <p className="text-mid leading-loose">حين ينتهي العلاج تبدأ أسئلة لا تجد لها المريضة وقتًا كافيًا في العيادة. تبنّت ناجية مفهوم الرعاية الممتدة للناجيات بعد السرطان، لتغطي ما تركته الرحلة خلفها.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {survivorshipTopics.map((topic, i) => <div
          key={topic}
          className="flex items-center gap-3 bg-cream border border-line-soft rounded-xl px-5 py-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(14px)',
            transition: `opacity 0.5s ease ${i * 55}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 55}ms`,
          }}
        >
          <span className="w-2 h-2 rounded-full bg-gold-400 flex-shrink-0" />
          <span className="text-mid text-sm font-semibold">{topic}</span>
        </div>)}
      </div>
    </div>
  </section>;
}

function ValuesSection() {
  const { ref, visible } = useScrollReveal(0.12);
  return <section className="py-24 bg-cream">
    <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className={`mb-10 reveal-hidden ${visible ? 'reveal-visible' : ''}`}><h2 className="text-3xl lg:text-4xl font-extrabold text-dark">قيم <span className="text-purple-500">نعمل بها</span></h2></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {values.map((value, i) => <article
          key={value.title}
          className={`pillar-card bg-white border border-purple-100 rounded-2xl p-6 reveal-hidden ${visible ? 'reveal-visible' : ''}`}
          style={{ transitionDelay: `${100 + i * 90}ms` }}
        ><div className="w-11 h-11 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center mb-5"><OutlineIcon name={value.icon} className="w-5 h-5" /></div><h3 className="font-extrabold text-dark mb-2">{value.title}</h3><p className="text-mid text-sm leading-loose">{value.desc}</p></article>)}
      </div>
    </div>
  </section>;
}

function ResearchAndFuture() {
  const { ref, visible } = useScrollReveal(0.12);
  return <section className="py-24 bg-white">
    <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <article className={`rounded-3xl bg-purple-50 border border-purple-100 p-8 lg:p-10 reveal-right ${visible ? 'reveal-visible' : ''}`}>
        <span className="text-purple-600 font-bold text-sm">ناجية والمجتمع العلمي</span>
        <h2 className="text-3xl font-extrabold text-dark mt-4 mb-6">من المجتمع إلى البحث العلمي</h2>
        <ul className="space-y-3">
          {research.map((item) => <li key={item} className="flex items-start gap-3 text-mid leading-loose"><OutlineIcon name="check" className="w-5 h-5 mt-1 flex-shrink-0 text-purple-500" /><span>{item}</span></li>)}
        </ul>
        <div className="flex flex-wrap items-center gap-2 mt-6 text-sm font-bold text-purple-600">
          {['الخدمة المجتمعية', 'تجربة المريضة', 'الرعاية الصحية', 'البحث العلمي'].map((item, i) => <span key={item} className="flex items-center gap-2"><span className="bg-white px-3 py-1.5 rounded-full">{item}</span>{i < 3 && <span className="text-gold-600">+</span>}</span>)}
        </div>
      </article>
      <article className={`rounded-3xl bg-gold-50 border border-gold-200 p-8 lg:p-10 reveal-left ${visible ? 'reveal-visible' : ''}`}>
        <span className="text-gold-600 font-bold text-sm">الرؤية المستقبلية</span>
        <h2 className="text-3xl font-extrabold text-dark mt-4 mb-6">إلى أين نمضي</h2>
        <div className="flex flex-wrap gap-2">{future.map((item) => <span key={item} className="bg-white/75 text-mid px-3 py-2 rounded-full text-sm font-semibold">{item}</span>)}</div>
      </article>
    </div>
  </section>;
}

export default function About() {
  return <>
    <PageHeader title="الرعاية لا تنتهي" highlight="بانتهاء العلاج" subtitle="تأسس مجتمع ناجية عام ٢٠١٦ بمبادرة من أ.د. أطلال أبوسند، أستاذ واستشاري طب الأورام وأورام الثدي، كمساحة رقمية آمنة تتبادل فيها الناجيات الخبرات وتطرحن الأسئلة وتحصلن على معلومات طبية موثوقة." crumbs={[{ label: 'الرئيسية', to: '/' }, { label: 'عن ناجية', to: '/about' }]} />
    <AboutIntro />
    <SurvivorshipCare />
    <MissionAndVision />
    <ValuesSection />
    <Timeline />
    <ResearchAndFuture />
    <Founder />
    <JoinSection />
  </>;
}
