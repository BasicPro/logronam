export type Locale = "es" | "en" | "fr" | "ca" | "pt" | "de" | "it";

export interface PintxoBase {
  id: string;
  image: string;
  price: number;
  category:
    | "traditional"
    | "modern"
    | "fusion"
    | "vegetarian"
    | "seafood"
    | "meat";
  bars: string[];
  popularity: number;
  difficulty: "easy" | "medium" | "hard";
}

export interface PintxoI18n {
  name: string;
  description: string;
  ingredients: string[];
  origin?: string;
  tags: string[];
}

export interface Pintxo extends PintxoBase, PintxoI18n {}

export interface PintxoLocaleMap {
  [pintxoId: string]: PintxoI18n;
}
