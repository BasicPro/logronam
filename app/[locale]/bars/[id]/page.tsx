"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Header } from "../../../../components/layout/Header";
import { Footer } from "../../../../components/layout/Footer";
import { Card, CardContent, CardHeader } from "../../../../components/ui/Card";
import { Rating } from "../../../../components/ui/Rating";
import { Image } from "../../../../components/ui/Image";
import { Button } from "../../../../components/ui/Button";
import { getBarById } from "../../../../lib/bars";
import { getPriceRangeSymbol } from "../../../../lib/utils";
import {
  MapPin,
  Phone,
  Globe,
  Instagram,
  Star,
  Euro,
  ArrowLeft,
  Share2,
  Navigation,
} from "lucide-react";
import Link from "next/link";
import { Bar } from "../../../../types/bar";
import { Locale } from "../../../../types/common";

export default function BarDetailPage() {
  const { t } = useTranslation("common");
  const params = useParams();
  const currentLocale = params.locale as Locale;
  const barId = params.id as string;

  const [bar, setBar] = useState<Bar | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBar = async () => {
      try {
        const data = await getBarById(barId, currentLocale);
        setBar(data);
      } catch (error) {
        console.error("Failed to load bar details:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBar();
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link href={`/${currentLocale}/rankings`}>
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t("bars.backToRankings")}
          </Button>
        </Link>
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
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  {t("bars.share")}
                </Button>
                <Button className="bg-white text-gray-900 hover:bg-gray-100">
                  <Navigation className="w-4 h-4 mr-2" />
                  {t("bars.getDirections")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bar Info */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {t("bars.about")}
                    </h2>
                    <div className="flex items-center gap-4 mb-4">
                      <Rating rating={bar.rating} size="lg" />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-2xl font-bold text-red-600">
                      <Euro className="w-6 h-6" />
                      <span>{getPriceRangeSymbol(bar.priceRange)}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {t("bars.priceRangeLabel")}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">{bar.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {t("bars.location")}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{bar.location.address}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {bar.location.neighborhood}
                    </p>
                  </div>
                </div>

                {/* Review */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Review</h3>
                  <p className="text-gray-700 italic">{bar.review}</p>
                </div>
              </CardContent>
            </Card>

            {/* Featured Pintxos */}
            {bar.featuredPintxos.length > 0 && (
              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {t("bars.bestPintxo")}
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-gray-600">
                      Featured pintxos will be displayed here
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Variation IDs: {bar.featuredPintxos.join(", ")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* All Pintxos */}
            {bar.pintxos.length > 0 && (
              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {t("bars.allPintxos")}
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-gray-600">
                      All pintxos will be displayed here
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Pintxo IDs: {bar.pintxos.join(", ")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">
                  {t("bars.contact")}
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bar.contact?.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <a
                        href={`tel:${bar.contact.phone}`}
                        className="text-gray-700 hover:text-red-600"
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
                        className="text-gray-700 hover:text-red-600"
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
                        className="text-gray-700 hover:text-red-600"
                      >
                        {bar.contact.instagram}
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">
                  {t("bars.actions")}
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full">
                    <Star className="w-4 h-4 mr-2" />
                    {t("bars.writeReview")}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    {t("bars.share")}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Navigation className="w-4 h-4 mr-2" />
                    {t("bars.getDirections")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
