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
  category: "bar" | "restaurant" | "taberna" | "bodega";
  location: Location;
  contact: Contact;
  rating: number;
  featuredPintxos: string[];
  images: string[];
  pintxos: string[]; // Array of pintxo IDs
  priceRange: "€" | "€€" | "€€€" | "€€€€";
  createdAt: string;
  updatedAt: string;
}

export interface BarI18n {
  name: string;
  description: string;
  review: string;
}

export interface Bar extends BarBase, BarI18n {}

export interface BarLocaleMap {
  [key: string]: BarI18n;
}
