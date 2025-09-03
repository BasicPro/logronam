import esMetadata from '../public/locales/es/common.json';
import enMetadata from '../public/locales/en/common.json';
import frMetadata from '../public/locales/fr/common.json';

const metadataTranslations = {
  es: esMetadata.metadata,
  en: enMetadata.metadata,
  fr: frMetadata.metadata,
  ca: esMetadata.metadata, // Catalan uses Spanish metadata
  pt: enMetadata.metadata, // Portuguese uses English metadata
  de: enMetadata.metadata, // German uses English metadata
  it: enMetadata.metadata, // Italian uses English metadata
};

export function getMetadata(locale: string = 'es') {
  const metadata = metadataTranslations[locale as keyof typeof metadataTranslations] || metadataTranslations.es;
  
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    author: metadata.author,
  };
}

export function generateMetadata(locale: string = 'es') {
  const metadata = getMetadata(locale);
  
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    authors: [{ name: metadata.author }],
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: "website" as const,
      locale: locale === 'es' ? 'es_ES' : locale === 'en' ? 'en_US' : locale === 'fr' ? 'fr_FR' : 'es_ES',
    },
    twitter: {
      card: "summary_large_image" as const,
      title: metadata.title,
      description: metadata.description,
    },
  };
}
