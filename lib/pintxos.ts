import { pintxosBase } from '../data/pintxos';
import { pintxoVariationsBase } from '../data/pintxoVariations';
import { Pintxo, PintxoBase, PintxoI18n, PintxoLocaleMap, Locale, PintxoVariation, PintxoVariationBase, PintxoVariationI18n, PintxoVariationLocaleMap } from '../types/pintxo';

const DEFAULT_LOCALE: Locale = 'es';

// Cache for loaded locale maps
const localeCache = new Map<Locale, PintxoLocaleMap>();
const commonCache = new Map<Locale, any>();
const variationCache = new Map<Locale, PintxoVariationLocaleMap>();

/**
 * Load locale map for a specific language
 */
async function loadLocaleMap(locale: Locale): Promise<PintxoLocaleMap> {
  // Check cache first
  if (localeCache.has(locale)) {
    return localeCache.get(locale)!;
  }

  try {
    // Dynamic import of the locale file
    const localeData = await import(`../public/locales/${locale}/pintxos.json`);
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
 * Load variation translations for a specific language
 */
async function loadVariationLocaleMap(locale: Locale): Promise<PintxoVariationLocaleMap> {
  // Check cache first
  if (variationCache.has(locale)) {
    return variationCache.get(locale)!;
  }

  try {
    // Dynamic import of the locale file - using correct filename
    const localeData = await import(`../public/locales/${locale}/pintxo-variations.json`);
    const localeMap = localeData.default || localeData;
    
    // Cache the result
    variationCache.set(locale, localeMap);
    return localeMap;
  } catch (error) {
    console.warn(`Failed to load variation locale ${locale}, falling back to ${DEFAULT_LOCALE}`);
    
    // If the requested locale fails, try to load the default locale
    if (locale !== DEFAULT_LOCALE) {
      return loadVariationLocaleMap(DEFAULT_LOCALE);
    }
    
    // If even the default locale fails, return empty map
    return {};
  }
}

/**
 * Load common translations for a specific language
 */
async function loadCommonTranslations(locale: Locale): Promise<any> {
  // Check cache first
  if (commonCache.has(locale)) {
    return commonCache.get(locale)!;
  }

  try {
    // Dynamic import of the locale file
    const localeData = await import(`../public/locales/${locale}/common.json`);
    const common = localeData.default || localeData;
    
    // Cache the result
    commonCache.set(locale, common);
    return common;
  } catch (error) {
    console.warn(`Failed to load common locale ${locale}, falling back to ${DEFAULT_LOCALE}`);
    
    // If the requested locale fails, try to load the default locale
    if (locale !== DEFAULT_LOCALE) {
      return loadCommonTranslations(DEFAULT_LOCALE);
    }
    
    // If even the default locale fails, return empty object
    return {};
  }
}

/**
 * Calculate price and rating ranges for a pintxo from its variations
 */
function calculatePintxoRanges(pintxoId: string): { priceRange: { min: number; max: number } | null; ratingRange: { min: number; max: number } | null; image: string | null } {
  const variations = pintxoVariationsBase.filter(v => v.pintxoId === pintxoId);
  
  if (variations.length === 0) {
    return { priceRange: null, ratingRange: null, image: null };
  }

  const prices = variations.map(v => v.price);
  const ratings = variations.map(v => v.rating);
  
  return {
    priceRange: {
      min: Math.min(...prices),
      max: Math.max(...prices)
    },
    ratingRange: {
      min: Math.min(...ratings),
      max: Math.max(...ratings)
    },
    image: variations[0]?.image || null
  };
}

/**
 * Merge base pintxo data with translations and add calculated ranges
 */
function mergePintxo(base: PintxoBase, translations: PintxoI18n, common: any): Pintxo & { priceRange: { min: number; max: number } | null; ratingRange: { min: number; max: number } | null; image: string | null } {
  // Translate ingredients
  const translatedIngredients = base.ingredients.map(ingredientId => 
    common.ingredients?.[ingredientId] || ingredientId
  );

  // Translate tags
  const translatedTags = base.tags.map(tagId => 
    common.tags?.[tagId] || tagId
  );

  // Calculate price and rating ranges from variations
  const { priceRange, ratingRange, image } = calculatePintxoRanges(base.id);

  return {
    ...base,
    ...translations,
    ingredients: translatedIngredients,
    tags: translatedTags,
    priceRange,
    ratingRange,
    image,
  };
}

/**
 * Merge base pintxo variation data with translations
 */
function mergeVariation(base: PintxoVariationBase, translations: PintxoVariationI18n): PintxoVariation {
  return {
    ...base,
    ...translations,
  };
}

/**
 * Get all pintxos for a specific locale
 */
export async function getPintxos(locale: Locale): Promise<(Pintxo & { priceRange: { min: number; max: number } | null; ratingRange: { min: number; max: number } | null; image: string | null })[]> {
  const [localeMap, common] = await Promise.all([
    loadLocaleMap(locale),
    loadCommonTranslations(locale)
  ]);
  
  return pintxosBase.map(base => {
    const translations = localeMap[base.id];
    if (!translations) {
      console.warn(`Missing translations for pintxo ${base.id} in locale ${locale}`);
      // Return base data with empty translations as fallback
      const { priceRange, ratingRange, image } = calculatePintxoRanges(base.id);
      return {
        ...base,
        name: base.id,
        description: '',
        ingredients: base.ingredients.map(ingredientId => 
          common.ingredients?.[ingredientId] || ingredientId
        ),
        tags: base.tags.map(tagId => 
          common.tags?.[tagId] || tagId
        ),
        priceRange,
        ratingRange,
        image,
      };
    }
    return mergePintxo(base, translations, common);
  });
}

/**
 * Get a specific pintxo by ID and locale
 */
export async function getPintxoById(id: string, locale: Locale): Promise<(Pintxo & { priceRange: { min: number; max: number } | null; ratingRange: { min: number; max: number } | null; image: string | null }) | undefined> {
  const base = pintxosBase.find(p => p.id === id);
  if (!base) return undefined;

  const [localeMap, common] = await Promise.all([
    loadLocaleMap(locale),
    loadCommonTranslations(locale)
  ]);
  
  const translations = localeMap[id];
  
  if (!translations) {
    console.warn(`Missing translations for pintxo ${id} in locale ${locale}`);
    const { priceRange, ratingRange, image } = calculatePintxoRanges(id);
    return {
      ...base,
      name: base.id,
      description: '',
      ingredients: base.ingredients.map(ingredientId => 
        common.ingredients?.[ingredientId] || ingredientId
      ),
      tags: base.tags.map(tagId => 
        common.tags?.[tagId] || tagId
      ),
      priceRange,
      ratingRange,
      image,
    };
  }
  
  return mergePintxo(base, translations, common);
}

/**
 * Get all pintxo variations for a specific pintxo and locale
 */
export async function getPintxoVariations(pintxoId: string, locale: Locale): Promise<PintxoVariation[]> {
  const [variationLocaleMap, common] = await Promise.all([
    loadVariationLocaleMap(locale),
    loadCommonTranslations(locale)
  ]);
  
  const variations = pintxoVariationsBase.filter(v => v.pintxoId === pintxoId);
  
  return variations.map(variation => {
    const translations = variationLocaleMap[variation.id];
    if (!translations) {
      console.warn(`Missing variation translations for ${variation.id} in locale ${locale}`);
      return {
        ...variation,
        review: '',
      };
    }
    return mergeVariation(variation, translations);
  });
}

/**
 * Get all pintxos for a specific bar
 */
export async function getPintxosByBar(barId: string, locale: Locale): Promise<Pintxo[]> {
  const pintxos = await getPintxos(locale);
  const barVariations = pintxoVariationsBase.filter(v => v.barId === barId);
  const barPintxoIds = new Set(barVariations.map(v => v.pintxoId));
  
  return pintxos.filter(pintxo => barPintxoIds.has(pintxo.id));
}

/**
 * Get all pintxos for a specific category
 */
export async function getPintxosByCategory(category: Pintxo['category'], locale: Locale): Promise<Pintxo[]> {
  const pintxos = await getPintxos(locale);
  return pintxos.filter(pintxo => pintxo.category === category);
}

/**
 * Get all pintxos within a specific price range
 */
export async function getPintxosByPriceRange(min: number, max: number, locale: Locale): Promise<Pintxo[]> {
  const pintxos = await getPintxos(locale);
  return pintxos.filter(pintxo => {
    if (!pintxo.priceRange) return false;
    return pintxo.priceRange.min >= min && pintxo.priceRange.max <= max;
  });
}

/**
 * Get all pintxos within a specific rating range
 */
export async function getPintxosByRatingRange(min: number, max: number, locale: Locale): Promise<Pintxo[]> {
  const pintxos = await getPintxos(locale);
  return pintxos.filter(pintxo => {
    if (!pintxo.ratingRange) return false;
    return pintxo.ratingRange.min >= min && pintxo.ratingRange.max <= max;
  });
}

/**
 * Get all pintxos that match a search term
 */
export async function searchPintxos(searchTerm: string, locale: Locale): Promise<Pintxo[]> {
  const pintxos = await getPintxos(locale);
  const term = searchTerm.toLowerCase();
  
  return pintxos.filter(pintxo => 
    pintxo.name.toLowerCase().includes(term) ||
    pintxo.description.toLowerCase().includes(term) ||
    pintxos.ingredients.some(ingredient => ingredient.toLowerCase().includes(term)) ||
    pintxos.tags.some(tag => tag.toLowerCase().includes(term))
  );
}

/**
 * Get all pintxos sorted by a specific criteria
 */
export async function getPintxosSorted(sortBy: 'name' | 'rating' | 'price' | 'popularity', locale: Locale): Promise<Pintxo[]> {
  const pintxos = await getPintxos(locale);
  
  return pintxos.sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rating':
        const aRating = a.ratingRange?.min || 0;
        const bRating = b.ratingRange?.min || 0;
        return bRating - aRating;
      case 'price':
        const aPrice = a.priceRange?.min || 0;
        const bPrice = b.priceRange?.min || 0;
        return aPrice - bPrice;
      case 'popularity':
        return b.popularity - a.popularity;
      default:
        return 0;
    }
  });
}

/**
 * Get all base pintxos (for admin or internal use)
 */
export function getPintxosBase(): PintxoBase[] {
  return pintxosBase;
}

/**
 * Get all base pintxo variations (for admin or internal use)
 */
export function getPintxoVariationsBase(): PintxoVariationBase[] {
  return pintxoVariationsBase;
}

/**
 * Get a specific pintxo variation by ID and locale
 */
export async function getPintxoVariationById(id: string, locale: Locale): Promise<PintxoVariation | undefined> {
  const base = pintxoVariationsBase.find(v => v.id === id);
  if (!base) return undefined;

  const [variationLocaleMap, common] = await Promise.all([
    loadVariationLocaleMap(locale),
    loadCommonTranslations(locale)
  ]);
  
  const translations = variationLocaleMap[id];
  
  if (!translations) {
    console.warn(`Missing variation translations for ${id} in locale ${locale}`);
    return {
      ...base,
      review: '',
    };
  }
  
  return mergeVariation(base, translations);
}
