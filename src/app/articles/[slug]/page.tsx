import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticlePage from '@/views/ArticlePage';
import { articleBySlug, articles } from '@/data/knowledge';

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.desc,
    openGraph: { title: article.title, description: article.desc },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();
  return <ArticlePage article={article} />;
}
