"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Header } from "../../../../components/layout/Header";
import { Footer } from "../../../../components/layout/Footer";
import { Card, CardContent, CardHeader } from "../../../../components/ui/Card";
import { Image } from "../../../../components/ui/Image";
import { Breadcrumb } from "../../../../components/ui/Breadcrumb";
import { PriceRatingOverlay } from "../../../../components/ui/PriceRatingOverlay";
import { LoadingSpinner } from "../../../../components/ui/LoadingSpinner";
import { NotFoundPage } from "../../../../components/ui/NotFoundPage";
import { PintxoInfo } from "../../../../components/pintxo/PintxoInfo";
import { VariationCard } from "../../../../components/pintxo/VariationCard";
import { getPintxoById, getPintxoVariations } from "../../../../lib/pintxos";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PintxoVariation } from "../../../../types/pintxo";
import { Pintxo } from "../../../../types/pintxo";
import { Locale } from "../../../../types/common";

export default function PintxoDetailPage() {
  const { t } = useTranslation("common");
  const params = useParams();
  const currentLocale = params.locale as Locale;
  const pintxoId = params.id as string;

  const [pintxo, setPintxo] = useState<Pintxo | undefined>();
  const [variations, setVariations] = useState<PintxoVariation[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedPintxo, fetchedVariations] = await Promise.all([
          getPintxoById(pintxoId, currentLocale),
          getPintxoVariations(pintxoId, currentLocale),
        ]);
        setPintxo(fetchedPintxo);
        setVariations(fetchedVariations);
      } catch (error) {
        console.error("Failed to load pintxo details:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [pintxoId, currentLocale]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center py-12">
          <LoadingSpinner />
        </main>
        <Footer />
      </div>
    );
  }

  if (!pintxo || variations.length === 0) {
    return (
      <NotFoundPage
        title={t("pintxos.notFound.title")}
        description={t("pintxos.notFound.description")}
        backButtonText={t("pintxos.backToPintxos")}
        backButtonHref={`/${currentLocale}/pintxos`}
      />
    );
  }

  // Calculate price and rating ranges for pintxo variations
  const prices = variations.map((variation) => variation.price);
  const ratings = variations.map((variation) => variation.rating);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const minRating = Math.min(...ratings);
  const maxRating = Math.max(...ratings);

  // Navigation functions for slideshow
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % variations.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + variations.length) % variations.length
    );
  };

  const breadcrumbItems = [
    { label: t("navigation.home"), href: `/${currentLocale}` },
    { label: t("navigation.pintxos"), href: `/${currentLocale}/pintxos` },
    { label: pintxo.name },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative h-96 group">
                  <Image
                    src={variations[currentImageIndex].image}
                    alt={pintxo.name}
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />

                  {/* Navigation arrows */}
                  {variations.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}

                  {/* Price and rating overlays */}
                  <PriceRatingOverlay
                    price={{ min: minPrice, max: maxPrice }}
                    rating={{ min: minRating, max: maxRating }}
                    pricePosition="top-right"
                    ratingPosition="top-left"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <PintxoInfo
                  pintxo={pintxo}
                  variationsCount={variations.length}
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">
                  {t("pintxos.availableAt")}
                </h2>
              </CardHeader>
              <CardContent className="space-y-6">
                {variations.length > 0 ? (
                  variations.map((variation, index: number) => (
                    <VariationCard
                      key={variation.id}
                      variation={variation}
                      pintxo={{ id: pintxo.id, name: pintxo.name }}
                      currentLocale={currentLocale}
                      isCurrentView={index === currentImageIndex}
                    />
                  ))
                ) : (
                  <p className="text-gray-600">{t("pintxos.noBarsFound")}</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
