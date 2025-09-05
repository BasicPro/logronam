"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Header } from "../../../components/layout/Header";
import { Footer } from "../../../components/layout/Footer";
import { PintxoCard } from "../../../components/pintxo/PintxoCard";
import {
  getPintxos,
  getCategories,
  getPriceRange,
  getPintxoVariationsBase,
} from "../../../lib/pintxos";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import { Grid, List, Search, Filter } from "lucide-react";

export default function PintxosPage() {
  const { t } = useTranslation("common");
  const params = useParams();
  const currentLocale = params.locale as string;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popularity"); // 'popularity', 'name', 'price', 'bars'
  const [filterByCategory, setFilterByCategory] = useState("");
  const [filterByBar, setFilterByBar] = useState("");
  const [filterByPriceRange, setFilterByPriceRange] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [pintxos, setPintxos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load pintxos data
  useEffect(() => {
    const loadPintxos = async () => {
      try {
        const data = await getPintxos(currentLocale as any);
        setPintxos(data);
      } catch (error) {
        console.error("Failed to load pintxos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPintxos();
  }, [currentLocale]);

  const filteredAndSortedPintxos = useMemo(() => {
    const filtered = pintxos.filter((pintxo) => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          pintxo.name.toLowerCase().includes(searchLower) ||
          pintxo.description.toLowerCase().includes(searchLower) ||
          (Array.isArray(pintxo.ingredients) &&
            pintxo.ingredients.some((ingredient) =>
              ingredient.toLowerCase().includes(searchLower)
            )) ||
          (Array.isArray(pintxo.tags) &&
            pintxo.tags.some((tag) =>
              tag.toLowerCase().includes(searchLower)
            ));

        if (!matchesSearch) return false;
      }

      // Category filter
      if (filterByCategory && pintxo.category !== filterByCategory)
        return false;

      // Bar filter
      if (filterByBar) {
        const variations = getPintxoVariationsBase().filter(v => v.pintxoId === pintxo.id);
        const hasBar = variations.some(variation => variation.barId === filterByBar);
        if (!hasBar) return false;
      }

      // Price range filter
      if (filterByPriceRange) {
        const [min, max] = filterByPriceRange.split("-").map(Number);
        const variations = getPintxoVariationsBase().filter(v => v.pintxoId === pintxo.id);
        const hasPriceInRange = variations.some(variation => 
          variation.price >= min && variation.price <= max
        );
        if (!hasPriceInRange) return false;
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          // Sort by average price
          const variationsA = getPintxoVariationsBase().filter(v => v.pintxoId === a.id);
          const variationsB = getPintxoVariationsBase().filter(v => v.pintxoId === b.id);
          const avgPriceA = variationsA.reduce((sum, v) => sum + v.price, 0) / variationsA.length;
          const avgPriceB = variationsB.reduce((sum, v) => sum + v.price, 0) / variationsB.length;
          return avgPriceA - avgPriceB;
        case "bars":
          const barsA = getPintxoVariationsBase().filter(v => v.pintxoId === a.id).length;
          const barsB = getPintxoVariationsBase().filter(v => v.pintxoId === b.id).length;
          return barsB - barsA;
        case "popularity":
        default:
          return b.popularity - a.popularity;
      }
    });

    return filtered;
  }, [
    pintxos,
    searchTerm,
    sortBy,
    filterByCategory,
    filterByBar,
    filterByPriceRange,
    currentLocale,
  ]);

  // Get unique bars for filter dropdown
  const uniqueBars = useMemo(() => {
    const barIds = new Set<string>();
    getPintxoVariationsBase().forEach((variation) => barIds.add(variation.barId));
    return Array.from(barIds).map((id) => ({
      id,
      name: `Bar ${id.split("-").pop()}`,
    }));
  }, []);

  const clearFilters = () => {
    setSearchTerm("");
    setSortBy("popularity");
    setFilterByCategory("");
    setFilterByBar("");
    setFilterByPriceRange("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("pintxos.title")}
          </h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            {t("pintxos.subtitle")}
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder={t("pintxos.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Sort */}
            <Select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="w-[180px]"
            >
              <option value="popularity">
                {t("pintxos.popularity")}
              </option>
              <option value="name">{t("pintxos.name")}</option>
              <option value="price">{t("pintxos.price")}</option>
              <option value="bars">{t("pintxos.bars")}</option>
            </Select>

            {/* View Mode */}
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "primary" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "primary" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Select
              value={filterByCategory}
              onChange={(e) => setFilterByCategory(e.target.value)}
              className="w-[180px]"
            >
              <option value="">{t("pintxos.allCategories")}</option>
              <option value="traditional">
                {t("pintxos.traditional")}
              </option>
              <option value="modern">{t("pintxos.modern")}</option>
              <option value="fusion">{t("pintxos.fusion")}</option>
              <option value="vegetarian">
                {t("pintxos.vegetarian")}
              </option>
              <option value="seafood">{t("pintxos.seafood")}</option>
              <option value="meat">{t("pintxos.meat")}</option>
            </Select>

            <Select
              value={filterByBar}
              onChange={(e) => setFilterByBar(e.target.value)}
              className="w-[180px]"
            >
              <option value="">{t("pintxos.allBars")}</option>
              {uniqueBars.map((bar) => (
                <option key={bar.id} value={bar.id}>
                  {bar.name}
                </option>
              ))}
            </Select>

            <Select
              value={filterByPriceRange}
              onChange={(e) => setFilterByPriceRange(e.target.value)}
              className="w-[180px]"
            >
              <option value="">{t("pintxos.allPriceRanges")}</option>
              <option value="0-2">€0 - €2</option>
              <option value="2-3">€2 - €3</option>
              <option value="3-4">€3 - €4</option>
              <option value="4-5">€4 - €5</option>
            </Select>

            <Button onClick={clearFilters} variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              {t("pintxos.clearFilters")}
            </Button>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {t("pintxos.results", { count: filteredAndSortedPintxos.length })}
            </p>
          </div>
        </div>
      </section>

      {/* Pintxos List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">Loading pintxos...</p>
            </div>
          ) : filteredAndSortedPintxos.length > 0 ? (
            <div
              className={`grid gap-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredAndSortedPintxos.map((pintxo) => (
                <PintxoCard key={pintxo.id} pintxo={pintxo} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t("pintxos.noResults.title")}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {t("pintxos.noResults.description")}
              </p>
              <Button onClick={clearFilters}>
                {t("pintxos.noResults.clearFilters")}
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
