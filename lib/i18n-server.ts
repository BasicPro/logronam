import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

// Server-side i18n configuration
const i18nServer = i18next.createInstance();

// Initialize with resources-to-backend
i18nServer
  .use(resourcesToBackend((language: string, namespace: string) => {
    return import(`../public/locales/${language}/${namespace}.json`);
  }))
  .init({
    lng: 'es', // default language
    fallbackLng: 'es',
    defaultNS: 'common',
    ns: ['common'],
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    // Server-side specific options
    initImmediate: false, // Don't initialize immediately
    preload: ['es', 'en', 'fr', 'ca'], // Preload common languages
  });

export default i18nServer;
