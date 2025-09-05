import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: false,
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateSEOMetadata("home", locale);
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <I18nProvider locale={locale}>{children}</I18nProvider>
      </body>
    </html>
  );
}
