'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '../components/PageHeader';
import FormField, { DemoNotice, Listbox, PhoneInput, inputClass, textOptions, textareaClass } from '../components/FormField';
import { useScrollReveal } from '../hooks/useScrollReveal';
import OutlineIcon, { type IconName } from '../components/OutlineIcon';

const ways: { icon: IconName; title: string; desc: string }[] = [
  { icon: 'lock', title: 'مجموعة رقمية مغلقة', desc: 'نقاش يومي بين العضوات، وأسئلة تجد إجاباتها من تجربة حقيقية أو من متخصص.' },
  { icon: 'message', title: 'لقاءات مباشرة مع أطباء', desc: 'جلسات دورية تغطي موضوعات ما بعد العلاج وتفتح باب الأسئلة المباشرة.' },
  { icon: 'calendar', title: 'ملتقيات حضورية وافتراضية', desc: 'محطة سنوية تجمع الناجيات وعائلاتهن والمتخصصين.' },
  { icon: 'spark', title: 'مسارات التمكين', desc: 'مساحات مثل «ناجية مبدعة» و«ناجية منتجة» لعرض أعمال الناجيات ومشاريعهن.' },
];

const roles = ['ناجية', 'مريضة في مرحلة العلاج', 'فرد من العائلة', 'متخصص/ة في الرعاية الصحية', 'متطوعة', 'جهة داعمة'];

function WhatYouFind() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={ref} className={`reveal-hidden ${visible ? 'reveal-visible' : ''}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-dark">ما الذي <span className="text-purple-500">ستجدينه</span> هنا</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ways.map((r, i) => (
              <div key={r.title} className={`pillar-card bg-cream rounded-2xl p-7 border border-purple-100 reveal-hidden ${visible ? 'reveal-visible' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="w-11 h-11 mb-4 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center"><OutlineIcon name={r.icon} className="w-5 h-5" /></div>
                <h3 className="font-extrabold text-dark mb-2">{r.title}</h3>
                <p className="text-mid text-sm leading-loose">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function JoinForm() {
  const [attempted, setAttempted] = useState(false);
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section id="join-form" className="py-20 bg-cream">
      <div className="max-w-xl mx-auto px-6">
        <div ref={ref} className={`reveal-hidden ${visible ? 'reveal-visible' : ''}`}>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-dark mb-3">طلب <span className="text-purple-500">الانضمام</span></h2>
            <p className="text-mid leading-loose">املئي النموذج وسيتواصل فريق ناجية معكِ لإكمال الانضمام. بياناتك لا تُنشر ولا تُشارَك.</p>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setAttempted(true); }}
            className="bg-white rounded-3xl p-8 space-y-4 border border-purple-100"
          >
            <FormField id="join-name" label="الاسم">
              <input id="join-name" name="name" type="text" required autoComplete="name" className={inputClass} />
            </FormField>
            <FormField id="join-phone" label="رقم الجوال">
              <PhoneInput id="join-phone" required />
            </FormField>
            <FormField id="join-email" label="البريد الإلكتروني" optional>
              <input id="join-email" name="email" type="email" autoComplete="email" dir="ltr" className={`${inputClass} !text-left`} />
            </FormField>
            <FormField id="join-role" label="أنا">
              <Listbox id="join-role" name="role" required options={textOptions(roles)} />
            </FormField>
            <FormField id="join-city" label="المدينة">
              <input id="join-city" name="city" type="text" autoComplete="address-level2" className={inputClass} />
            </FormField>
            <FormField id="join-note" label="أي شيء تودّين إخبارنا به" optional>
              <textarea id="join-note" name="note" rows={4} className={textareaClass} />
            </FormField>
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-4 rounded-xl font-bold text-base hover:bg-purple-600 transition-all duration-300 hover:shadow-xl hover:shadow-purple-400/30 hover:-translate-y-0.5"
            >
              إرسال الطلب
            </button>
            {attempted && <DemoNotice destination="ببريد ناجية أو واتساب" />}
          </form>

          <p className="text-mid text-sm text-center leading-relaxed mt-6">
            للتطوع أو المشاركة بخبرتك أو الشراكة مع ناجية:{' '}
            <Link href="/get-involved" className="font-bold text-purple-500 underline underline-offset-4">شاركينا</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default function JoinPage() {
  return (
    <>
      <PageHeader
        title="أنتِ"
        highlight="لستِ وحدك."
        subtitle="مجتمع مغلق، آمن، ومستمر على مدار العام."
        crumbs={[{ label: 'الرئيسية', to: '/' }, { label: 'انضمي إلى المجتمع', to: '/join' }]}
      />
      <WhatYouFind />
      <JoinForm />
    </>
  );
}
