import Hero from '../components/Hero';
import About from '../components/About';
import JourneyPillars from '../components/JourneyPillars';
import Survivor from '../components/Survivor';
import { VoicesPreview } from '../components/Voices';
import Knowledge from '../components/Knowledge';
import EventsPreview from '../components/EventsPreview';
import Impact from '../components/Impact';
import { SafeSpaceStrip } from '../components/SafeSpace';
import Founder from '../components/Founder';
import JoinSection from '../components/Join';

// Homepage = previews and gateways; depth lives on the internal pages.
export default function Home() {
  return (
    <>
      <Hero />
      <About preview />
      <JourneyPillars />
      <Survivor />
      <VoicesPreview />
      <Knowledge />
      <EventsPreview />
      <Impact />
      <SafeSpaceStrip />
      <Founder />
      <JoinSection />
    </>
  );
}
