'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Header } from '../../../../components/layout/Header';
import { Footer } from '../../../../components/layout/Footer';
import { Card, CardContent, CardHeader } from '../../../../components/ui/Card';
import { Rating } from '../../../../components/ui/Rating';
import { Image } from '../../../../components/ui/Image';
import { Button } from '../../../../components/ui/Button';
import { PintxoCard } from '../../../../components/pintxo/PintxoCard';
import { getBarById } from '../../../../data/bars';
import { getPriceRangeSymbol } from '../../../../lib/utils';
import { 
  MapPin, 
  Phone, 
  Globe, 
  Instagram, 
  Star, 
  Euro,
  ArrowLeft,
  Share2,
  Navigation
} from 'lucide-react';
import Link from 'next/link';

export default function BarDetailPage() {
  const { t } = useTranslation('common');
  const params = useParams();
  const currentLocale = params.locale as string;
  const barId = params.id as string;
  const bar = getBarById(barId);

  if (!bar) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('bar.notFound.title')}</h1>
            <p className="text-gray-600 mb-8">{t('bar.notFound.description')}</p>
            <Link href={`/${currentLocale}`}>
              <Button>{t('bar.notFound.backHome')}</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link href={`/${currentLocale}/rankings`}>
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t('bar.backToRankings')}
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="h-96 relative">
          <Image
            src={bar.images.main}
            alt={typeof bar.name === 'string' ? bar.name : bar.name.es || bar.name.en}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-bold mb-2">{typeof bar.name === 'string' ? bar.name : bar.name.es || bar.name.en}</h1>
                <p className="text-xl text-gray-200 capitalize">{t(`categories.${bar.category}`)}</p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" className="text-white border-white hover:bg-white/20">
                  <Share2 className="w-4 h-4 mr-2" />
                  {t('bar.share')}
                </Button>
                <Button className="bg-white text-gray-900 hover:bg-gray-100">
                  <Navigation className="w-4 h-4 mr-2" />
                  {t('bar.getDirections')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bar Info */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('bar.about')}</h2>
                    <div className="flex items-center gap-4 mb-4">
                      <Rating rating={bar.rating} size="lg" />
                      <span className="text-gray-600">({bar.totalReviews} {t('bar.reviews')})</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-2xl font-bold text-red-600">
                      <Euro className="w-6 h-6" />
                      <span>{getPriceRangeSymbol(bar.priceRange)}</span>
                    </div>
                    <p className="text-sm text-gray-600">{t('bar.priceRangeLabel')}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">{typeof bar.description === 'string' ? bar.description : bar.description.es || bar.description.en}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t('bar.location')}</h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{bar.location.address}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{bar.location.neighborhood}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-2 mb-2">{t('bar.openingHours')}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Lunes - Domingo:</span>
                        <span>{bar.openingHours.monday}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {bar.features.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{t('bar.features')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {bar.features.map((feature, index) => (
                        <span
                          key={index}
                          className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Best Pintxo */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">{t('bar.bestPintxo')}</h2>
              </CardHeader>
              <CardContent>
                <PintxoCard pintxo={bar.bestPintxo} />
              </CardContent>
            </Card>

            {/* All Pintxos */}
            {bar.pintxos.length > 1 && (
              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-bold text-gray-900">{t('bar.allPintxos')}</h2>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {bar.pintxos.map((pintxo) => (
                      <PintxoCard key={pintxo.id} pintxo={pintxo} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reviews */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">{t('bar.reviews')}</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {bar.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.author}</h4>
                          <div className="flex items-center gap-2">
                            <Rating rating={review.rating} showNumber={false} size="sm" />
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                        {review.verified && (
                          <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                            {t('bar.verified')}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">{t('bar.contact')}</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bar.contact.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <a href={`tel:${bar.contact.phone}`} className="text-gray-700 hover:text-red-600">
                        {bar.contact.phone}
                      </a>
                    </div>
                  )}
                  
                  {bar.contact.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <a 
                        href={bar.contact.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-red-600"
                      >
                        Sitio web
                      </a>
                    </div>
                  )}
                  
                  {bar.contact.instagram && (
                    <div className="flex items-center gap-3">
                      <Instagram className="w-4 h-4 text-gray-500" />
                      <a 
                        href={`https://instagram.com/${bar.contact.instagram.replace('@', '')}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-red-600"
                      >
                        {bar.contact.instagram}
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">{t('bar.actions')}</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full">
                    <Star className="w-4 h-4 mr-2" />
                    {t('bar.writeReview')}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    {t('bar.share')}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Navigation className="w-4 h-4 mr-2" />
                    {t('bar.getDirections')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
