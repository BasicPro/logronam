"use client";

import React from "react";
import { Search } from "lucide-react";
import { Button } from "./Button";
import { BarCard } from "../bar/BarCard";
import { PintxoCard } from "../pintxo/PintxoCard";
import { BarListCard } from "../bar/BarListCard";
import { PintxoListCard } from "../pintxo/PintxoListCard";
import { RankingItem } from "../../types/rankingItem";

interface FilteredItemsGridProps<T> {
  items: T[];
  viewMode: "grid" | "list";
  renderItem?: (item: T, viewMode?: "grid" | "list") => React.ReactNode;
  noResultsMessage?: string;
  onClearFilters?: () => void;
  className?: string;
}

export function FilteredItemsGrid<T>({
  items,
  viewMode,
  renderItem,
  noResultsMessage = "No results found",
  onClearFilters,
  className = "",
}: FilteredItemsGridProps<T>) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <Search className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {noResultsMessage}
        </h3>
        <p className="text-gray-600 mb-6">Try adjusting your search filters</p>
        {onClearFilters && (
          <Button variant="outline" onClick={onClearFilters}>
            Clear filters
          </Button>
        )}
      </div>
    );
  }

  // If renderItem is provided, use it (for custom rendering like rankings)
  if (renderItem) {
    return (
      <div
        className={`grid gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        } ${className}`}
      >
        {items.map((item, index) => (
          <div key={index}>{renderItem(item, viewMode)}</div>
        ))}
      </div>
    );
  }

  // Auto-detect item type and use appropriate component
  const renderAutoItem = (item: T) => {
    const itemWithType = item as RankingItem;

    if (itemWithType.__typename === "Bar") {
      return viewMode === "grid" ? (
        <BarCard key={itemWithType.id} bar={itemWithType} />
      ) : (
        <BarListCard key={itemWithType.id} bar={itemWithType} />
      );
    } else if (itemWithType.__typename === "Pintxo") {
      return viewMode === "grid" ? (
        <PintxoCard key={itemWithType.id} pintxo={itemWithType} />
      ) : (
        <PintxoListCard key={itemWithType.id} pintxo={itemWithType} />
      );
    }
  };

  return (
    <div
      className={`grid gap-6 ${
        viewMode === "grid"
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1"
      } ${className}`}
    >
      {items.map((item, index) => (
        <div key={index}>{renderAutoItem(item)}</div>
      ))}
    </div>
  );
}
