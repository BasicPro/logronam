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

export interface PintxoVariation
  extends PintxoVariationBase,
    PintxoVariationI18n {}

export interface PintxoVariationLocaleMap {
  [key: string]: PintxoVariationI18n;
}

export interface PintxoBase {
  id: string;
  ingredients: string[];
  tags: string[];
  rating: number;
}

export interface PintxoCommon {
  ingredients: Record<string, string>;
  tags: Record<string, string>;
}

export interface PintxoI18n {
  name: string;
  description: string;
}

export interface Pintxo extends PintxoBase, PintxoI18n {
  priceRange: { min: number; max: number } | null;
  ratingRange: { min: number; max: number } | null;
  image: string | null;
}

export interface PintxoLocaleMap {
  [key: string]: PintxoI18n;
}
