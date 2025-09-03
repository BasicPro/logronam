
export interface BarLocation {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  neighborhood: string;
}

export interface BarReview {
  id: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
  verified: boolean;
}

export interface Bar {
  id: string;
  name: string;
  description: string;
  location: BarLocation;
  images: {
    main: string;
    interior?: string;
    exterior?: string;
  };
  rating: number;
  totalReviews: number;
  bestPintxo: Pintxo;
  pintxos: Pintxo[];
  reviews: BarReview[];
  openingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  contact: {
    phone?: string;
    website?: string;
    instagram?: string;
  };
  features: string[];
  priceRange: '€' | '€€' | '€€€' | '€€€€';
  category: 'bar' | 'restaurant' | 'taberna' | 'bodega';
  createdAt: string;
  updatedAt: string;
}

export interface BarRanking {
  position: number;
  bar: Bar;
  score: number;
  change: 'up' | 'down' | 'same';
  changeAmount: number;
}

export interface Pintxo {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: 'traditional' | 'modern' | 'fusion' | 'vegetarian' | 'seafood' | 'meat';
  ingredients: string[];
  bars: string[]; // Array of bar IDs that serve this pintxo
  popularity: number; // 1-5 scale
  difficulty: 'easy' | 'medium' | 'hard'; // For preparation
  origin?: string; // Where the pintxo originated
  tags: string[];
}
