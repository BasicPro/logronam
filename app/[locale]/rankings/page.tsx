import { Metadata } from "next";
import { Header } from "../../../components/layout/Header";
import { Footer } from "../../../components/layout/Footer";
import { RankingsClientPage } from "../../../components/rankings/RankingsClientPage";
import { generateMetadata as generateSEOMetadata } from "../../../lib/seo";
import { getPintxos } from "../../../lib/pintxos";
import { LocaleProps } from "../../../types/common";
import { getBars } from "../../../lib/bars";
import { Pintxo } from "../../../types/pintxo";
import { Bar } from "../../../types/bar";
import { RankingItem } from "../../../types/rankingItem";

export async function generateMetadata({
  params,
}: LocaleProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEOMetadata("rankings", locale);
}

export default async function RankingsPage({ params }: LocaleProps) {
  const { locale } = await params;

  // Fetch all data on the server
  const [pintxos, bars] = await Promise.all([
    getPintxos(locale),
    getBars(locale),
  ]);

  // Combine and add type information for filtering
  const allItems: RankingItem[] = [
    ...pintxos.map((pintxo: Pintxo) => ({
      ...pintxo,
      __typename: "Pintxo" as const,
    })),
    ...bars.map((bar: Bar) => ({ ...bar, __typename: "Bar" as const })),
  ];

  // Sort by rating (highest first) as default
  allItems.sort((a, b) => {
    const aRating = a.rating || 0;
    const bRating = b.rating || 0;
    return bRating - aRating;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Rankings</h1>
          <p className="text-xl text-gray-600">
            Los mejores pintxos y bares de Logroño
          </p>
        </div>
        <RankingsClientPage initialItems={allItems} />
      </main>
      <Footer />
    </div>
  );
}
