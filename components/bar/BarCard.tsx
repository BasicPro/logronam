'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { MapPin, Clock, Euro } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Rating } from '../ui/Rating';
import { Image } from '../ui/Image';
import { Button } from '../ui/Button';
import { Bar } from '../../types/bar';
import { formatPrice, getPriceRangeSymbol } from '../../lib/utils';

interface BarCardProps {
  bar: Bar;
  showDetails?: boolean;
  className?: string;
}

export const BarCard: React.FC<BarCardProps> = ({
  bar,
  showDetails = true,
  className
}) => {
  const { t } = useTranslation('common');
  const params = useParams();
  const currentLocale = params.locale as string;

  return (
    <Card className={`overflow-hidden ${className}`} hover>
      <div className="relative h-48">
        <Image
          src={bar.images.main}
          alt={typeof bar.name === 'string' ? bar.name : bar.name.es || bar.name.en}
          className="w-full h-full"
        />
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
            <Rating rating={bar.rating} size="sm" />
          </div>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Euro className="w-3 h-3" />
            <span className="text-sm font-medium">
              {getPriceRangeSymbol(bar.priceRange)}
            </span>
          </div>
        </div>
      </div>
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{typeof bar.name === 'string' ? bar.name : bar.name.es || bar.name.en}</h3>
            <p className="text-sm text-gray-600 capitalize">{t(`categories.${bar.category}`)}</p>
          </div>
        </div>
      </CardHeader>

      {showDetails && (
        <CardContent>
          <p className="text-gray-700 text-sm mb-4 line-clamp-2">
            {typeof bar.description === 'string' ? bar.description : bar.description.es || bar.description.en}
          </p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{bar.location.neighborhood}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{bar.totalReviews} {t('bar.reviews')}</span>
            </div>
          </div>

          {bar.bestPintxo && (
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                {t('bar.bestPintxo')}
              </h4>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <Image
                    src={bar.bestPintxo.image}
                    alt={typeof bar.bestPintxo.name === 'string' ? bar.bestPintxo.name : bar.bestPintxo.name.es || bar.bestPintxo.name.en}
                    className="w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {typeof bar.bestPintxo.name === 'string' ? bar.bestPintxo.name : bar.bestPintxo.name.es || bar.bestPintxo.name.en}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatPrice(bar.bestPintxo.price)}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4">
            <Link href={`/${currentLocale}/bars/${bar.id}`}>
              <Button className="w-full">
                {t('common.viewDetails')}
              </Button>
            </Link>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
