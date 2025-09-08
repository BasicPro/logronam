"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Header } from "../../../../components/layout/Header";
import { Footer } from "../../../../components/layout/Footer";
import { Card, CardContent, CardHeader } from "../../../../components/ui/Card";
import { Image } from "../../../../components/ui/Image";
import { Button } from "../../../../components/ui/Button";
import { Breadcrumb } from "../../../../components/ui/Breadcrumb";
import { getBarById } from "../../../../lib/bars";
import {
  getPintxosByBar,
  getPintxoVariationById,
  getPintxoVariations,
} from "../../../../lib/pintxos";
import { getPriceRangeSymbol } from "../../../../lib/utils";
import { VariationCard } from "../../../../components/pintxo/VariationCard";
import {
  MapPin,
  Phone,
  Globe,
  Instagram,
  Star,
  Banknote,
  ArrowLeft,
  Share2,
  Navigation,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Bar } from "../../../../types/bar";
import { Locale } from "../../../../types/common";
import { Pintxo, PintxoVariation } from "../../../../types/pintxo";

// Custom component for bar page pintxo list that links to variations
const BarPintxoListCard: React.FC<{
  pintxo: Pintxo;
  variation: PintxoVariation;
  currentLocale: Locale;
}> = ({ pintxo, variation, currentLocale }) => {
  return (
    <Link href={`/${currentLocale}/pintxos/${pintxo.id}/${variation.id}`}>
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg border hover:shadow-md transition-all duration-200 cursor-pointer group">
        {/* Pintxo Image */}
        <div className="w-16 h-16 flex-shrink-0">
          <Image
            src={variation.image || "/images/placeholder-pintxo.jpg"}
            alt={pintxo.name}
            className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Pintxo Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-red-600 transition-colors">
              {pintxo.name}
            </h3>
            <div className="flex items-center gap-3 ml-4 flex-shrink-0">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-900">
                  {variation.rating.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <Banknote className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {variation.price.toFixed(2)}€
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {pintxo.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(variation.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">
                {variation.rating.toFixed(1)}/5
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function BarDetailPage() {
  const { t } = useTranslation("common");
  const params = useParams();
  const currentLocale = params.locale as Locale;
  const barId = params.id as string;

  const [bar, setBar] = useState<Bar | undefined>(undefined);
  const [featuredVariations, setFeaturedVariations] = useState<
    PintxoVariation[]
  >([]);
  const [allPintxos, setAllPintxos] = useState<Pintxo[]>([]);
  const [allVariations, setAllVariations] = useState<PintxoVariation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBarData = async () => {
      try {
        // Load bar data
        const barData = await getBarById(barId, currentLocale);
        setBar(barData);

        if (barData) {
          // Load featured pintxo variations
          const featuredVariationsData = await Promise.all(
            barData.featuredPintxos.map(async (variationId) => {
              const variation = await getPintxoVariationById(
                variationId,
                currentLocale
              );
              return variation;
            })
          );
          setFeaturedVariations(
            featuredVariationsData.filter(Boolean) as PintxoVariation[]
          );

          // Load all pintxos for this bar
          const pintxosData = await getPintxosByBar(barId, currentLocale);
          setAllPintxos(pintxosData);

          // Load all variations for this bar
          const allVariationsData = await Promise.all(
            barData.pintxos.map(async (pintxoId) => {
              // Find the variation for this pintxo at this bar
              const pintxoVariations = await getPintxoVariations(
                pintxoId,
                currentLocale
              );
              return pintxoVariations.find((v) => v.barId === barId);
            })
          );
          setAllVariations(
            allVariationsData.filter(Boolean) as PintxoVariation[]
          );
        }
      } catch (error) {
        console.error("Failed to load bar details:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBarData();
  }, [barId, currentLocale]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading bar details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!bar) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {t("bars.notFound.title")}
            </h1>
            <p className="text-gray-600 mb-8">
              {t("bars.notFound.description")}
            </p>
            <Link href={`/${currentLocale}`}>
              <Button>{t("bars.notFound.backHome")}</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const breadcrumbItems = [
    { label: t("navigation.home"), href: `/${currentLocale}` },
    { label: t("navigation.bars"), href: `/${currentLocale}/bars` },
    { label: bar.name },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="h-96 relative">
          <Image
            src={bar.images[0]} // Use first image as main
            alt={bar.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-bold mb-2">{bar.name}</h1>
                <p className="text-xl text-gray-200 capitalize">
                  {t(`categories.${bar.category}`)}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  className="text-white border-white hover:bg-white/20"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: bar.name,
                        text: bar.description,
                        url: window.location.href,
                      });
                    } else {
                      // Fallback: copy to clipboard
                      navigator.clipboard.writeText(window.location.href);
                      // You could add a toast notification here
                    }
                  }}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  {t("bars.share")}
                </Button>
                <Button
                  className="bg-white text-gray-900 hover:bg-gray-100"
                  onClick={() => {
                    const address = encodeURIComponent(bar.location.address);
                    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
                    window.open(mapsUrl, "_blank");
                  }}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  {t("bars.getDirections")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Bar Info */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {t("bars.about")}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {bar.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <MapPin className="w-6 h-6 text-red-500 mx-auto mb-2" />
                  <div className="text-lg font-bold text-gray-900 mb-1">
                    {bar.location.neighborhood}
                  </div>
                  <div className="text-xs text-gray-600">
                    {t("bars.location")}
                  </div>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Banknote className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <div className="text-lg font-bold text-green-600 mb-1">
                    {getPriceRangeSymbol(bar.priceRange)}
                  </div>
                  <div className="text-xs text-gray-600">
                    {t("bars.priceRangeLabel")}
                  </div>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                  <div className="text-lg font-bold text-gray-900 mb-1">
                    {bar.rating.toFixed(1)}
                  </div>
                  <div className="text-xs text-gray-600">
                    {t("common.rating")}
                  </div>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <div className="text-lg font-bold text-blue-600 mb-1">
                    {allPintxos.length}
                  </div>
                  <div className="text-xs text-gray-600">
                    {t("pintxos.title")}
                  </div>
                </div>
              </div>

              {/* Location and Contact Information */}
              <div className="mb-6 p-6 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Location Details */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-red-500" />
                      {t("bars.location")}
                    </h3>
                    <div className="space-y-2">
                      <p className="text-gray-700">{bar.location.address}</p>
                      <p className="text-sm text-gray-500">
                        {bar.location.neighborhood}
                      </p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  {(bar.contact?.phone ||
                    bar.contact?.website ||
                    bar.contact?.instagram) && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Phone className="w-5 h-5 text-gray-500" />
                        {t("bars.contact")}
                      </h3>
                      <div className="space-y-2">
                        {bar.contact?.phone && (
                          <div className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <a
                              href={`tel:${bar.contact.phone}`}
                              className="text-gray-700 hover:text-red-600 transition-colors"
                            >
                              {bar.contact.phone}
                            </a>
                          </div>
                        )}

                        {bar.contact?.website && (
                          <div className="flex items-center gap-3">
                            <Globe className="w-4 h-4 text-gray-500" />
                            <a
                              href={bar.contact.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-700 hover:text-red-600 transition-colors"
                            >
                              Website
                            </a>
                          </div>
                        )}

                        {bar.contact?.instagram && (
                          <div className="flex items-center gap-3">
                            <Instagram className="w-4 h-4 text-gray-500" />
                            <a
                              href={`https://instagram.com/${bar.contact.instagram.replace(
                                "@",
                                ""
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-700 hover:text-red-600 transition-colors"
                            >
                              {bar.contact.instagram}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: bar.name,
                        text: bar.description,
                        url: window.location.href,
                      });
                    } else {
                      // Fallback: copy to clipboard
                      navigator.clipboard.writeText(window.location.href);
                      // You could add a toast notification here
                    }
                  }}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  {t("bars.share")}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    const address = encodeURIComponent(bar.location.address);
                    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
                    window.open(mapsUrl, "_blank");
                  }}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  {t("bars.getDirections")}
                </Button>
              </div>

              {/* Review */}
              {bar.review && (
                <div className="p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-100">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    {t("common.ourReview")}
                  </h3>
                  <p className="text-gray-700 italic leading-relaxed">
                    {bar.review}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Featured Pintxos */}
          {featuredVariations.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {t("bars.featuredPintxos")}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>
                      {t("bars.featuredPintxosCount", {
                        count: featuredVariations.length,
                      })}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredVariations.map((variation) => {
                    // Find the pintxo for this variation
                    const pintxo = allPintxos.find(
                      (p) => p.id === variation.pintxoId
                    );
                    if (!pintxo) return null;

                    return (
                      <VariationCard
                        key={variation.id}
                        variation={variation}
                        pintxo={pintxo}
                        currentLocale={currentLocale}
                        showViewButton={true}
                        showBarButton={false}
                        isCurrentView={true}
                        className="border-2 border-red-100 bg-red-50/30"
                      />
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* All Pintxos */}
          {allVariations.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {t("bars.allPintxos")}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>
                      {allVariations.length}{" "}
                      {allVariations.length === 1
                        ? t("pintxos.title").slice(0, -1)
                        : t("pintxos.title")}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allVariations.map((variation) => {
                    const pintxo = allPintxos.find(
                      (p) => p.id === variation.pintxoId
                    );
                    if (!pintxo) return null;

                    return (
                      <BarPintxoListCard
                        key={variation.id}
                        pintxo={pintxo}
                        variation={variation}
                        currentLocale={currentLocale}
                      />
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
