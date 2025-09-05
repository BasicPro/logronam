import type { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateSEOMetadata('rankings', locale);
}

export default function RankingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
