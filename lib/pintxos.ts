import { pintxosBase } from '../data/pintxos/base';
import { Pintxo, PintxoBase, PintxoI18n, PintxoLocaleMap, Locale } from '../types/pintxo';

const DEFAULT_LOCALE: Locale = 'es';

// Cache for loaded locale maps
const localeCache = new Map<Locale, PintxoLocaleMap>();
const commonCache = new Map<Locale, any>();

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
function merge(base: PintxoBase, translations: PintxoI18n, common: any): Pintxo {
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
    return merge(base, translations, common);
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

  return merge(base, translations, common);
}

/**
 * Get all pintxos served at a specific bar
 */
export async function getPintxosByBar(barId: string, locale: Locale): Promise<Pintxo[]> {
  const allPintxos = await getPintxos(locale);
  return allPintxos.filter(pintxo => pintxo.bars.includes(barId));
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
  return allPintxos.filter(pintxo => pintxo.price >= min && pintxo.price <= max);
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
 * Get all available difficulties
 */
export function getDifficulties(): Pintxo['difficulty'][] {
  return ['easy', 'medium', 'hard'];
}

/**
 * Get price range (min, max) from all pintxos
 */
export function getPriceRange(): { min: number; max: number } {
  const prices = pintxosBase.map(p => p.price);
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
