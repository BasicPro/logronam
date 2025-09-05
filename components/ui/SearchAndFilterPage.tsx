"use client";

import React, { useState } from "react";
import { SearchAndFilter, FilterOption } from "./SearchAndFilter";
import { FilteredItemsGrid } from "./FilteredItemsGrid";

interface SearchAndFilterPageProps<T> {
  items: T[];
  searchFields: (keyof T)[];
  filterOptions: FilterOption[];
  sortOptions: { value: string; label: string }[];
  defaultSort: string;
  viewModes?: ('grid' | 'list')[];
  defaultViewMode?: 'grid' | 'list';
  renderItem?: (item: T) => React.ReactNode;
  searchPlaceholder?: string;
  noResultsMessage?: string;
  className?: string;
}

export function SearchAndFilterPage<T>({
  items,
  searchFields,
  filterOptions,
  sortOptions,
  defaultSort,
  viewModes = ['grid', 'list'],
  defaultViewMode = 'grid',
  renderItem,
  searchPlaceholder = "Search...",
  noResultsMessage = "No results found",
  className = "",
}: SearchAndFilterPageProps<T>) {
  const [filteredItems, setFilteredItems] = useState<T[]>(items);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(defaultViewMode);

  const handleFilteredItems = (items: T[]) => {
    setFilteredItems(items);
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
  };

  const handleClearFilters = () => {
    setFilteredItems(items);
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Search and Filter Component */}
      <SearchAndFilter
        items={items}
        searchFields={searchFields}
        filterOptions={filterOptions}
        sortOptions={sortOptions}
        defaultSort={defaultSort}
        viewModes={viewModes}
        defaultViewMode={defaultViewMode}
        onFilteredItems={handleFilteredItems}
        onViewModeChange={handleViewModeChange}
        searchPlaceholder={searchPlaceholder}
        noResultsMessage={noResultsMessage}
      />

      {/* Filtered Items Grid */}
      <FilteredItemsGrid
        items={filteredItems}
        viewMode={viewMode}
        renderItem={renderItem}
        noResultsMessage={noResultsMessage}
        onClearFilters={handleClearFilters}
      />
    </div>
  );
}
