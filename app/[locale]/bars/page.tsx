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
import { getBars } from '../../../lib/bars';
import { getPriceRangeSymbol } from '../../../lib/utils';
import { 
  MapPin, 
  Euro,
  SortAsc,
  SortDesc,
  Minus,
  Grid,
  List
} from 'lucide-react';
import Link from 'next/link';

type SortOption = 'rating' | 'name';
type SortOrder = 'asc' | 'desc';
type CategoryFilter = 'all' | 'bar' | 'restaurant' | 'taberna' | 'bodega';
type PriceFilter = 'all' | '€' | '€€' | '€€€' | '€€€€';
type ViewMode = 'grid' | 'list';

export default function BarsPage() {
  const { t } = useTranslation('common');
  const params = useParams();
  const currentLocale = params.locale as string;
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [bars, setBars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBars = async () => {
      try {
        const data = await getBars(currentLocale as any);
        setBars(data);
      } catch (error) {
        console.error("Failed to load bars:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBars();
  }, [currentLocale]);

  const filteredAndSortedBars = useMemo(() => {
    let filtered = bars;

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(bar => bar.category === categoryFilter);
    }

    // Apply price filter
    if (priceFilter !== 'all') {
      filtered = filtered.filter(bar => bar.priceRange === priceFilter);
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
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [bars, sortBy, sortOrder, categoryFilter, priceFilter]);

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
            <p className="text-lg text-gray-600">Loading bars...</p>
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
              {t('bars.title')}
            </h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              {t('bars.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Sorting */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Category Filter */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('bars.category')}
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="all">{t('bars.all')}</option>
                  <option value="bar">{t('categories.bar')}</option>
                  <option value="restaurant">{t('categories.restaurant')}</option>
                  <option value="taberna">{t('categories.taberna')}</option>
                  <option value="bodega">{t('categories.bodega')}</option>
                </select>
              </div>

              {/* Price Filter */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('bars.priceRange')}
                </label>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value as PriceFilter)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="all">{t('bars.all')}</option>
                  <option value="€">{t('priceRanges.€')} (€)</option>
                  <option value="€€">{t('priceRanges.€€')} (€€)</option>
                  <option value="€€€">{t('priceRanges.€€€')} (€€€)</option>
                  <option value="€€€€">{t('priceRanges.€€€€')} (€€€€)</option>
                </select>
              </div>

              {/* Sort Options */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('bars.sortBy')}
                </label>
                <div className="flex gap-2">
                  <Button
                    variant={sortBy === 'rating' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleSort('rating')}
                    className="flex items-center gap-1"
                  >
                    {t('bars.rating')} {getSortIcon('rating')}
                  </Button>
                  <Button
                    variant={sortBy === 'name' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-1"
                  >
                    {t('bars.name')} {getSortIcon('name')}
                  </Button>
                </div>
              </div>

              {/* View Mode */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('bars.view')}
                </label>
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            {t('bars.results', { count: filteredAndSortedBars.length })}
          </p>
        </div>

        {/* Bars List/Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedBars.map((bar) => (
              <Card key={bar.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  <Image
                    src={bar.images[0]}
                    alt={bar.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <Rating rating={bar.rating} size="sm" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{bar.name}</h3>
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full capitalize">
                      {t(`categories.${bar.category}`)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{bar.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{bar.location.neighborhood}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Euro className="w-4 h-4" />
                      <span>{getPriceRangeSymbol(bar.priceRange)}</span>
                    </div>
                  </div>
                  <Link href={`/${currentLocale}/bars/${bar.id}`} className="w-full">
                    <Button className="w-full">{t('common.viewDetails')}</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedBars.map((bar, index) => (
              <Card key={bar.id} className="overflow-hidden" hover>
                <div className="flex">
                  {/* Bar Image */}
                  <div className="flex-shrink-0 w-32 h-32">
                    <Image
                      src={bar.images[0]}
                      alt={bar.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Bar Info */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{bar.name}</h3>
                          <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full capitalize">
                            {t(`categories.${bar.category}`)}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3 line-clamp-2">{bar.description}</p>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{bar.location.neighborhood}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Euro className="w-4 h-4" />
                            <span>{getPriceRangeSymbol(bar.priceRange)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>{bar.features.length} {t('bar.features')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <Rating rating={bar.rating} size="lg" />
                        <Link href={`/${currentLocale}/bars/${bar.id}`}>
                          <Button>{t('common.viewDetails')}</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {filteredAndSortedBars.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('bars.noResults.title')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('bars.noResults.description')}
              </p>
              <Button onClick={() => {
                setCategoryFilter('all');
                setPriceFilter('all');
                setSortBy('rating');
                setSortOrder('desc');
              }}>
                {t('bars.noResults.clearFilters')}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
}
