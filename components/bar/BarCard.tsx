"use client";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { MapPin, Clock, Euro } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { Rating } from "../ui/Rating";
import { Image } from "../ui/Image";
import { Button } from "../ui/Button";
import { Bar } from "../../types/bar";
import { formatPrice, getPriceRangeSymbol } from "../../lib/utils";
import { getPintxoVariationById } from "../../lib/pintxos";

interface BarCardProps {
  bar: Bar;
  showDetails?: boolean;
  className?: string;
}

export const BarCard: React.FC<BarCardProps> = ({
  bar,
  showDetails = true,
  className,
}) => {
  const { t } = useTranslation("common");
  const params = useParams();
  const currentLocale = params.locale as string;
  const [bestPintxoVariation, setBestPintxoVariation] = React.useState<any>(null);

  React.useEffect(() => {
    const loadBestPintxoVariation = async () => {
      try {
        // Find the variation for this bar's best pintxo
        const variation = await getPintxoVariationById(
          `${bar.bestPintxo}-${bar.id.split('-').pop()}`,
          currentLocale as any
        );
        setBestPintxoVariation(variation);
      } catch (error) {
        console.error("Failed to load best pintxo variation:", error);
      }
    };

    if (bar.bestPintxo) {
      loadBestPintxoVariation();
    }
  }, [bar.bestPintxo, bar.id, currentLocale]);

  return (
    <Card className={`overflow-hidden ${className}`} hover>
      <CardHeader className="p-0">
        <div className="relative h-48">
          <Image
            src={bar.images.main}
            alt={
              typeof bar.name === "string"
                ? bar.name
                : bar.name[currentLocale] || bar.name.es || "Unknown"
            }
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
            <Rating rating={bar.rating} size="sm" />
          </div>
        </div>
      </CardHeader>

      {showDetails && (
        <CardContent>
          <div className="p-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
              {typeof bar.name === "string"
                ? bar.name
                : bar.name[currentLocale] || bar.name.es || "Unknown"}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {typeof bar.description === "string"
                ? bar.description
                : bar.description[currentLocale] || bar.description.es || ""}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>{bar.location.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-red-500" />
                <span>{bar.openingHours.monday}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Euro className="w-4 h-4 text-red-500" />
                <span>{getPriceRangeSymbol(bar.priceRange)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <span>
                {bar.totalReviews} {t("bar.reviews")}
              </span>
              <span className="capitalize">{bar.category}</span>
            </div>

            {bestPintxoVariation && (
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  {t("bar.bestPintxo")}
                </h4>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <Image
                      src={bestPintxoVariation.image}
                      alt="Best pintxo"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {formatPrice(bestPintxoVariation.price)}
                    </p>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-yellow-600">★</span>
                      <span className="text-xs text-gray-600">{bestPintxoVariation.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Link href={`/${currentLocale}/bars/${bar.id}`} className="w-full mt-4">
              <Button className="w-full">{t("bar.viewDetails")}</Button>
            </Link>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
