"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SearchAndFilterPage } from "../ui/SearchAndFilterPage";

interface BarsClientPageProps {
  initialBars: any[];
  locale: string;
}

export const BarsClientPage: React.FC<BarsClientPageProps> = ({ 
  initialBars, 
  locale 
}) => {
  const { t } = useTranslation("common");

  // Filter options for bars
  const filterOptions = [
    {
      key: 'category',
      label: t('common.category'),
      type: 'select' as const,
      options: [
        { value: 'bar', label: t('categories.bar') },
        { value: 'restaurant', label: t('categories.restaurant') },
        { value: 'taberna', label: t('categories.taberna') },
        { value: 'bodega', label: t('categories.bodega') },
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

  // Sort options for bars
  const sortOptions = [
    { value: 'rating', label: t('common.rating') },
    { value: 'name', label: t('common.name') },
  ];

  return (
    <SearchAndFilterPage
      items={initialBars}
      searchFields={['name', 'description']}
      filterOptions={filterOptions}
      sortOptions={sortOptions}
      defaultSort="rating"
      viewModes={['grid', 'list']}
      defaultViewMode="grid"
      searchPlaceholder={t("bars.searchPlaceholder")}
      noResultsMessage={t("bars.noResults")}
    />
  );
};
