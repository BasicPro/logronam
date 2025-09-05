import { Metadata } from "next";
import { Header } from "../../../components/layout/Header";
import { Footer } from "../../../components/layout/Footer";
import { BarsClientPage } from "../../../components/bar/BarsClientPage";
import { generateMetadata as generateSEOMetadata } from "../../../lib/seo";
import { getBars } from "../../../lib/bars";
import { Locale } from "../../../types/common";

interface BarsPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata({
  params,
}: BarsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEOMetadata("bars", locale);
}

export default async function BarsPage({ params }: BarsPageProps) {
  const { locale } = await params;

  // Fetch bars data on the server
  const bars = await getBars(locale);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Bares</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Explora todos los bares de Logroño
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BarsClientPage initialBars={bars} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
