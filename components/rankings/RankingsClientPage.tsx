"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SearchAndFilterPage } from "../ui/SearchAndFilterPage";
import { BarCard } from "../bar/BarCard";
import { PintxoCard } from "../pintxo/PintxoCard";
import { BarListCard } from "../bar/BarListCard";
import { PintxoListCard } from "../pintxo/PintxoListCard";

interface RankingItem {
  __typename: 'Bar' | 'Pintxo';
  id: string;
  name: string;
  rating: number;
  [key: string]: any;
}

interface RankingsClientPageProps {
  initialItems: RankingItem[];
  locale: string;
}

export const RankingsClientPage: React.FC<RankingsClientPageProps> = ({ 
  initialItems, 
  locale 
}) => {
  const { t } = useTranslation("common");

  // Filter options for rankings
  const filterOptions = [
    {
      key: '__typename',
      label: t('contentType.title'),
      type: 'select' as const,
      options: [
        { value: 'Bar', label: t('contentType.bars') },
        { value: 'Pintxo', label: t('contentType.pintxos') },
      ]
    },
    {
      key: 'category',
      label: t('common.category'),
      type: 'select' as const,
      options: [
        { value: 'bar', label: t('categories.bar') },
        { value: 'restaurant', label: t('categories.restaurant') },
        { value: 'taberna', label: t('categories.taberna') },
        { value: 'bodega', label: t('categories.bodega') },
        { value: 'traditional', label: t('categories.traditional') },
        { value: 'modern', label: t('categories.modern') },
        { value: 'fusion', label: t('categories.fusion') },
        { value: 'vegetarian', label: t('categories.vegetarian') },
        { value: 'seafood', label: t('categories.seafood') },
        { value: 'meat', label: t('categories.meat') },
      ]
    },
    {
      key: 'priceRange',
      label: t('common.priceRange'),
      type: 'select' as const,
      options: [
        { value: '€', label: `€ - ${t('priceRanges.€')}` },
        { value: '€€', label: `€€ - ${t('priceRanges.€€')}` },
        { value: '€€€', label: `€€€ - ${t('priceRanges.€€€')}` },
        { value: '€€€€', label: `€€€€ - ${t('priceRanges.€€€€')}` },
      ]
    }
  ];

  // Sort options for rankings
  const sortOptions = [
    { value: 'rating', label: t('common.rating') },
    { value: 'popularity', label: t('common.popularity') },
    { value: 'name', label: t('common.name') },
  ];

  // Custom render function for rankings with badges
  const renderRankingItem = (item: RankingItem, viewMode?: 'grid' | 'list') => {
    const cardContent = item.__typename === "Bar" ? (
      <BarCard bar={item} />
    ) : (
      <PintxoCard pintxo={item} />
    );

    const listContent = item.__typename === "Bar" ? (
      <BarListCard bar={item} />
    ) : (
      <PintxoListCard pintxo={item} />
    );

    return (
      <div className="relative">
        {/* Type Badge */}
        <div className="absolute top-2 right-2 z-10 bg-white text-gray-600 px-2 py-1 rounded-full text-xs font-medium shadow-sm">
          {item.__typename === "Bar" ? t('categories.bar') : t('categories.pintxo')}
        </div>
        
        {viewMode === 'list' ? listContent : cardContent}
      </div>
    );
  };

  return (
    <SearchAndFilterPage
      items={initialItems}
      searchFields={['name', 'description']}
      filterOptions={filterOptions}
      sortOptions={sortOptions}
      defaultSort="rating"
      viewModes={['grid', 'list']}
      defaultViewMode="grid"
      renderItem={renderRankingItem}
      searchPlaceholder={t('rankings.searchPlaceholder')}
      noResultsMessage={t('rankings.noResults')}
    />
  );
};
