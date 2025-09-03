"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import { Card, CardContent, CardFooter } from "../ui/Card";
import { Button } from "../ui/Button";
import { Image } from "../ui/Image";
import { Pintxo } from "../../types/bar";
import { getBarsByIds } from "../../data/bars";
import { MapPin, Users, Euro, Star, ChefHat } from "lucide-react";

interface PintxoCardProps {
  pintxo: Pintxo;
  showBars?: boolean;
}

export const PintxoCard: React.FC<PintxoCardProps> = ({
  pintxo,
  showBars = true,
}) => {
  const { t } = useTranslation("common");
  const params = useParams();
  const currentLocale = params.locale as string;

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

  const localizedName = getLocalizedText(pintxo.name, currentLocale);
  const localizedDescription = getLocalizedText(
    pintxo.description,
    currentLocale
  );
  // const localizedIngredients = getLocalizedText(pintxo.ingredients, currentLocale);
  const localizedOrigin = pintxo.origin ? getLocalizedText(pintxo.origin, currentLocale) : '';
  const localizedTags = getLocalizedText(pintxo.tags as any, currentLocale);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="relative h-48">
          <Image
            src={pintxo.image}
            alt={localizedName}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Euro className="w-3 h-3 text-green-600" />
            <span className="text-sm font-semibold text-green-600">
              {pintxo.price.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
              {localizedName}
            </h3>
            <div className="flex items-center gap-1 ml-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < pintxo.popularity
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {localizedDescription}
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ChefHat className="w-4 h-4 text-red-500" />
              <span className="capitalize">{pintxo.difficulty}</span>
              <span className="text-gray-400">•</span>
              <span className="capitalize">{pintxo.category}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-red-500" />
              <span>{localizedOrigin}</span>
            </div>

            {localizedTags && Array.isArray(localizedTags) && (
              <div className="flex flex-wrap gap-1">
                {localizedTags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {showBars && bars.length > 0 && (
              <div className="border-t pt-3">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Users className="w-4 h-4 text-red-500" />
                  <span>{t("pintxos.availableAt")}</span>
                </div>
                <div className="space-y-2">
                  {bars.slice(0, 2).map((bar) => (
                    <div key={bar.id} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={bar.images.main}
                          alt={bar.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {bar.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {bar.location.address}
                        </p>
                      </div>
                    </div>
                  ))}
                  {bars.length > 2 && (
                    <p className="text-xs text-gray-500">
                      {t("pintxos.moreBars", { count: bars.length - 2 })}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Link
          href={`/${currentLocale}/pintxos/${pintxo.id}`}
          className="w-full"
        >
          <Button className="w-full">{t("pintxos.viewDetails")}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
