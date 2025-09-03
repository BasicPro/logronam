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
  ingredients: string[]; // Now in base - these are ingredient IDs
  tags: string[]; // Now in base - these are tag IDs
}

export interface PintxoI18n {
  name: string;
  description: string;
  origin?: string;
}

export interface Pintxo extends PintxoBase, PintxoI18n {}

export interface PintxoLocaleMap {
  [pintxoId: string]: PintxoI18n;
}
