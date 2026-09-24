import PageHeader from '../components/PageHeader';
import JoinSection from '../components/Join';
import { KnowledgeContent } from './KnowledgePage';
import { EventsContent } from './EventsPage';

function SectionLead({ title, highlight, intro }: { title: string; highlight: string; intro?: string }) {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 lg:pt-28 pb-10 lg:pb-12">
      <h2 className="text-3xl lg:text-4xl font-extrabold text-dark leading-snug">
        {title} <span className="text-purple-500">{highlight}</span>
      </h2>
      {intro && <p className="mt-4 max-w-3xl text-mid text-lg leading-loose">{intro}</p>}
    </div>
  );
}

export default function Discovery() {
  return (
    <>
      <PageHeader
        title="ما الذي يمكنكِ اكتشافه"
        highlight="والاستفادة منه؟"
        subtitle="أرشيف ملتقيات ناجية وفعالياتها منذ ٢٠٢٠، ومكتبة مقالات عن الحياة بعد السرطان."
        crumbs={[{ label: 'الرئيسية', to: '/' }, { label: 'عالم ناجية', to: '/discover' }]}
      />

      <section id="events" className="scroll-mt-24">
        <SectionLead
          title="ملتقيات"
          highlight="ناجية"
          intro="محطة سنوية تجمع الناجيات وعائلاتهن والمتخصصين، وبرامج تمتد على مدار العام بين لقاءات مباشرة وورش عمل."
        />
        <EventsContent />
      </section>

      <section id="knowledge" className="scroll-mt-24">
        <SectionLead
          title="معرفة موثوقة"
          highlight="عن الحياة بعد السرطان"
          intro="محتوى عربي مبسط يجيب عن الأسئلة التي لا يتّسع لها وقت العيادة، مبني على إرشادات طبية موثوقة تُذكر مصادرها أسفل كل مقال."
        />
        <KnowledgeContent />
      </section>

      <JoinSection />
    </>
  );
}
