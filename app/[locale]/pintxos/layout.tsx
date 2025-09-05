import type { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return generateSEOMetadata('pintxos', params.locale);
}

export default function PintxosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
