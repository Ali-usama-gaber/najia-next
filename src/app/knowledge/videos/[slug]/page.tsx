import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeriesPage from '@/views/SeriesPage';
import { seriesBySlug, videoSeriesList } from '@/data/videos';

export const dynamicParams = false;

export function generateStaticParams() {
  return videoSeriesList.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const series = seriesBySlug(slug);
  if (!series) return {};
  return { title: series.title, description: series.summary, openGraph: { title: series.title, description: series.summary, images: [series.cover] } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const series = seriesBySlug(slug);
  if (!series) notFound();
  return <SeriesPage series={series} />;
}
