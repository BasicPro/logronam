"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import { Card, CardContent, CardFooter } from "../ui/Card";
import { Button } from "../ui/Button";
import { Image } from "../ui/Image";
import { Pintxo, PintxoVariation } from "../../types/pintxo";
import { getBarsByIds } from "../../lib/bars";
import { getPintxoVariations } from "../../lib/pintxos";
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
  const [variations, setVariations] = useState<PintxoVariation[]>([]);
  const [bars, setBars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVariations = async () => {
      try {
        const [variationsData, barsData] = await Promise.all([
          getPintxoVariations(pintxo.id, currentLocale as any),
          getBarsByIds([], currentLocale as any) // We'll get the bars after we have variations
        ]);
        setVariations(variationsData);
        
        // Get unique bar IDs from variations
        const barIds = [...new Set(variationsData.map(v => v.barId))];
        const barsForPintxo = await getBarsByIds(barIds, currentLocale as any);
        setBars(barsForPintxo);
      } catch (error) {
        console.error("Failed to load pintxo variations:", error);
      } finally {
        setLoading(false);
      }
    };
    loadVariations();
  }, [pintxo.id, currentLocale]);

  if (loading) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="h-48 bg-gray-200 animate-pulse"></div>
          <div className="p-6">
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Get the best rated variation for display
  const bestVariant = variations.reduce((best, current) => 
    current.rating > best.rating ? current : best
  );

  // Calculate price and rating ranges
  const prices = variations.map(variation => variation.price);
  const ratings = variations.map(variation => variation.rating);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const minRating = Math.min(...ratings);
  const maxRating = Math.max(...ratings);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="relative h-48">
          <Image
            src={bestVariant.image}
            alt={pintxo.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Euro className="w-3 h-3 text-green-600" />
            <span className="text-sm font-semibold text-green-600">
              {minPrice === maxPrice 
                ? `${minPrice.toFixed(2)}€`
                : `${minPrice.toFixed(2)}€ - ${maxPrice.toFixed(2)}€`
              }
            </span>
          </div>
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500" />
            <span className="text-sm font-semibold text-yellow-600">
              {minRating === maxRating 
                ? `${minRating.toFixed(1)}`
                : `${minRating.toFixed(1)} - ${maxRating.toFixed(1)}`
              }
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
              {pintxo.name}
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
            {pintxo.description}
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ChefHat className="w-4 h-4 text-red-500" />
              <span className="capitalize">{pintxo.category}</span>
            </div>

            {pintxo.tags && Array.isArray(pintxo.tags) && (
              <div className="flex flex-wrap gap-1">
                {pintxo.tags.slice(0, 3).map((tag, index) => (
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
                  {variations.slice(0, 2).map((variation) => {
                    const bar = bars.find(b => b.id === variation.barId);
                    if (!bar) return null;
                    
                    return (
                      <div key={variation.id} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src={bar.images[0]}
                            alt={bar.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {bar.name}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <span>{variation.price.toFixed(2)}€</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500" />
                              <span>{variation.rating.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {variations.length > 2 && (
                    <p className="text-xs text-gray-500">
                      {t("pintxos.moreBars", { count: variations.length - 2 })}
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
