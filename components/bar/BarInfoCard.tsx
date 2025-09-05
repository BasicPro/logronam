import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { Button } from "../ui/Button";
import { Image } from "../ui/Image";
import { MapPin, Star, Phone, Globe, ExternalLink, Euro } from "lucide-react";

interface BarInfoCardProps {
  bar: {
    id: string;
    name: string;
    images: string[];
    rating: number;
    location: { address: string };
    contact?: {
      phone?: string;
      website?: string;
    };
  };
  currentLocale: string;
  showViewButton?: boolean;
  viewButtonText?: string;
  viewButtonHref?: string;
  className?: string;
  // Add price for the specific pintxo variation at this bar
  pintxoPrice?: number;
}

export const BarInfoCard: React.FC<BarInfoCardProps> = ({
  bar,
  currentLocale,
  showViewButton = true,
  viewButtonText,
  viewButtonHref,
  className = "",
  pintxoPrice,
}) => {
  const { t } = useTranslation("common");

  const finalViewButtonText = viewButtonText || t("pintxos.viewBar");
  const finalViewButtonHref =
    viewButtonHref || `/${currentLocale}/bars/${bar.id}`;

  return (
    <Card className={className}>
      <CardHeader>
        <h2 className="text-2xl font-bold text-gray-900">
          {t("pintxos.availableAt")}
        </h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src={bar.images[0]} // Use first image
              alt={bar.name}
              className="w-full h-full object-cover"
            />

            {/* Pintxo price overlay - top left */}
            {pintxoPrice && (
              <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                <Euro className="w-3 h-3 text-green-600" />
                <span className="text-xs font-semibold text-green-600">
                  {pintxoPrice.toFixed(2)}€
                </span>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-gray-900">
                <Link
                  href={finalViewButtonHref}
                  className="hover:text-red-600 transition-colors"
                >
                  {bar.name}
                </Link>
              </h3>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-semibold text-blue-600">
                  {bar.rating.toFixed(1)}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>{bar.location.address}</span>
              </div>
              {bar.contact?.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-500" />
                  <span>{bar.contact.phone}</span>
                </div>
              )}
              {bar.contact?.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-red-500" />
                  <a
                    href={bar.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Website
                  </a>
                </div>
              )}
            </div>

            {showViewButton && (
              <div className="mt-4 flex gap-2">
                <Link href={finalViewButtonHref} className="flex-1">
                  <Button className="w-full flex items-center justify-center gap-2">
                    {finalViewButtonText} <ExternalLink className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
