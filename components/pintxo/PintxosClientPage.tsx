"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { SearchAndFilterPage } from "../ui/SearchAndFilterPage";
import { Pintxo } from "../../types/pintxo";

interface PintxosClientPageProps {
  initialPintxos: Pintxo[];
}

export const PintxosClientPage: React.FC<PintxosClientPageProps> = ({
  initialPintxos,
}) => {
  const { t } = useTranslation("common");

  // Filter options for pintxos
  const filterOptions = [
    {
      key: "category",
      label: t("common.category"),
      type: "select" as const,
      options: [
        { value: "traditional", label: t("tags.traditional") },
        { value: "modern", label: t("tags.modern") },
        { value: "fusion", label: t("tags.fusion") },
        { value: "vegetarian", label: t("tags.vegetarian") },
        { value: "seafood", label: t("tags.seafood") },
        { value: "meat", label: t("tags.meat") },
      ],
    },
    {
      key: "priceRange",
      label: t("common.priceRange"),
      type: "select" as const,
      options: [
        { value: "€", label: `€ - ${t("priceRanges.€")}` },
        { value: "€€", label: `€€ - ${t("priceRanges.€€")}` },
        { value: "€€€", label: `€€€ - ${t("priceRanges.€€€")}` },
        { value: "€€€€", label: `€€€€ - ${t("priceRanges.€€€€")}` },
      ],
    },
  ];

  // Sort options for pintxos
  const sortOptions = [
    { value: "popularity", label: t("common.popularity") },
    { value: "name", label: t("common.name") },
    { value: "rating", label: t("common.rating") },
  ];

  return (
    <SearchAndFilterPage
      items={initialPintxos}
      searchFields={["name", "description"]}
      filterOptions={filterOptions}
      sortOptions={sortOptions}
      defaultSort="popularity"
      viewModes={["grid", "list"]}
      defaultViewMode="grid"
      searchPlaceholder={t("pintxos.searchPlaceholder")}
      noResultsMessage={t("pintxos.noResults")}
    />
  );
};
