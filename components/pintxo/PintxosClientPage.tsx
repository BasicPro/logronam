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

  // Create a mapping from tag keys to their translated names
  const tagKeyToTranslatedMap: Record<string, string> = {
    traditional: t("tags.traditional"),
    modern: t("tags.modern"),
    fusion: t("tags.fusion"),
    vegetarian: t("tags.vegetarian"),
    seafood: t("tags.seafood"),
    meat: t("tags.meat"),
    popular: t("tags.popular"),
    spicy: t("tags.spicy"),
  };

  // Filter options for pintxos
  const filterOptions = [
    {
      key: "tags",
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
      type: "range" as const,
    },
  ];

  // Sort options for pintxos
  const sortOptions = [
    { value: "popularity", label: t("common.popularity") },
    { value: "name", label: t("common.name") },
    { value: "rating", label: t("common.rating") },
  ];

  // Custom filter function to handle tag key to translated name mapping
  const customFilterFunction = (
    item: Pintxo,
    key: string,
    value: string
  ): boolean => {
    if (key === "tags") {
      // Convert tag key to translated name and check if it exists in the item's tags
      const translatedValue = tagKeyToTranslatedMap[value];
      return item.tags.includes(translatedValue);
    }

    // For other filters, use default logic
    const itemValue = item[key as keyof Pintxo];

    // Handle string values
    if (typeof itemValue === "string") {
      return itemValue === value;
    }

    // Handle array values
    if (Array.isArray(itemValue)) {
      return itemValue.includes(value);
    }

    // Handle number values (for price ranges)
    if (typeof itemValue === "number") {
      const [min, max] = value.split("-").map(Number);
      return itemValue >= min && itemValue <= max;
    }

    // Handle object values (for priceRange objects)
    if (typeof itemValue === "object" && itemValue !== null) {
      if (key === "priceRange" && "min" in itemValue && "max" in itemValue) {
        const [filterMin, filterMax] = value.split("-").map(Number);
        const itemMin = (itemValue as any).min;
        const itemMax = (itemValue as any).max;
        return itemMin <= filterMax && itemMax >= filterMin;
      }
    }

    return false;
  };

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
      customFilterFunction={customFilterFunction}
    />
  );
};
