"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import { Image } from "../ui/Image";
import { ChefHat, Euro, Star } from "lucide-react";

interface PintxoListCardProps {
  pintxo: any;
}

export const PintxoListCard: React.FC<PintxoListCardProps> = ({ pintxo }) => {
  const { t } = useTranslation("common");
  const params = useParams();
  const currentLocale = params.locale as string;

  const formatPriceRange = () => {
    if (!pintxo.priceRange) return 'N/A';
    if (pintxo.priceRange.min === pintxo.priceRange.max) {
      return `${pintxo.priceRange.min.toFixed(2)}€`;
    }
    return `${pintxo.priceRange.min.toFixed(2)}€ - ${pintxo.priceRange.max.toFixed(2)}€`;
  };

  const formatRatingRange = () => {
    if (!pintxo.ratingRange) return 'N/A';
    if (pintxo.ratingRange.min === pintxo.ratingRange.max) {
      return pintxo.ratingRange.min.toFixed(1);
    }
    return `${pintxo.ratingRange.min.toFixed(1)} - ${pintxo.ratingRange.max.toFixed(1)}`;
  };

  return (
    <Link href={`/${currentLocale}/pintxos/${pintxo.id}`}>
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg border hover:shadow-md transition-all duration-200 cursor-pointer group">
        {/* Pintxo Image */}
        <div className="w-16 h-16 flex-shrink-0">
          <Image
            src={pintxo.image || '/images/placeholder-pintxo.jpg'}
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
                  {formatRatingRange()}
                </span>
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <Euro className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {formatPriceRange()}
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {pintxo.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <ChefHat className="w-4 h-4 text-gray-400" />
              <span className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded-full capitalize">
                {t(`categories.${pintxo.category}`)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < (pintxo.popularity || 0)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">
                {pintxo.popularity || 0}/5
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
