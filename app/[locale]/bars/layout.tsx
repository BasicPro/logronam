import type { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return generateSEOMetadata('bars', params.locale);
}

export default function BarsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
