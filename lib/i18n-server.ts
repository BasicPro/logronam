import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { Locale, DEFAULT_LOCALE, isValidLocale } from '../types/common';

// Server-side i18n configuration
const i18nServer = i18next.createInstance();

// Initialize with resources-to-backend
i18nServer
  .use(resourcesToBackend((language: string, namespace: string) => {
    return import(`../public/locales/${language}/${namespace}.json`);
  }))
  .init({
    lng: DEFAULT_LOCALE,
    fallbackLng: DEFAULT_LOCALE,
    defaultNS: 'common',
    ns: ['common', 'pintxos', 'bars', 'pintxo-variations'],
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    // Server-side specific options
    initImmediate: false, // Don't initialize immediately
    preload: ['es', 'en', 'fr', 'ca'], // Preload common languages
  });

/**
 * Get translation for a specific locale and namespace
 */
export async function getTranslation(locale: Locale, namespace: string = 'common') {
  // Ensure the locale is valid
  const validLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;
  
  // Change language if needed
  if (i18nServer.language !== validLocale) {
    await i18nServer.changeLanguage(validLocale);
  }
  
  return i18nServer.getFixedT(validLocale, namespace);
}

/**
 * Get all translations for a specific locale and namespace
 */
export async function getTranslations(locale: Locale, namespace: string = 'common') {
  // Ensure the locale is valid
  const validLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;
  
  // Change language if needed
  if (i18nServer.language !== validLocale) {
    await i18nServer.changeLanguage(validLocale);
  }
  
  return i18nServer.getResourceBundle(validLocale, namespace);
}

/**
 * Check if a namespace exists for a locale
 */
export async function hasNamespace(locale: Locale, namespace: string): Promise<boolean> {
  try {
    const validLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;
    await i18nServer.changeLanguage(validLocale);
    return i18nServer.hasResourceBundle(validLocale, namespace);
  } catch {
    return false;
  }
}

export default i18nServer;
