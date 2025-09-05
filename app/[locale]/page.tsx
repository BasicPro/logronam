'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { BarCard } from '../../components/bar/BarCard';
import { Button } from '../../components/ui/Button';
import { getTopRatedBars } from '../../lib/bars';
import { MapPin, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { t } = useTranslation('common');
  const params = useParams();
  const currentLocale = params.locale as string;
  const [topRatedBars, setTopRatedBars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBars = async () => {
      try {
        const bars = await getTopRatedBars(6, currentLocale as any);
        setTopRatedBars(bars);
      } catch (error) {
        console.error("Failed to load bars:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBars();
  }, [currentLocale]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('home.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100">
              {t('home.subtitle')}
            </p>
            <p className="text-lg mb-10 text-red-200 max-w-3xl mx-auto">
              {t('home.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${currentLocale}/rankings`}>
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                  {t('rankings.viewAllRankings')}
                </Button>
              </Link>
              <Link href={`/${currentLocale}/bars`}>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                  {t('navigation.bars')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-red-100 rounded-full p-4 mb-4">
                <MapPin className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">50+</h3>
              <p className="text-gray-600">{t('home.stats.bars')}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-red-100 rounded-full p-4 mb-4">
                <Star className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">1000+</h3>
              <p className="text-gray-600">{t('home.stats.reviews')}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-red-100 rounded-full p-4 mb-4">
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">200+</h3>
              <p className="text-gray-600">{t('home.stats.pintxos')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Bars Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('home.featuredBars')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('home.topRated')}
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">Loading bars...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {topRatedBars.map((bar) => (
                  <BarCard key={bar.id} bar={bar} />
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Link href={`/${currentLocale}/rankings`}>
                  <Button size="lg">
                    {t('rankings.viewAllRankings')}
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Neighborhoods Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('home.neighborhoods.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('home.neighborhoods.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-2">{t('home.neighborhoods.laurel.name')}</h3>
              <p className="text-red-100 mb-4">
                {t('home.neighborhoods.laurel.description')}
              </p>
              <p className="text-sm text-red-200">{t('home.neighborhoods.laurel.count')}</p>
            </div>
            
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-2">{t('home.neighborhoods.casco.name')}</h3>
              <p className="text-orange-100 mb-4">
                {t('home.neighborhoods.casco.description')}
              </p>
              <p className="text-sm text-orange-200">{t('home.neighborhoods.casco.count')}</p>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-2">{t('home.neighborhoods.granvia.name')}</h3>
              <p className="text-yellow-100 mb-4">
                {t('home.neighborhoods.granvia.description')}
              </p>
              <p className="text-sm text-yellow-200">{t('home.neighborhoods.granvia.count')}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
