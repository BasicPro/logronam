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
  getDifficulties,
  getPriceRange,
} from "../../../lib/pintxos";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/Select";
import { Grid, List, Search, Filter } from "lucide-react";

export default function PintxosPage() {
  const { t } = useTranslation("common");
  const params = useParams();
  const currentLocale = params.locale as string;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popularity"); // 'popularity', 'name', 'price', 'bars'
  const [filterByCategory, setFilterByCategory] = useState("");
  const [filterByBar, setFilterByBar] = useState("");
  const [filterByDifficulty, setFilterByDifficulty] = useState("");
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

  // Helper function to get localized text
  const getLocalizedText = (
    text: string | Record<string, string | string[]>,
    locale: string
  ): string | string[] => {
    if (typeof text === "string") return text;
    if (typeof text === "object" && text[locale]) return text[locale];
    return text.es || text.en || Object.values(text)[0] || "";
  };

  const filteredAndSortedPintxos = useMemo(() => {
    const filtered = pintxos.filter((pintxo) => {
      // Search filter
      if (searchTerm) {
        const localizedName = getLocalizedText(
          pintxo.name,
          currentLocale
        ) as string;
        const localizedDescription = getLocalizedText(
          pintxo.description,
          currentLocale
        ) as string;
        const localizedIngredients = getLocalizedText(
          pintxo.ingredients,
          currentLocale
        ) as string[];
        const localizedTags = getLocalizedText(
          pintxo.tags,
          currentLocale
        ) as string[];

        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          localizedName.toLowerCase().includes(searchLower) ||
          localizedDescription.toLowerCase().includes(searchLower) ||
          (Array.isArray(localizedIngredients) &&
            localizedIngredients.some((ingredient) =>
              ingredient.toLowerCase().includes(searchLower)
            )) ||
          (Array.isArray(localizedTags) &&
            localizedTags.some((tag) =>
              tag.toLowerCase().includes(searchLower)
            ));

        if (!matchesSearch) return false;
      }

      // Category filter
      if (filterByCategory && pintxo.category !== filterByCategory)
        return false;

      // Bar filter
      if (filterByBar && !pintxo.bars.includes(filterByBar)) return false;

      // Difficulty filter
      if (filterByDifficulty && pintxo.difficulty !== filterByDifficulty)
        return false;

      // Price range filter
      if (filterByPriceRange) {
        const [min, max] = filterByPriceRange.split("-").map(Number);
        if (pintxo.price < min || pintxo.price > max) return false;
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          const nameA = getLocalizedText(a.name, currentLocale) as string;
          const nameB = getLocalizedText(b.name, currentLocale) as string;
          return nameA.localeCompare(nameB);
        case "price":
          return a.price - b.price;
        case "bars":
          return b.bars.length - a.bars.length;
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
    filterByDifficulty,
    filterByPriceRange,
    currentLocale,
  ]);

  // Get unique bars for filter dropdown
  const uniqueBars = useMemo(() => {
    const barIds = new Set<string>();
    pintxos.forEach((pintxo) =>
      pintxo.bars.forEach((id: string) => barIds.add(id))
    );
    return Array.from(barIds).map((id) => ({
      id,
      name: `Bar ${id.split("-").pop()}`,
    }));
  }, [pintxos]);

  const clearFilters = () => {
    setSearchTerm("");
    setSortBy("popularity");
    setFilterByCategory("");
    setFilterByBar("");
    setFilterByDifficulty("");
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
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("pintxos.sortBy")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">
                  {t("pintxos.popularity")}
                </SelectItem>
                <SelectItem value="name">{t("pintxos.name")}</SelectItem>
                <SelectItem value="price">{t("pintxos.price")}</SelectItem>
                <SelectItem value="bars">{t("pintxos.bars")}</SelectItem>
              </SelectContent>
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
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("pintxos.category")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t("pintxos.allCategories")}</SelectItem>
                <SelectItem value="traditional">
                  {t("pintxos.traditional")}
                </SelectItem>
                <SelectItem value="modern">{t("pintxos.modern")}</SelectItem>
                <SelectItem value="fusion">{t("pintxos.fusion")}</SelectItem>
                <SelectItem value="vegetarian">
                  {t("pintxos.vegetarian")}
                </SelectItem>
                <SelectItem value="seafood">{t("pintxos.seafood")}</SelectItem>
                <SelectItem value="meat">{t("pintxos.meat")}</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filterByBar}
              onChange={(e) => setFilterByBar(e.target.value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("pintxos.bar")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t("pintxos.allBars")}</SelectItem>
                {uniqueBars.map((bar) => (
                  <SelectItem key={bar.id} value={bar.id}>
                    {bar.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filterByDifficulty}
              onChange={(e) => setFilterByDifficulty(e.target.value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("pintxos.difficulty")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t("pintxos.allDifficulties")}</SelectItem>
                <SelectItem value="easy">{t("pintxos.easy")}</SelectItem>
                <SelectItem value="medium">{t("pintxos.medium")}</SelectItem>
                <SelectItem value="hard">{t("pintxos.hard")}</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filterByPriceRange}
              onChange={(e) => setFilterByPriceRange(e.target.value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("pintxos.priceRange")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t("pintxos.allPrices")}</SelectItem>
                <SelectItem value="0-2">€0 - €2</SelectItem>
                <SelectItem value="2-3">€2 - €3</SelectItem>
                <SelectItem value="3-4">€3 - €4</SelectItem>
                <SelectItem value="4-5">€4 - €5</SelectItem>
              </SelectContent>
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
