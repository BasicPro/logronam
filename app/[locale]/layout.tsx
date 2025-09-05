import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { I18nProvider } from '@/components/providers/I18nProvider';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import '../globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: false
});

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return generateSEOMetadata('home', params.locale);
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale} className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <I18nProvider locale={params.locale}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
