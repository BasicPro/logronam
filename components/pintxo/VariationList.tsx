import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { VariationCard } from './VariationCard';
import { getBarsByIds } from '../../lib/bars';

interface VariationListProps {
  variations: any[];
  pintxo: any;
  currentLocale: string;
  currentVariationId?: string;
  className?: string;
}

export const VariationList: React.FC<VariationListProps> = ({
  variations,
  pintxo,
  currentLocale,
  currentVariationId,
  className = ''
}) => {
  const { t } = useTranslation('common');
  const [bars, setBars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBars = async () => {
      try {
        const barIds = [...new Set(variations.map(v => v.barId))];
        const barsData = await getBarsByIds(barIds, currentLocale as any);
        setBars(barsData);
      } catch (error) {
        console.error("Failed to load bars:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBars();
  }, [variations, currentLocale]);

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <h2 className="text-xl font-bold text-gray-900">{t('pintxos.otherVariations')}</h2>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading variations...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variations.length === 0) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <h2 className="text-xl font-bold text-gray-900">{t('pintxos.otherVariations')}</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {variations.map((variation) => (
            <VariationCard
              key={variation.id}
              variation={variation}
              pintxo={pintxo}
              currentLocale={currentLocale}
              isCurrentView={variation.id === currentVariationId}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
