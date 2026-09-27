import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EventDetail from '@/views/EventDetail';
import LegacyRedirect from '@/components/LegacyRedirect';
import { eventBySlug, eventHref, najiaEvents } from '@/data/events';

export const dynamicParams = false;

export function generateStaticParams() {
  // Every event, so old links to pages that moved (the 2020 session, the award) still land.
  return najiaEvents.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = eventBySlug(slug);
  if (!event) return {};
  return {
    title: `${event.title} ${event.year}`,
    description: event.summary,
    openGraph: { title: event.fullTitle, description: event.summary, images: [event.cover] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = eventBySlug(slug);
  if (!event) notFound();
  if (event.category) return <LegacyRedirect to={eventHref(event)} />;
  return <EventDetail event={event} />;
}
