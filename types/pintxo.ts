export type Locale = "es" | "en" | "fr" | "ca" | "pt" | "de" | "it";

export interface PintxoVariationI18n {
  review: string;
}

export interface PintxoVariationBase {
  id: string;
  pintxoId: string;
  barId: string;
  price: number;
  rating: number;
  image: string;
}

export interface PintxoVariation extends PintxoVariationBase, PintxoVariationI18n {}

export interface PintxoBase {
  id: string;
  category: 'traditional' | 'modern' | 'fusion' | 'vegetarian' | 'seafood' | 'meat';
  popularity: number;
  ingredients: string[]; // These are ingredient IDs
  tags: string[]; // These are tag IDs
}

export interface PintxoI18n {
  name: string;
  description: string;
}

export interface Pintxo extends PintxoBase, PintxoI18n {}

export interface PintxoLocaleMap {
  [pintxoId: string]: PintxoI18n;
}

export interface PintxoVariationLocaleMap {
  [variationId: string]: PintxoVariationI18n;
}
