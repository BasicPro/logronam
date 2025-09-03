module.exports = {
  i18n: {
    defaultLocale: 'es',
    locales: ['en', 'es', 'fr', 'ca', 'pt', 'de', 'it'],
  },
  fallbackLng: {
    default: ['es'],
  },
  debug: process.env.NODE_ENV === 'development',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
