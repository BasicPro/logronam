"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Header } from "../../../../components/layout/Header";
import { Footer } from "../../../../components/layout/Footer";
import { Button } from "../../../../components/ui/Button";
import { Card, CardContent, CardHeader } from "../../../../components/ui/Card";
import { Image } from "../../../../components/ui/Image";
import { getPintxoById } from "../../../../data/pintxos";
import { getBarsByIds } from "../../../../data/bars";
import {
  MapPin,
  Euro,
  Star,
  ChefHat,
  Clock,
  Users,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function PintxoDetailPage() {
  const { t } = useTranslation("common");
  const params = useParams();
  const currentLocale = params.locale as string;
  const pintxoId = params.id as string;

  const pintxo = getPintxoById(pintxoId);

  if (!pintxo) {
    notFound();
  }

  const bars = getBarsByIds(pintxo.bars);

  // Helper function to get localized text
  const getLocalizedText = (
    text: string | Record<string, string | string[]>,
    locale: string
  ): string | string[] => {
    if (typeof text === "string") return text;
    if (typeof text === "object" && text[locale]) return text[locale];
    return text.es || text.en || Object.values(text)[0] || "";
  };

  const localizedName = getLocalizedText(pintxo.name, currentLocale) as string;
  const localizedDescription = getLocalizedText(
    pintxo.description,
    currentLocale
  ) as string;
  const localizedIngredients = getLocalizedText(
    pintxo.ingredients,
    currentLocale
  ) as string[];
  const localizedOrigin = getLocalizedText(
    pintxo.origin,
    currentLocale
  ) as string;
  const localizedTags = getLocalizedText(
    pintxo.tags,
    currentLocale
  ) as string[];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link
              href={`/${currentLocale}/pintxos`}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("pintxos.title")}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{localizedName}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pintxo Image */}
          <div className="space-y-6">
            <div className="relative">
              <Image
                src={pintxo.image}
                alt={localizedName}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 flex items-center gap-2">
                <Euro className="w-4 h-4 text-green-600" />
                <span className="text-lg font-bold text-green-600">
                  {pintxo.price.toFixed(2)} €
                </span>
              </div>
            </div>

            {/* Popularity Stars */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                {t("pintxos.popularity")}:
              </span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < pintxo.popularity
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({pintxo.popularity}/5)
              </span>
            </div>
          </div>

          {/* Pintxo Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {localizedName}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {localizedDescription}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <ChefHat className="w-4 h-4 text-red-500" />
                    {t("pintxos.category")}
                  </h3>
                </CardHeader>
                <CardContent>
                  <span className="capitalize text-gray-900 font-medium">
                    {pintxo.category}
                  </span>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-red-500" />
                    {t("pintxos.difficulty")}
                  </h3>
                </CardHeader>
                <CardContent>
                  <span className="capitalize text-gray-900 font-medium">
                    {pintxo.difficulty}
                  </span>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-500" />
                    {t("pintxos.origin")}
                  </h3>
                </CardHeader>
                <CardContent>
                  <span className="text-gray-900 font-medium">
                    {localizedOrigin}
                  </span>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Users className="w-4 h-4 text-red-500" />
                    {t("pintxos.availableAt")}
                  </h3>
                </CardHeader>
                <CardContent>
                  <span className="text-gray-900 font-medium">
                    {bars.length} {t("pintxos.bars")}
                  </span>
                </CardContent>
              </Card>
            </div>

            {/* Ingredients */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">
                  {t("pintxos.ingredients")}
                </h2>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {localizedIngredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            {localizedTags && localizedTags.length > 0 && (
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {t("pintxos.tags")}
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {localizedTags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Bars Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {t("pintxos.availableAt")} ({bars.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bars.map((bar) => (
              <Card
                key={bar.id}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-0">
                  <div className="relative h-48">
                    <Image
                      src={bar.images.main}
                      alt={
                        typeof bar.name === "string"
                          ? bar.name
                          : bar.name.es || bar.name.en
                      }
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold text-gray-900">
                        {bar.rating}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {typeof bar.name === "string"
                        ? bar.name
                        : bar.name.es || bar.name.en}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {typeof bar.description === "string"
                        ? bar.description
                        : bar.description.es || bar.description.en}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span>{bar.location.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="capitalize">{bar.category}</span>
                        <span className="text-gray-400">•</span>
                        <span>{bar.priceRange}</span>
                      </div>
                    </div>

                    <Link
                      href={`/${currentLocale}/bars/${bar.id}`}
                      className="w-full"
                    >
                      <Button className="w-full flex items-center justify-center gap-2">
                        {t("bar.viewDetails")}
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
