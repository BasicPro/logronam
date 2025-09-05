"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SearchAndFilterPage } from "../ui/SearchAndFilterPage";

interface PintxosClientPageProps {
  initialPintxos: any[];
  locale: string;
}

export const PintxosClientPage: React.FC<PintxosClientPageProps> = ({ 
  initialPintxos, 
  locale 
}) => {
  const { t } = useTranslation("common");

  // Filter options for pintxos
  const filterOptions = [
    {
      key: 'category',
      label: t('common.category'),
      type: 'select' as const,
      options: [
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

  // Sort options for pintxos
  const sortOptions = [
    { value: 'popularity', label: t('common.popularity') },
    { value: 'name', label: t('common.name') },
    { value: 'rating', label: t('common.rating') },
  ];

  return (
    <SearchAndFilterPage
      items={initialPintxos}
      searchFields={['name', 'description']}
      filterOptions={filterOptions}
      sortOptions={sortOptions}
      defaultSort="popularity"
      viewModes={['grid', 'list']}
      defaultViewMode="grid"
      searchPlaceholder={t("pintxos.searchPlaceholder")}
      noResultsMessage={t("pintxos.noResults")}
    />
  );
};
