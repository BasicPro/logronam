import { barsBase } from "../data/bars";
import { Bar, BarBase, BarI18n, BarLocaleMap } from "../types/bar";
import { Locale } from "../types/common";
import { getTranslations } from "./i18n-server";

// Cache for loaded locale maps
const localeCache = new Map<Locale, BarLocaleMap>();

/**
 * Load locale map for a specific language using i18n-server
 */
async function loadLocaleMap(locale: Locale): Promise<BarLocaleMap> {
  // Check cache first
  if (localeCache.has(locale)) {
    return localeCache.get(locale)!;
  }

  // Use i18n-server to get translations
  const translations = await getTranslations(locale, "bars");

  // Cache the result
  localeCache.set(locale, translations);
  return translations;
}

/**
 * Merge base bar data with translations
 */
function mergeBar(base: BarBase, translations: BarI18n): Bar {
  return {
    ...base,
    ...translations,
  };
}

/**
 * Get all bars for a specific locale
 */
export async function getBars(locale: Locale): Promise<Bar[]> {
  const localeMap = await loadLocaleMap(locale);

  return barsBase.map((base) => {
    const translations = localeMap[base.id];
    if (!translations) {
      console.warn(
        `Missing translations for bar ${base.id} in locale ${locale}`
      );
      // Return base data with empty translations as fallback
      return {
        ...base,
        name: base.id,
        description: "",
        review: "",
      };
    }
    return mergeBar(base, translations);
  });
}

/**
 * Get a specific bar by ID and locale
 */
export async function getBarById(
  id: string,
  locale: Locale
): Promise<Bar | undefined> {
  const base = barsBase.find((b) => b.id === id);
  if (!base) return undefined;

  const localeMap = await loadLocaleMap(locale);
  const translations = localeMap[id];

  if (!translations) {
    console.warn(`Missing translations for bar ${id} in locale ${locale}`);
    return {
      ...base,
      name: base.id,
      description: "",
      review: "",
    };
  }

  return mergeBar(base, translations);
}

/**
 * Get bars by IDs for a specific locale
 */
export async function getBarsByIds(
  barIds: string[],
  locale: Locale
): Promise<Bar[]> {
  const allBars = await getBars(locale);
  return allBars.filter((bar) => barIds.includes(bar.id));
}

/**
 * Get all bars in a specific category
 */
export async function getBarsByCategory(
  category: Bar["category"],
  locale: Locale
): Promise<Bar[]> {
  const allBars = await getBars(locale);
  return allBars.filter((bar) => bar.category === category);
}

/**
 * Get all bars in a specific neighborhood
 */
export async function getBarsByNeighborhood(
  neighborhood: string,
  locale: Locale
): Promise<Bar[]> {
  const allBars = await getBars(locale);
  return allBars.filter((bar) => bar.location.neighborhood === neighborhood);
}

/**
 * Get top rated bars
 */
export async function getTopRatedBars(
  limit: number = 10,
  locale: Locale
): Promise<Bar[]> {
  const allBars = await getBars(locale);
  return allBars.sort((a, b) => b.rating - a.rating).slice(0, limit);
}

/**
 * Search bars by query (name, description, features)
 */
export async function searchBars(
  query: string,
  locale: Locale
): Promise<Bar[]> {
  const allBars = await getBars(locale);
  const lowerQuery = query.toLowerCase();

  return allBars.filter((bar) => {
    return (
      bar.name.toLowerCase().includes(lowerQuery) ||
      bar.description.toLowerCase().includes(lowerQuery)
    );
  });
}

/**
 * Get all available categories
 */
export function getCategories(): Bar["category"][] {
  return ["bar", "restaurant", "taberna", "bodega"];
}

/**
 * Get all base bar data (for internal use)
 */
export function getBarsBase(): BarBase[] {
  return barsBase;
}
