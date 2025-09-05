export interface Location {
  address: string;
  coordinates: { lat: number; lng: number };
  neighborhood: string;
}

export interface Contact {
  phone?: string;
  website?: string;
  instagram?: string;
}

export interface BarBase {
  id: string;
  location: Location;
  images: string[];
  rating: number;
  featuredPintxos: string[]; // Array of pintxo variation IDs
  pintxos: string[]; // Array of pintxo IDs
  priceRange: "€" | "€€" | "€€€" | "€€€€";
  category: "bar" | "restaurant" | "taberna" | "bodega";
  createdAt: string;
  updatedAt: string;
}

export interface BarI18n {
  name: string;
  description: string;
  review: string;
  features: string[];
}

export interface Bar extends BarBase, BarI18n {}

export interface BarLocaleMap {
  [barId: string]: BarI18n;
}
