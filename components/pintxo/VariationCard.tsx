import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Image } from '../ui/Image';
import { PriceRatingOverlay } from '../ui/PriceRatingOverlay';
import { Star, ExternalLink } from 'lucide-react';
import { getBarsByIds } from '../../lib/bars';

interface VariationCardProps {
  variation: {
    id: string;
    barId: string;
    price: number;
    rating: number;
    image: string;
    review: string;
  };
  pintxo: {
    id: string;
    name: string;
  };
  currentLocale: string;
  showViewButton?: boolean;
  showBarButton?: boolean;
  isCurrentView?: boolean;
  onViewClick?: () => void;
  className?: string;
}

export const VariationCard: React.FC<VariationCardProps> = ({
  variation,
  pintxo,
  currentLocale,
  showViewButton = true,
  showBarButton = true,
  isCurrentView = false,
  onViewClick,
  className = ''
}) => {
  const { t } = useTranslation('common');
  const [bar, setBar] = React.useState<any>(null);

  React.useEffect(() => {
    const loadBar = async () => {
      try {
        const bars = await getBarsByIds([variation.barId], currentLocale as any);
        setBar(bars[0]);
      } catch (error) {
        console.error("Failed to load bar:", error);
      }
    };
    loadBar();
  }, [variation.barId, currentLocale]);
  
  if (!bar) return null;

  return (
    <div className={`flex flex-col border rounded-lg overflow-hidden shadow-sm ${className}`}>
      <div className="relative h-32">
        <Image
          src={variation.image}
          alt={`${pintxo.name} at ${bar.name}`}
          className="w-full h-full object-cover rounded-t-lg"
        />
        
        {/* Price and rating overlays using PriceRatingOverlay component with small size */}
        <PriceRatingOverlay
          price={variation.price}
          rating={variation.rating}
          pricePosition="top-left"
          ratingPosition="top-right"
          size="sm"
        />
        
        {isCurrentView && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {t('pintxos.currentView')}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-semibold text-gray-900">
            <Link href={`/${currentLocale}/bars/${bar.id}`} className="hover:text-red-600 transition-colors">
              {bar.name}
            </Link>
          </h3>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-blue-500" />
            <span className="text-xs font-semibold text-blue-600">
              {bar.rating.toFixed(1)}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-2">{bar.location.address}</p>
        <p className="text-sm text-gray-700 mb-3 italic">"{variation.review}"</p>
        
        <div className="flex gap-2">
          {showBarButton && (
            <Link href={`/${currentLocale}/bars/${bar.id}`} className="flex-1">
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                {t('pintxos.viewBar')} <ExternalLink className="w-4 h-4" />
              </Button>
            </Link>
          )}
          {showViewButton && (
            <Link href={`/${currentLocale}/pintxos/${pintxo.id}/${variation.id}`} className="flex-1">
              <Button 
                variant="primary" 
                className="w-full"
              >
                {t('common.view')}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
