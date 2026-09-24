'use client';

import { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import PageHeader from '../components/PageHeader';
import FormField, { DemoNotice, Listbox, PhoneInput, inputClass, textOptions, textareaClass } from '../components/FormField';
import OutlineIcon, { type IconName } from '../components/OutlineIcon';

const topics = ['تطوّع', 'مشاركة خبرة طبية', 'قصة ناجية', 'عرض منتج', 'شراكة أو دعم', 'استفسار إعلامي', 'أخرى'] as const;
type Topic = (typeof topics)[number];

// Hash ids let other pages deep-link to a preselected topic, e.g. /get-involved#story.
const topicByHash: Record<string, Topic> = {
  volunteer: 'تطوّع',
  expertise: 'مشاركة خبرة طبية',
  story: 'قصة ناجية',
  product: 'عرض منتج',
  partner: 'شراكة أو دعم',
  media: 'استفسار إعلامي',
  other: 'أخرى',
};

const paths: { icon: IconName; title: string; text: string; topic: Topic }[] = [
  { icon: 'users', title: 'تطوّعي معنا', text: 'تنظيم الملتقيات، إدارة المحتوى، الترجمة، التصميم، التوثيق — المجتمع يُبنى بأيدي عضواته.', topic: 'تطوّع' },
  { icon: 'book', title: 'شاركي بخبرتك', text: 'أطباء ومتخصصون في التغذية والعلاج الطبيعي والصحة النفسية: قدّموا جلسة أو راجعوا محتوى.', topic: 'مشاركة خبرة طبية' },
  { icon: 'message', title: 'احكي قصتك', text: 'تجربتك قد تكون الطمأنينة التي تبحث عنها ناجية أخرى اليوم.', topic: 'قصة ناجية' },
  { icon: 'spark', title: 'اعرضي منتجك', text: 'ضمن «ناجية مبدعة ومنتجة» — مساحة لأعمال الناجيات ومشاريعهن.', topic: 'عرض منتج' },
  { icon: 'heart', title: 'ادعمي كشريكة', text: 'شراكات مع جهات صحية ومؤسسات تدعم برامج الملتقيات والمحتوى.', topic: 'شراكة أو دعم' },
  { icon: 'shield', title: 'انشري الوعي', text: 'شاركي محتوى الوقاية والكشف المبكر مع من حولك.', topic: 'أخرى' },
];

function scrollToForm() {
  document.getElementById('involvement-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

export default function GetInvolvedPage() {
  const [topic, setTopic] = useState<Topic | ''>('');
  const paths_ = useScrollReveal(0.08);
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    const fromHash = topicByHash[window.location.hash.slice(1)];
    if (fromHash) {
      setTopic(fromHash);
      requestAnimationFrame(scrollToForm);
    }
  }, []);

  const selectPath = (next: Topic) => {
    setTopic(next);
    scrollToForm();
  };

  return (
    <>
      <PageHeader
        title="شاركينا"
        highlight="صناعة الأثر"
        subtitle="ناجية مجتمع قائم على العطاء المتبادل. هناك أكثر من طريقة للمشاركة، ولكل منها أثر حقيقي."
        crumbs={[{ label: 'الرئيسية', to: '/' }, { label: 'شاركينا', to: '/get-involved' }]}
      />
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-2xl font-extrabold text-dark mb-8">طرق المشاركة</h2>
          <div ref={paths_.ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
            {paths.map((path) => (
              <button
                type="button"
                onClick={() => selectPath(path.topic)}
                key={path.title}
                aria-pressed={topic === path.topic}
                className={`text-right bg-cream border rounded-2xl p-7 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-100/70 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/40 reveal-hidden ${paths_.visible ? 'reveal-visible' : ''} ${topic === path.topic ? 'border-purple-300 shadow-lg shadow-purple-100/70' : 'border-purple-100'}`} style={{ transitionDelay: `${paths.indexOf(path) * 70}ms` }}
              >
                <div className="w-11 h-11 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center mb-5"><OutlineIcon name={path.icon} className="w-5 h-5" /></div>
                <h3 className="font-extrabold text-dark mb-2">{path.title}</h3>
                <p className="text-sm leading-loose text-mid">{path.text}</p>
              </button>
            ))}
          </div>

          <div id="involvement-form" className="max-w-2xl mx-auto bg-cream border border-purple-100 rounded-3xl p-7 sm:p-10">
            <div className="text-center mb-7">
              <h2 className="text-2xl font-extrabold text-dark mb-2">تواصلي معنا</h2>
              <p className="text-mid text-sm leading-loose">أخبرينا كيف تودّين المشاركة وسيصلك ردّ من فريق ناجية.</p>
            </div>
            <form onSubmit={(event) => { event.preventDefault(); setAttempted(true); }} className="space-y-4">
              <FormField id="gi-name" label="الاسم">
                <input id="gi-name" name="name" required autoComplete="name" className={inputClass} />
              </FormField>
              <FormField id="gi-email" label="البريد الإلكتروني">
                <input id="gi-email" name="email" type="email" required autoComplete="email" dir="ltr" className={`${inputClass} !text-left`} />
              </FormField>
              <FormField id="gi-phone" label="رقم الجوال" optional>
                <PhoneInput id="gi-phone" />
              </FormField>
              <FormField id="gi-topic" label="موضوع التواصل">
                <Listbox id="gi-topic" name="topic" required value={topic} onChange={(v) => setTopic(v as Topic)} options={textOptions(topics)} />
              </FormField>
              <FormField id="gi-message" label="رسالتك">
                <textarea id="gi-message" name="message" required rows={4} className={textareaClass} />
              </FormField>
              <button className="w-full bg-purple-500 text-white py-4 rounded-xl font-bold hover:bg-purple-600 transition-all hover:-translate-y-0.5">إرسال</button>
              {attempted && <DemoNotice destination="ببريد ناجية" />}
            </form>
            <p className="text-mid text-sm text-center mt-6">بيانات التواصل الرسمية تُضاف عند النشر.</p>
          </div>
        </div>
      </section>
    </>
  );
}
