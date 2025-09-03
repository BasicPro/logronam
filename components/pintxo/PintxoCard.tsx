'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Rating } from '../ui/Rating';
import { Image } from '../ui/Image';
import { Pintxo } from '../../types/bar';
import { formatPrice } from '../../lib/utils';

interface PintxoCardProps {
  pintxo: Pintxo;
  className?: string;
}

export const PintxoCard: React.FC<PintxoCardProps> = ({
  pintxo,
  className
}) => {
  const { t } = useTranslation('common');

  return (
    <Card className={`overflow-hidden ${className}`} hover>
      <div className="relative h-32">
        <Image
          src={pintxo.image}
          alt={pintxo.name}
          className="w-full h-full"
        />
        <div className="absolute top-2 right-2">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
            <Rating rating={pintxo.rating} size="sm" />
          </div>
        </div>
      </div>
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{pintxo.name}</h3>
            <p className="text-lg font-bold text-red-600">
              {formatPrice(pintxo.price)}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">
          {pintxo.description}
        </p>
        
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-900 mb-1">{t('pintxo.taste')}:</p>
          <p className="text-sm text-gray-600 italic">&ldquo;{pintxo.taste}&rdquo;</p>
        </div>

        <div className="mb-3">
          <p className="text-sm font-medium text-gray-900 mb-1">{t('pintxo.ingredients')}:</p>
          <div className="flex flex-wrap gap-1">
            {pintxo.ingredients.map((ingredient, index) => (
              <span
                key={index}
                className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
