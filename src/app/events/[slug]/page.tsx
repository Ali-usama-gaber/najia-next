import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EventDetail from '@/views/EventDetail';
import { eventBySlug, najiaEvents } from '@/data/events';

export const dynamicParams = false;

export function generateStaticParams() {
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
  return <EventDetail event={event} />;
}
