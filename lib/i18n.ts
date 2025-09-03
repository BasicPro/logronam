import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enCommon from '../public/locales/en/common.json';
import esCommon from '../public/locales/es/common.json';
import frCommon from '../public/locales/fr/common.json';
import caCommon from '../public/locales/ca/common.json';
import ptCommon from '../public/locales/pt/common.json';
import deCommon from '../public/locales/de/common.json';
import itCommon from '../public/locales/it/common.json';

const resources = {
  en: {
    common: enCommon,
  },
  es: {
    common: esCommon,
  },
  fr: {
    common: frCommon,
  },
  ca: {
    common: caCommon,
  },
  pt: {
    common: ptCommon,
  },
  de: {
    common: deCommon,
  },
  it: {
    common: itCommon,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es', // default language
    fallbackLng: 'es',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    
    defaultNS: 'common',
    ns: ['common'],
  });

export default i18n;
