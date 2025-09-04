import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Image } from '../ui/Image';
import { Star } from 'lucide-react';
import { getBarsByIds } from '../../data/bars';

interface VariationListProps {
  variations: Array<{
    id: string;
    barId: string;
    price: number;
    rating: number;
    image: string;
  }>;
  pintxo: {
    name: string;
  };
  currentLocale: string;
  currentVariationId?: string;
  maxItems?: number;
  showViewAllLink?: boolean;
  viewAllHref?: string;
  className?: string;
}

export const VariationList: React.FC<VariationListProps> = ({
  variations,
  pintxo,
  currentLocale,
  currentVariationId,
  maxItems = 3,
  showViewAllLink = true,
  viewAllHref,
  className = ''
}) => {
  const filteredVariations = variations
    .filter(v => v.id !== currentVariationId)
    .slice(0, maxItems);

  if (filteredVariations.length === 0) return null;

  return (
    <Card className={className}>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">Other Variations</h3>
      </CardHeader>
      <CardContent className="space-y-3">
        {filteredVariations.map((variation) => {
          const bar = getBarsByIds([variation.barId])[0];
          if (!bar) return null;
          
          const barName = typeof bar.name === "string" ? bar.name : bar.name[currentLocale] || bar.name.es || "Unknown";
          
          return (
            <Link 
              key={variation.id} 
              href={viewAllHref || `/${currentLocale}/pintxos/${pintxo.id}/${variation.id}`}
              className="block"
            >
              <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <Image
                    src={variation.image}
                    alt={`${pintxo.name} at ${barName}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {barName}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>€{variation.price.toFixed(2)}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      <span>{variation.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
        
        {showViewAllLink && variations.length > maxItems + 1 && (
          <Link 
            href={viewAllHref || `/${currentLocale}/pintxos/${pintxo.id}`}
            className="block text-center text-sm text-red-600 hover:text-red-800 py-2"
          >
            View all {variations.length} variations
          </Link>
        )}
      </CardContent>
    </Card>
  );
};
