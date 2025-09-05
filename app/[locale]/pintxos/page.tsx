import { Metadata } from "next";
import { Header } from "../../../components/layout/Header";
import { Footer } from "../../../components/layout/Footer";
import { PintxosClientPage } from "../../../components/pintxo/PintxosClientPage";
import { generateMetadata as generateSEOMetadata } from "../../../lib/seo";
import { getPintxos } from "../../../lib/pintxos";
import { Locale } from "../../../types/common";
interface PintxosPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: PintxosPageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEOMetadata("pintxos", locale);
}

export default async function PintxosPage({ params }: PintxosPageProps) {
  const { locale } = await params;
  const localeTyped = locale as Locale;

  // Fetch pintxos data on the server
  const pintxos = await getPintxos(localeTyped);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Pintxos</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Descubre los mejores pinchos de Logroño
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PintxosClientPage initialPintxos={pintxos} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
