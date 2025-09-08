"use client";

import React, { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Button } from "./Button";
import { Input } from "./Input";
import { Select } from "./Select";
import { Grid, List, Search, Filter, X } from "lucide-react";
import { Bar } from "../../types/bar";
import { Pintxo } from "../../types/pintxo";
export interface FilterOption {
  key: string;
  label: string;
  type: "select" | "range" | "text";
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface SearchAndFilterProps<T extends Bar | Pintxo> {
  items: T[];
  searchFields: (keyof T)[];
  filterOptions: FilterOption[];
  sortOptions: { value: string; label: string }[];
  defaultSort: string;
  viewModes?: ("grid" | "list")[];
  defaultViewMode?: "grid" | "list";
  onFilteredItems: (items: T[]) => void;
  onViewModeChange?: (mode: "grid" | "list") => void;
  searchPlaceholder?: string;
  noResultsMessage?: string;
  className?: string;
  customFilterFunction?: (item: T, key: string, value: string) => boolean;
}

export function SearchAndFilter<T extends Bar | Pintxo>({
  items,
  searchFields,
  filterOptions,
  sortOptions,
  defaultSort,
  viewModes = ["grid", "list"],
  defaultViewMode = "grid",
  onFilteredItems,
  onViewModeChange,
  searchPlaceholder = "Search...",
  className = "",
  customFilterFunction,
}: SearchAndFilterProps<T>) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(defaultSort);
  const [viewMode, setViewMode] = useState<"grid" | "list">(defaultViewMode);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Update URL when filters change
  const updateURL = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    const currentPath = window.location.pathname;
    router.push(`${currentPath}?${params.toString()}`);
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL({ search: searchTerm });
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortBy(value);
    updateURL({ sort: value });
  };

  // Handle filter change
  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    updateURL({ [key]: value });
  };

  // Handle view mode change
  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
    updateURL({ view: mode });
    onViewModeChange?.(mode);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSortBy(defaultSort);
    setFilters({});
    setViewMode(defaultViewMode);
    router.push(window.location.pathname);
  };

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    let filtered = [...items];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        searchFields.some((field) => {
          const value = item[field];
          if (typeof value === "string") {
            return value.toLowerCase().includes(searchTerm.toLowerCase());
          }
          return false;
        })
      );
    }

    // Apply custom filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((item) => {
          // Use custom filter function if provided
          if (customFilterFunction) {
            return customFilterFunction(item, key, value);
          }

          const itemValue = (item as T)[key as keyof T];

          // Handle string values
          if (typeof itemValue === "string") {
            return itemValue === value;
          }

          // Handle array values (like tags)
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
            // For priceRange objects, check if the value matches the price range
            if (
              key === "priceRange" &&
              "min" in itemValue &&
              "max" in itemValue
            ) {
              const [filterMin, filterMax] = value.split("-").map(Number);
              const itemMin = (itemValue as any).min;
              const itemMax = (itemValue as any).max;

              // Check if the pintxo's price range overlaps with the filter range
              // A pintxo matches if its price range intersects with the filter range
              return itemMin <= filterMax && itemMax >= filterMin;
            }
          }

          return false;
        });
      }
    });

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
          return b.rating - a.rating;
        case "popularity":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [items, searchTerm, sortBy, filters, searchFields]);

  // Notify parent of filtered items
  React.useEffect(() => {
    onFilteredItems(filteredAndSortedItems);
  }, [filteredAndSortedItems, onFilteredItems]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Button type="submit" variant="outline">
          <Search className="w-4 h-4 mr-2" />
          {t("common.search")}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? (
            <X className="w-4 h-4 mr-2" />
          ) : (
            <Filter className="w-4 h-4 mr-2" />
          )}
          {t("common.filter")}
        </Button>
      </form>

      {/* Filters Panel */}
      {showFilters && (
        <div className="p-4 bg-gray-50 rounded-lg border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("common.sortBy")}
              </label>
              <Select
                value={sortBy}
                onValueChange={handleSortChange}
                options={sortOptions}
              />
            </div>

            {/* Custom Filters */}
            {filterOptions.map((filter) => (
              <div key={filter.key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {filter.label}
                </label>
                {filter.type === "select" && filter.options ? (
                  <Select
                    value={filters[filter.key] || ""}
                    onValueChange={(value) =>
                      handleFilterChange(filter.key, value)
                    }
                    options={[
                      { value: "", label: `All ${filter.label.toLowerCase()}` },
                      ...filter.options,
                    ]}
                  />
                ) : filter.type === "range" ? (
                  <Select
                    value={filters[filter.key] || ""}
                    onValueChange={(value) =>
                      handleFilterChange(filter.key, value)
                    }
                    options={[
                      { value: "", label: `All ${filter.label.toLowerCase()}` },
                      { value: "0-2", label: "0€ - 2€" },
                      { value: "2-3", label: "2€ - 3€" },
                      { value: "3-4", label: "3€ - 4€" },
                      { value: "5-999", label: "5€+" },
                    ]}
                  />
                ) : (
                  <Input
                    type="text"
                    placeholder={
                      filter.placeholder ||
                      `Filter by ${filter.label.toLowerCase()}`
                    }
                    value={filters[filter.key] || ""}
                    onChange={(e) =>
                      handleFilterChange(filter.key, e.target.value)
                    }
                  />
                )}
              </div>
            ))}

            {/* View Mode Toggle */}
            {viewModes.length > 1 && (
              <div className="flex items-end gap-2">
                {viewModes.includes("grid") && (
                  <Button
                    variant="outline"
                    onClick={() => handleViewModeChange("grid")}
                    className={viewMode === "grid" ? "bg-gray-200" : ""}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                )}
                {viewModes.includes("list") && (
                  <Button
                    variant="outline"
                    onClick={() => handleViewModeChange("list")}
                    className={viewMode === "list" ? "bg-gray-200" : ""}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                )}
              </div>
            )}

            {/* Clear Filters */}
            <div className="flex items-end">
              <Button variant="outline" onClick={clearFilters}>
                {t("common.clearFilters")}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        {filteredAndSortedItems.length}{" "}
        {filteredAndSortedItems.length === 1 ? "result" : "results"} found
      </div>
    </div>
  );
}
