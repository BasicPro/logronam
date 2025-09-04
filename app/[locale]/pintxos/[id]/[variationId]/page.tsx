"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Header } from '../../../../../components/layout/Header';
import { Footer } from '../../../../../components/layout/Footer';
import { Card, CardContent, CardHeader } from '../../../../../components/ui/Card';
import { Image } from '../../../../../components/ui/Image';
import { Breadcrumb } from '../../../../../components/ui/Breadcrumb';
import { PriceRatingOverlay } from '../../../../../components/ui/PriceRatingOverlay';
import { LoadingSpinner } from '../../../../../components/ui/LoadingSpinner';
import { NotFoundPage } from '../../../../../components/ui/NotFoundPage';
import { PintxoInfo } from '../../../../../components/pintxo/PintxoInfo';
import { BarInfoCard } from '../../../../../components/bar/BarInfoCard';
import { VariationList } from '../../../../../components/pintxo/VariationList';
import { getPintxoById, getPintxoVariationById, getPintxoVariations } from '../../../../../lib/pintxos';
import { getBarsByIds } from '../../../../../data/bars';

export default function PintxoVariationDetailPage() {
  const { t } = useTranslation('common');
  const params = useParams();
  const currentLocale = params.locale as string;
  const pintxoId = params.id as string;
  const variationId = params.variationId as string;

  const [pintxo, setPintxo] = useState<any>(null);
  const [variation, setVariation] = useState<any>(null);
  const [allVariations, setAllVariations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedPintxo, fetchedVariation, fetchedAllVariations] = await Promise.all([
          getPintxoById(pintxoId, currentLocale as any),
          getPintxoVariationById(variationId, currentLocale as any),
          getPintxoVariations(pintxoId, currentLocale as any)
        ]);
        setPintxo(fetchedPintxo);
        setVariation(fetchedVariation);
        setAllVariations(fetchedAllVariations);
      } catch (error) {
        console.error("Failed to load pintxo variation details:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [pintxoId, variationId, currentLocale]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center py-12">
          <LoadingSpinner />
        </main>
        <Footer />
      </div>
    );
  }

  if (!pintxo || !variation) {
    return (
      <NotFoundPage
        title={t('pintxos.notFound.title')}
        description={t('pintxos.notFound.description')}
        backButtonText={t('pintxos.backToPintxos')}
        backButtonHref={`/${currentLocale}/pintxos`}
      />
    );
  }

  const bar = getBarsByIds([variation.barId])[0];
  const barName = typeof bar?.name === "string" ? bar.name : bar?.name?.[currentLocale] || bar?.name?.es || 'Variation';

  const breadcrumbItems = [
    { label: t('navigation.home'), href: `/${currentLocale}` },
    { label: t('navigation.pintxos'), href: `/${currentLocale}/pintxos` },
    { label: pintxo.name, href: `/${currentLocale}/pintxos/${pintxo.id}` },
    { label: barName }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative h-96">
                  <Image 
                    src={variation.image} 
                    alt={`${pintxo.name} at ${barName}`} 
                    className="w-full h-full object-cover" 
                  />
                  
                  {/* Price and rating overlays */}
                  <PriceRatingOverlay
                    price={variation.price}
                    rating={variation.rating}
                    pricePosition="top-right"
                    ratingPosition="top-left"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <PintxoInfo 
                  pintxo={pintxo} 
                  variationsCount={allVariations.length}
                />

                {/* Review Section */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Review</h3>
                  <p className="text-gray-700 italic">"{variation.review}"</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            {/* Bar Information */}
            {bar && (
              <BarInfoCard
                bar={bar}
                currentLocale={currentLocale}
                pintxoPrice={variation.price}
                className="mb-6"
              />
            )}

            {/* Other Variations */}
            <VariationList
              variations={allVariations}
              pintxo={pintxo}
              currentLocale={currentLocale}
              currentVariationId={variationId}
              viewAllHref={`/${currentLocale}/pintxos/${pintxoId}`}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
