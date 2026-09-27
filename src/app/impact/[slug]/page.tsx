import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ImpactDetail from '@/views/ImpactDetail';
import { impactBySlug, impactItems } from '@/data/impact';

export const dynamicParams = false;

export function generateStaticParams() {
  return impactItems.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = impactBySlug(slug);
  if (!item) return {};
  const image = item.image ?? item.video?.poster;
  return { title: item.title, description: item.summary, openGraph: { title: item.title, description: item.summary, images: image ? [image] : undefined } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = impactBySlug(slug);
  if (!item) notFound();
  return <ImpactDetail item={item} />;
}
