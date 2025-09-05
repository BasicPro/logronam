"use client";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { MapPin, Euro } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { Rating } from "../ui/Rating";
import { Image } from "../ui/Image";
import { Button } from "../ui/Button";
import { Bar } from "../../types/bar";
import { getPriceRangeSymbol } from "../../lib/utils";

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

  return (
    <Card className={`overflow-hidden ${className}`} hover>
      <CardHeader className="p-0">
        <div className="relative h-48">
          <Image
            src={bar.images[0]} // Use first image as main
            alt={bar.name}
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
              {bar.name}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {bar.description}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>{bar.location.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Euro className="w-4 h-4 text-red-500" />
                <span>{getPriceRangeSymbol(bar.priceRange)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <span className="capitalize">{bar.category}</span>
              <span>{bar.features.length} {t("bar.features")}</span>
            </div>

            {bar.featuredPintxos.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  {t("bar.featuredPintxos")}
                </h4>
                <p className="text-xs text-gray-600">
                  {bar.featuredPintxos.length} {t("bar.featuredPintxosCount")}
                </p>
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
