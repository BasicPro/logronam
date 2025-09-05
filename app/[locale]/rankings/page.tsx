'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';
import { Card, CardContent } from '../../../components/ui/Card';
import { Rating } from '../../../components/ui/Rating';
import { Image } from '../../../components/ui/Image';
import { Button } from '../../../components/ui/Button';
import { PintxoCard } from '../../../components/pintxo/PintxoCard';
import { BarCard } from '../../../components/bar/BarCard';
import { getBars } from '../../../lib/bars';
import { getPintxos } from '../../../lib/pintxos';
import { getPriceRangeSymbol } from '../../../lib/utils';
import { 
  MapPin, 
  Euro,
  SortAsc,
  SortDesc,
  Minus,
  Star,
  ChefHat
} from 'lucide-react';
import Link from 'next/link';

type SortOption = 'rating' | 'name' | 'popularity';
type SortOrder = 'asc' | 'desc';
type ContentFilter = 'all' | 'pintxos' | 'bars' | 'bodegas';
type CategoryFilter = 'all' | 'bar' | 'restaurant' | 'taberna' | 'bodega';
type PriceFilter = 'all' | '€' | '€€' | '€€€' | '€€€€';

interface RankingItem {
  id: string;
  type: 'pintxo' | 'bar';
  rating: number;
  name: string;
  description: string;
  category: string;
  priceRange?: string;
  popularity?: number;
  location?: {
    neighborhood: string;
  };
  images?: string[];
  features?: string[];
}

export default function RankingsPage() {
  const { t } = useTranslation('common');
  const params = useParams();
  const currentLocale = params.locale as string;
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [contentFilter, setContentFilter] = useState<ContentFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all');
  const [bars, setBars] = useState<any[]>([]);
  const [pintxos, setPintxos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [barsData, pintxosData] = await Promise.all([
          getBars(currentLocale as any),
          getPintxos(currentLocale as any)
        ]);
        setBars(barsData);
        setPintxos(pintxosData);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [currentLocale]);

  const allItems: RankingItem[] = useMemo(() => {
    const items: RankingItem[] = [];

    // Add bars
    if (contentFilter === 'all' || contentFilter === 'bars') {
      bars.forEach(bar => {
        items.push({
          id: bar.id,
          type: 'bar',
          rating: bar.rating,
          name: bar.name,
          description: bar.description,
          category: bar.category,
          priceRange: bar.priceRange,
          location: bar.location,
          images: bar.images,
          features: bar.features
        });
      });
    }

    // Add pintxos
    if (contentFilter === 'all' || contentFilter === 'pintxos') {
      pintxos.forEach(pintxo => {
        items.push({
          id: pintxo.id,
          type: 'pintxo',
          rating: pintxo.rating || 0, // Use average rating if available
          name: pintxo.name,
          description: pintxo.description,
          category: pintxo.category,
          popularity: pintxo.popularity
        });
      });
    }

    return items;
  }, [bars, pintxos, contentFilter]);

  const filteredAndSortedItems = useMemo(() => {
    let filtered = allItems;

    // Apply category filter (only for bars)
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => 
        item.type === 'bar' ? item.category === categoryFilter : true
      );
    }

    // Apply price filter (only for bars)
    if (priceFilter !== 'all') {
      filtered = filtered.filter(item => 
        item.type === 'bar' ? item.priceRange === priceFilter : true
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'popularity':
          // For pintxos, use popularity; for bars, use rating
          const aValue = a.type === 'pintxo' ? (a.popularity || 0) : a.rating;
          const bValue = b.type === 'pintxo' ? (b.popularity || 0) : b.rating;
          comparison = aValue - bValue;
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [allItems, sortBy, sortOrder, categoryFilter, priceFilter]);

  const handleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (option: SortOption) => {
    if (sortBy !== option) return <Minus className="w-4 h-4" />;
    return sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading rankings...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('rankings.title')}
            </h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              {t('rankings.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Sorting */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Content Filter */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('rankings.content')}
                </label>
                <select
                  value={contentFilter}
                  onChange={(e) => setContentFilter(e.target.value as ContentFilter)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="all">{t('rankings.filters.all')}</option>
                  <option value="pintxos">{t('rankings.filters.pintxos')}</option>
                  <option value="bars">{t('rankings.filters.bars')}</option>
                  <option value="bodegas">{t('rankings.filters.bodegas')}</option>
                </select>
              </div>

              {/* Category Filter (only for bars) */}
              {(contentFilter === 'all' || contentFilter === 'bars') && (
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('rankings.category')}
                  </label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="all">{t('rankings.all')}</option>
                    <option value="bar">{t('categories.bar')}</option>
                    <option value="restaurant">{t('categories.restaurant')}</option>
                    <option value="taberna">{t('categories.taberna')}</option>
                    <option value="bodega">{t('categories.bodega')}</option>
                  </select>
                </div>
              )}

              {/* Price Filter (only for bars) */}
              {(contentFilter === 'all' || contentFilter === 'bars') && (
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('rankings.priceRange')}
                  </label>
                  <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value as PriceFilter)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="all">{t('rankings.all')}</option>
                    <option value="€">{t('priceRanges.€')} (€)</option>
                    <option value="€€">{t('priceRanges.€€')} (€€)</option>
                    <option value="€€€">{t('priceRanges.€€€')} (€€€)</option>
                    <option value="€€€€">{t('priceRanges.€€€€')} (€€€€)</option>
                  </select>
                </div>
              )}

              {/* Sort Options */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('rankings.sortBy')}
                </label>
                <div className="flex gap-2">
                  <Button
                    variant={sortBy === 'rating' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleSort('rating')}
                    className="flex items-center gap-1"
                  >
                    {t('rankings.rating')} {getSortIcon('rating')}
                  </Button>
                  <Button
                    variant={sortBy === 'popularity' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleSort('popularity')}
                    className="flex items-center gap-1"
                  >
                    {t('pintxos.popularity')} {getSortIcon('popularity')}
                  </Button>
                  <Button
                    variant={sortBy === 'name' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-1"
                  >
                    {t('rankings.name')} {getSortIcon('name')}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            {t('rankings.results', { count: filteredAndSortedItems.length })}
          </p>
        </div>

        {/* Rankings List */}
        <div className="space-y-4">
          {filteredAndSortedItems.map((item, index) => (
            <Card key={`${item.type}-${item.id}`} className="overflow-hidden" hover>
              <div className="flex">
                {/* Position */}
                <div className="flex-shrink-0 w-16 bg-red-600 text-white flex items-center justify-center">
                  <span className="text-2xl font-bold">#{index + 1}</span>
                </div>

                {/* Item Image */}
                <div className="flex-shrink-0 w-32 h-32">
                  <Image
                    src={item.type === 'bar' ? item.images?.[0] : '/images/pintxos/placeholder.svg'}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Item Info */}
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                        <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full capitalize">
                          {t(`categories.${item.category}`)}
                        </span>
                        <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                          {item.type === 'bar' ? t('rankings.filters.bars') : t('rankings.filters.pintxos')}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        {item.type === 'bar' && item.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{item.location.neighborhood}</span>
                          </div>
                        )}
                        {item.type === 'bar' && item.priceRange && (
                          <div className="flex items-center gap-1">
                            <Euro className="w-4 h-4" />
                            <span>{getPriceRangeSymbol(item.priceRange)}</span>
                          </div>
                        )}
                        {item.type === 'pintxo' && item.popularity && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            <span>{item.popularity}/5 {t('pintxos.popularity')}</span>
                          </div>
                        )}
                        {item.type === 'bar' && item.features && (
                          <div className="flex items-center gap-1">
                            <ChefHat className="w-4 h-4" />
                            <span>{item.features.length} {t('bar.features')}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <Rating rating={item.rating} size="lg" />
                      <Link href={`/${currentLocale}/${item.type === 'bar' ? 'bars' : 'pintxos'}/${item.id}`}>
                        <Button>{t('common.viewDetails')}</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredAndSortedItems.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('rankings.noResults.title')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('rankings.noResults.description')}
              </p>
              <Button onClick={() => {
                setContentFilter('all');
                setCategoryFilter('all');
                setPriceFilter('all');
                setSortBy('rating');
                setSortOrder('desc');
              }}>
                {t('rankings.noResults.clearFilters')}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
}
