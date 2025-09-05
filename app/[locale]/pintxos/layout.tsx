import type { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateSEOMetadata('pintxos', locale);
}

export default function PintxosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
