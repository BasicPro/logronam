"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import { Image } from "../ui/Image";
import { getPriceRangeSymbol } from "../../lib/utils";
import { MapPin, Euro, Star } from "lucide-react";

interface BarListCardProps {
  bar: any;
}

export const BarListCard: React.FC<BarListCardProps> = ({ bar }) => {
  const { t } = useTranslation("common");
  const params = useParams();
  const currentLocale = params.locale as string;

  return (
    <Link href={`/${currentLocale}/bars/${bar.id}`}>
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg border hover:shadow-md transition-all duration-200 cursor-pointer group">
        {/* Bar Image */}
        <div className="w-16 h-16 flex-shrink-0">
          <Image
            src={bar.images[0]}
            alt={bar.name}
            className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Bar Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-red-600 transition-colors">
              {bar.name}
            </h3>
            <div className="flex items-center gap-3 ml-4 flex-shrink-0">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-900">
                  {bar.rating.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <Euro className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {getPriceRangeSymbol(bar.priceRange)}
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {bar.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="truncate">{bar.location.neighborhood}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded-full capitalize">
                {t(`categories.${bar.category}`)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
