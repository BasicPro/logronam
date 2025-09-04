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
    // Dynamic import of the variation locale file
    const variationData = await import(`../public/locales/${locale}/pintxo-variations.json`);
    const variationMap = variationData.default || variationData;
    
    // Cache the result
    variationCache.set(locale, variationMap);
    return variationMap;
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
    // Dynamic import of the common file
    const commonData = await import(`../public/locales/${locale}/common.json`);
    const common = commonData.default || commonData;
    
    // Cache the result
    commonCache.set(locale, common);
    return common;
  } catch (error) {
    console.warn(`Failed to load common translations for ${locale}, falling back to ${DEFAULT_LOCALE}`);
    
    // If the requested locale fails, try to load the default locale
    if (locale !== DEFAULT_LOCALE) {
      return loadCommonTranslations(DEFAULT_LOCALE);
    }
    
    // If even the default locale fails, return empty object
    return {};
  }
}

/**
 * Merge base pintxo data with translations
 */
function mergePintxo(base: PintxoBase, translations: PintxoI18n, common: any): Pintxo {
  // Translate ingredients
  const translatedIngredients = base.ingredients.map(ingredientId => 
    common.ingredients?.[ingredientId] || ingredientId
  );

  // Translate tags
  const translatedTags = base.tags.map(tagId => 
    common.tags?.[tagId] || tagId
  );

  return {
    ...base,
    ...translations,
    ingredients: translatedIngredients,
    tags: translatedTags,
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
export async function getPintxos(locale: Locale): Promise<Pintxo[]> {
  const [localeMap, common] = await Promise.all([
    loadLocaleMap(locale),
    loadCommonTranslations(locale)
  ]);
  
  return pintxosBase.map(base => {
    const translations = localeMap[base.id];
    if (!translations) {
      console.warn(`Missing translations for pintxo ${base.id} in locale ${locale}`);
      // Return base data with empty translations as fallback
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
      };
    }
    return mergePintxo(base, translations, common);
  });
}

/**
 * Get a specific pintxo by ID and locale
 */
export async function getPintxoById(id: string, locale: Locale): Promise<Pintxo | undefined> {
  const base = pintxosBase.find(p => p.id === id);
  if (!base) return undefined;

  const [localeMap, common] = await Promise.all([
    loadLocaleMap(locale),
    loadCommonTranslations(locale)
  ]);
  
  const translations = localeMap[id];
  
  if (!translations) {
    console.warn(`Missing translations for pintxo ${id} in locale ${locale}`);
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
    };
  }

  return mergePintxo(base, translations, common);
}

/**
 * Get all pintxo variations for a specific pintxo
 */
export async function getPintxoVariations(pintxoId: string, locale: Locale): Promise<PintxoVariation[]> {
  const variationBases = pintxoVariationsBase.filter(v => v.pintxoId === pintxoId);
  const variationMap = await loadVariationLocaleMap(locale);
  
  return variationBases.map(base => {
    const translations = variationMap[base.id];
    if (!translations) {
      console.warn(`Missing translations for variation ${base.id} in locale ${locale}`);
      return {
        ...base,
        review: '',
      };
    }
    return mergeVariation(base, translations);
  });
}

/**
 * Get a specific pintxo variation by ID
 */
export async function getPintxoVariationById(id: string, locale: Locale): Promise<PintxoVariation | undefined> {
  const base = pintxoVariationsBase.find(v => v.id === id);
  if (!base) return undefined;

  const variationMap = await loadVariationLocaleMap(locale);
  const translations = variationMap[id];
  
  if (!translations) {
    console.warn(`Missing translations for variation ${id} in locale ${locale}`);
    return {
      ...base,
      review: '',
    };
  }

  return mergeVariation(base, translations);
}

/**
 * Get all pintxos served at a specific bar
 */
export async function getPintxosByBar(barId: string, locale: Locale): Promise<Pintxo[]> {
  const allPintxos = await getPintxos(locale);
  const barVariations = pintxoVariationsBase.filter(v => v.barId === barId);
  const pintxoIds = [...new Set(barVariations.map(v => v.pintxoId))];
  
  return allPintxos.filter(pintxo => pintxoIds.includes(pintxo.id));
}

/**
 * Get all pintxos in a specific category
 */
export async function getPintxosByCategory(category: Pintxo['category'], locale: Locale): Promise<Pintxo[]> {
  const allPintxos = await getPintxos(locale);
  return allPintxos.filter(pintxo => pintxo.category === category);
}

/**
 * Get all pintxos within a price range
 */
export async function getPintxosByPriceRange(min: number, max: number, locale: Locale): Promise<Pintxo[]> {
  const allPintxos = await getPintxos(locale);
  return allPintxos.filter(pintxo => {
    const variations = pintxoVariationsBase.filter(v => v.pintxoId === pintxo.id);
    return variations.some(variation => 
      variation.price >= min && variation.price <= max
    );
  });
}

/**
 * Search pintxos by query (name, description, ingredients, tags)
 */
export async function searchPintxos(query: string, locale: Locale): Promise<Pintxo[]> {
  const allPintxos = await getPintxos(locale);
  const lowerQuery = query.toLowerCase();
  
  return allPintxos.filter(pintxo => {
    return (
      pintxo.name.toLowerCase().includes(lowerQuery) ||
      pintxo.description.toLowerCase().includes(lowerQuery) ||
      pintxo.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(lowerQuery)
      ) ||
      pintxo.tags.some(tag => 
        tag.toLowerCase().includes(lowerQuery)
      )
    );
  });
}

/**
 * Get all available categories
 */
export function getCategories(): Pintxo['category'][] {
  return ['traditional', 'modern', 'fusion', 'vegetarian', 'seafood', 'meat'];
}

/**
 * Get price range (min, max) from all pintxos across all variations
 */
export function getPriceRange(): { min: number; max: number } {
  const prices = pintxoVariationsBase.map(v => v.price);
  
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

/**
 * Get all base pintxo data (for internal use)
 */
export function getPintxosBase(): PintxoBase[] {
  return pintxosBase;
}

/**
 * Get all base pintxo variation data (for internal use)
 */
export function getPintxoVariationsBase(): PintxoVariationBase[] {
  return pintxoVariationsBase;
}
