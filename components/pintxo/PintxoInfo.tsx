import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChefHat, Users } from 'lucide-react';

interface PintxoInfoProps {
  pintxo: {
    name: string;
    description: string;
    category: string;
    ingredients?: string[];
    tags?: string[];
  };
  variationsCount?: number;
  showIngredients?: boolean;
  showTags?: boolean;
  className?: string;
}

export const PintxoInfo: React.FC<PintxoInfoProps> = ({
  pintxo,
  variationsCount,
  showIngredients = true,
  showTags = true,
  className = ''
}) => {
  const { t } = useTranslation('common');

  return (
    <div className={className}>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">{pintxo.name}</h1>
      <p className="text-gray-700 text-lg mb-6">{pintxo.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex items-center gap-3">
          <ChefHat className="w-5 h-5 text-red-500" />
          <div>
            <p className="text-sm text-gray-500">{t('pintxos.category')}</p>
            <p className="font-medium capitalize">{pintxo.category}</p>
          </div>
        </div>
        
        {variationsCount !== undefined && (
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-red-500" />
            <div>
              <p className="text-sm text-gray-500">{t('pintxos.availableAt')}</p>
              <p className="font-medium">
                {variationsCount} {variationsCount === 1 ? t('pintxos.bar') : t('pintxos.bars')}
              </p>
            </div>
          </div>
        )}
      </div>

      {showIngredients && pintxo.ingredients && pintxo.ingredients.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('pintxos.ingredients')}</h3>
          <div className="flex flex-wrap gap-2">
            {pintxo.ingredients.map((ingredient: string, index: number) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      )}

      {showTags && pintxo.tags && pintxo.tags.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('pintxos.tags')}</h3>
          <div className="flex flex-wrap gap-2">
            {pintxo.tags.map((tag: string, index: number) => (
              <span key={index} className="px-3 py-1 bg-red-50 text-red-600 text-sm rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
