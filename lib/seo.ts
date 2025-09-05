import { Metadata } from 'next';
import i18nServer from './i18n-server';

// SEO data structure for each page
interface SEOData {
  title: string;
  description: string;
  keywords: string;
}

// Get SEO data for a specific page and locale using server-side i18next
export async function getSEOData(page: string, locale: string = 'es'): Promise<SEOData> {
  // Ensure i18n is initialized
  if (!i18nServer.isInitialized) {
    await i18nServer.init();
  }
  
  // Change language to the requested locale
  await i18nServer.changeLanguage(locale);
  
  // Get SEO data from translations
  const seoData = i18nServer.t(`seo.${page}`, { returnObjects: true }) as SEOData;
  
  // Fallback to home page if page not found
  if (!seoData || !seoData.title) {
    const fallbackData = i18nServer.t('seo.home', { returnObjects: true }) as SEOData;
    return fallbackData || {
      title: 'Logroñam',
      description: 'Discover the best pintxos and bars in Logroño',
      keywords: 'pintxos, bars, Logroño'
    };
  }
  
  return seoData;
}

// Generate metadata for a specific page and locale
export async function generateMetadata(page: string, locale: string = 'es'): Promise<Metadata> {
  const seo = await getSEOData(page, locale);
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: "Logroñam" }],
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website" as const,
      locale: getOpenGraphLocale(locale),
      siteName: "Logroñam",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: seo.title,
      description: seo.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Get OpenGraph locale from our locale code
function getOpenGraphLocale(locale: string): string {
  const localeMap: Record<string, string> = {
    'es': 'es_ES',
    'en': 'en_US',
    'fr': 'fr_FR',
    'ca': 'ca_ES',
    'pt': 'pt_PT',
    'de': 'de_DE',
    'it': 'it_IT',
  };
  
  return localeMap[locale] || 'es_ES';
}

// Get structured data for a specific page
export async function getStructuredData(page: string, locale: string = 'es') {
  const seo = await getSEOData(page, locale);
  
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Logroñam",
    "description": seo.description,
    "url": `https://logronam.com/${locale}`,
    "inLanguage": locale,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `https://logronam.com/${locale}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}
