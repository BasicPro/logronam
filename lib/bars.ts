import { barsBase } from '../data/bars';
import { Bar, BarBase, BarI18n, BarLocaleMap, Locale } from '../types/bar';

const DEFAULT_LOCALE: Locale = 'es';

// Cache for loaded locale maps
const localeCache = new Map<Locale, BarLocaleMap>();

/**
 * Load locale map for a specific language
 */
async function loadLocaleMap(locale: Locale): Promise<BarLocaleMap> {
  // Check cache first
  if (localeCache.has(locale)) {
    return localeCache.get(locale)!;
  }

  try {
    // Dynamic import of the locale file
    const localeData = await import(`../public/locales/${locale}/bars.json`);
    const localeMap = localeData.default || localeData;
    
    // Cache the result
    localeCache.set(locale, localeMap);
    return localeMap;
  } catch (error) {
    console.warn(`Failed to load locale ${locale}, falling back to ${DEFAULT_LOCALE}`);
    
    // If the requested locale fails, try to load the default locale
    if (locale !== DEFAULT_LOCALE) {
      return loadLocaleMap(DEFAULT_LOCALE);
    }
    
    // If even the default locale fails, return empty map
    return {};
  }
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
  
  return barsBase.map(base => {
    const translations = localeMap[base.id];
    if (!translations) {
      console.warn(`Missing translations for bar ${base.id} in locale ${locale}`);
      // Return base data with empty translations as fallback
      return {
        ...base,
        name: base.id,
        description: '',
      };
    }
    return mergeBar(base, translations);
  });
}

/**
 * Get a specific bar by ID and locale
 */
export async function getBarById(id: string, locale: Locale): Promise<Bar | undefined> {
  const base = barsBase.find(b => b.id === id);
  if (!base) return undefined;

  const localeMap = await loadLocaleMap(locale);
  const translations = localeMap[id];
  
  if (!translations) {
    console.warn(`Missing translations for bar ${id} in locale ${locale}`);
    return {
      ...base,
      name: base.id,
      description: '',
    };
  }

  return mergeBar(base, translations);
}

/**
 * Get bars by IDs for a specific locale
 */
export async function getBarsByIds(barIds: string[], locale: Locale): Promise<Bar[]> {
  const allBars = await getBars(locale);
  return allBars.filter(bar => barIds.includes(bar.id));
}

/**
 * Get all bars in a specific category
 */
export async function getBarsByCategory(category: Bar['category'], locale: Locale): Promise<Bar[]> {
  const allBars = await getBars(locale);
  return allBars.filter(bar => bar.category === category);
}

/**
 * Get all bars in a specific neighborhood
 */
export async function getBarsByNeighborhood(neighborhood: string, locale: Locale): Promise<Bar[]> {
  const allBars = await getBars(locale);
  return allBars.filter(bar => bar.location.neighborhood === neighborhood);
}

/**
 * Get top rated bars
 */
export async function getTopRatedBars(limit: number = 10, locale: Locale): Promise<Bar[]> {
  const allBars = await getBars(locale);
  return allBars.sort((a, b) => b.rating - a.rating).slice(0, limit);
}

/**
 * Search bars by query (name, description, features)
 */
export async function searchBars(query: string, locale: Locale): Promise<Bar[]> {
  const allBars = await getBars(locale);
  const lowerQuery = query.toLowerCase();
  
  return allBars.filter(bar => {
    return (
      bar.name.toLowerCase().includes(lowerQuery) ||
      bar.description.toLowerCase().includes(lowerQuery) ||
      bar.features.some(feature => 
        feature.toLowerCase().includes(lowerQuery)
      )
    );
  });
}

/**
 * Get all available categories
 */
export function getCategories(): Bar['category'][] {
  return ['bar', 'restaurant', 'taberna', 'bodega'];
}

/**
 * Get all base bar data (for internal use)
 */
export function getBarsBase(): BarBase[] {
  return barsBase;
}
