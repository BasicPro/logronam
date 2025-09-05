/**
 * Supported locales in the application
 */
export type Locale = "es" | "en" | "fr" | "ca" | "pt" | "de" | "it";

/**
 * Array of all supported locales
 */
export const SUPPORTED_LOCALES: readonly Locale[] = [
  "es",
  "en",
  "fr",
  "ca",
  "pt",
  "de",
  "it",
] as const;

/**
 * Default locale
 */
export const DEFAULT_LOCALE: Locale = "es";

/**
 * Check if a string is a valid locale
 */
export function isValidLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

export interface LocaleProps {
  params: Promise<{
    locale: Locale;
  }>;
}
