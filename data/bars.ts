import { Bar } from "../types/bar";

export const bars: Bar[] = [
  {
    id: "bar-laurel-1",
    name: "Bar Soriano",
    description:
      "Una de las tabernas más emblemáticas de la calle Laurel, famosa por sus pinchos tradicionales y su ambiente auténtico.",
    location: {
      address: "Calle Laurel, 2, 26001 Logroño",
      coordinates: { lat: 42.4656, lng: -2.4456 },
      neighborhood: "Calle Laurel",
    },
    images: {
      main: "/images/bars/soriano-main.svg",
      interior: "/images/bars/soriano-interior.svg",
      exterior: "/images/bars/soriano-exterior.svg",
    },
    rating: 4.8,
    totalReviews: 342,
    bestPintxo: "champinon-plancha",
    pintxos: ["champinon-plancha", "tortilla-patatas"],
    reviews: [
      {
        id: "review-1",
        rating: 5,
        comment:
          "El mejor champiñón de Logroño, sin duda. Ambiente auténtico y servicio excelente.",
        author: "María González",
        date: "2024-01-15",
        verified: true,
      },
    ],
    openingHours: {
      monday: "12:00 - 16:00, 20:00 - 24:00",
      tuesday: "12:00 - 16:00, 20:00 - 24:00",
      wednesday: "12:00 - 16:00, 20:00 - 24:00",
      thursday: "12:00 - 16:00, 20:00 - 24:00",
      friday: "12:00 - 16:00, 20:00 - 24:00",
      saturday: "12:00 - 16:00, 20:00 - 24:00",
      sunday: "12:00 - 16:00, 20:00 - 24:00",
    },
    contact: {
      phone: "+34 941 123 456",
      instagram: "@barsoriano",
    },
    features: ["Terraza", "WiFi", "Accesible", "Grupos"],
    priceRange: "€€",
    category: "taberna",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
  },
  {
    id: "bar-laurel-2",
    name: "Bar Blanco y Negro",
    description:
      "Taberna moderna con una selección cuidadosa de pinchos creativos y vinos de la región.",
    location: {
      address: "Calle Laurel, 15, 26001 Logroño",
      coordinates: { lat: 42.4658, lng: -2.4454 },
      neighborhood: "Calle Laurel",
    },
    images: {
      main: "/images/bars/blanco-negro-main.svg",
      interior: "/images/bars/blanco-negro-interior.svg",
    },
    rating: 4.6,
    totalReviews: 287,
    bestPintxo: "foie-manzana",
    pintxos: ["foie-manzana", "champinon-plancha"],
    reviews: [
      {
        id: "review-2",
        rating: 4,
        comment:
          "Muy buenos pinchos creativos, aunque un poco caros. Ambiente moderno.",
        author: "Carlos Ruiz",
        date: "2024-01-10",
        verified: true,
      },
    ],
    openingHours: {
      monday: "12:00 - 16:00, 20:00 - 01:00",
      tuesday: "12:00 - 16:00, 20:00 - 01:00",
      wednesday: "12:00 - 16:00, 20:00 - 01:00",
      thursday: "12:00 - 16:00, 20:00 - 01:00",
      friday: "12:00 - 16:00, 20:00 - 01:00",
      saturday: "12:00 - 16:00, 20:00 - 01:00",
      sunday: "12:00 - 16:00, 20:00 - 01:00",
    },
    contact: {
      phone: "+34 941 234 567",
      website: "www.blancoynegro.com",
      instagram: "@blancoynegro",
    },
    features: ["Terraza", "WiFi", "Vinos", "Grupos"],
    priceRange: "€€€",
    category: "bar",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-10",
  },
  {
    id: "bar-laurel-3",
    name: "Taberna Herrerías",
    description:
      "Taberna tradicional con más de 50 años de historia, especializada en pinchos clásicos riojanos.",
    location: {
      address: "Calle Herrerías, 8, 26001 Logroño",
      coordinates: { lat: 42.4654, lng: -2.4458 },
      neighborhood: "Casco Antiguo",
    },
    images: {
      main: "/images/bars/herrerias-main.svg",
      interior: "/images/bars/herrerias-interior.svg",
    },
    rating: 4.7,
    totalReviews: 312,
    bestPintxo: "pimientos-piquillo",
    pintxos: ["pimientos-piquillo", "champinon-plancha"],
    reviews: [
      {
        id: "review-3",
        rating: 5,
        comment:
          "Auténtica taberna riojana. Los pimientos del piquillo son espectaculares.",
        author: "Ana Martín",
        date: "2024-01-08",
        verified: true,
      },
    ],
    openingHours: {
      monday: "12:00 - 15:30, 19:30 - 23:30",
      tuesday: "12:00 - 15:30, 19:30 - 23:30",
      wednesday: "12:00 - 15:30, 19:30 - 23:30",
      thursday: "12:00 - 15:30, 19:30 - 23:30",
      friday: "12:00 - 15:30, 19:30 - 23:30",
      saturday: "12:00 - 15:30, 19:30 - 23:30",
      sunday: "12:00 - 15:30, 19:30 - 23:30",
    },
    contact: {
      phone: "+34 941 345 678",
    },
    features: ["Tradicional", "Accesible", "Familias"],
    priceRange: "€€",
    category: "taberna",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-08",
  },
  {
    id: "bar-laurel-4",
    name: "Bar La Taberna",
    description:
      "Taberna moderna con una selección de pinchos fusion y vinos internacionales.",
    location: {
      address: "Calle San Juan, 12, 26001 Logroño",
      coordinates: { lat: 42.466, lng: -2.445 },
      neighborhood: "Calle San Juan",
    },
    images: {
      main: "/images/bars/taberna-main.svg",
    },
    rating: 4.5,
    totalReviews: 198,
    bestPintxo: "foie-manzana",
    pintxos: ["foie-manzana"],
    reviews: [
      {
        id: "review-4",
        rating: 4,
        comment:
          "Excelente foie gras, muy creativo. Ambiente moderno y elegante.",
        author: "Luis Fernández",
        date: "2024-01-12",
        verified: true,
      },
    ],
    openingHours: {
      monday: "12:00 - 16:00, 20:00 - 00:00",
      tuesday: "12:00 - 16:00, 20:00 - 00:00",
      wednesday: "12:00 - 16:00, 20:00 - 00:00",
      thursday: "12:00 - 16:00, 20:00 - 00:00",
      friday: "12:00 - 16:00, 20:00 - 00:00",
      saturday: "12:00 - 16:00, 20:00 - 00:00",
      sunday: "12:00 - 16:00, 20:00 - 00:00",
    },
    contact: {
      phone: "+34 941 456 789",
      website: "www.lataberna.com",
    },
    features: ["Moderno", "Vinos", "Grupos"],
    priceRange: "€€€",
    category: "restaurant",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-12",
  },
  {
    id: "bar-laurel-5",
    name: "Bar El Rincón",
    description:
      "Pequeño bar familiar con pinchos caseros y ambiente acogedor.",
    location: {
      address: "Calle San Juan, 8, 26001 Logroño",
      coordinates: { lat: 42.4658, lng: -2.4452 },
      neighborhood: "Calle San Juan",
    },
    images: {
      main: "/images/bars/rincon-main.svg",
    },
    rating: 4.3,
    totalReviews: 156,
    bestPintxo: "foie-manzana",
    pintxos: ["foie-manzana"],
    reviews: [
      {
        id: "review-5",
        rating: 4,
        comment:
          "Pinchos caseros muy buenos, especialmente el foie. Ambiente familiar.",
        author: "Carmen López",
        date: "2024-01-14",
        verified: true,
      },
    ],
    openingHours: {
      monday: "12:00 - 15:00, 19:00 - 22:00",
      tuesday: "12:00 - 15:00, 19:00 - 22:00",
      wednesday: "12:00 - 15:00, 19:00 - 22:00",
      thursday: "12:00 - 15:00, 19:00 - 22:00",
      friday: "12:00 - 15:00, 19:00 - 22:00",
      saturday: "12:00 - 15:00, 19:00 - 22:00",
      sunday: "12:00 - 15:00, 19:00 - 22:00",
    },
    contact: {
      phone: "+34 941 567 890",
    },
    features: ["Familiar", "Casero", "Accesible"],
    priceRange: "€€",
    category: "bar",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-14",
  },
  {
    id: "bar-laurel-6",
    name: "Bar Los Pimientos",
    description:
      "Especialista en pimientos del piquillo y otros productos de la huerta riojana.",
    location: {
      address: "Calle Herrerías, 15, 26001 Logroño",
      coordinates: { lat: 42.4652, lng: -2.446 },
      neighborhood: "Casco Antiguo",
    },
    images: {
      main: "/images/bars/pimientos-main.svg",
    },
    rating: 4.4,
    totalReviews: 203,
    bestPintxo: "pimientos-piquillo",
    pintxos: ["pimientos-piquillo"],
    reviews: [
      {
        id: "review-6",
        rating: 4,
        comment:
          "Los mejores pimientos del piquillo de Logroño. Productos de la huerta excelentes.",
        author: "Javier Moreno",
        date: "2024-01-09",
        verified: true,
      },
    ],
    openingHours: {
      monday: "12:00 - 15:00, 19:00 - 23:00",
      tuesday: "12:00 - 15:00, 19:00 - 23:00",
      wednesday: "12:00 - 15:00, 19:00 - 23:00",
      thursday: "12:00 - 15:00, 19:00 - 23:00",
      friday: "12:00 - 15:00, 19:00 - 23:00",
      saturday: "12:00 - 15:00, 19:00 - 23:00",
      sunday: "12:00 - 15:00, 19:00 - 23:00",
    },
    contact: {
      phone: "+34 941 678 901",
    },
    features: ["Huerta", "Tradicional", "Familiar"],
    priceRange: "€€",
    category: "taberna",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-09",
  },
  {
    id: "bar-laurel-7",
    name: "Bar La Tortilla",
    description:
      "Especialista en tortillas y otros platos tradicionales españoles.",
    location: {
      address: "Calle Laurel, 25, 26001 Logroño",
      coordinates: { lat: 42.4662, lng: -2.4448 },
      neighborhood: "Calle Laurel",
    },
    images: {
      main: "/images/bars/tortilla-main.svg",
    },
    rating: 4.2,
    totalReviews: 178,
    bestPintxo: "tortilla-patatas",
    pintxos: ["tortilla-patatas"],
    reviews: [
      {
        id: "review-7",
        rating: 4,
        comment: "La mejor tortilla de patatas de Logroño. Jugosa y sabrosa.",
        author: "Isabel García",
        date: "2024-01-11",
        verified: true,
      },
    ],
    openingHours: {
      monday: "12:00 - 15:00, 19:00 - 22:30",
      tuesday: "12:00 - 15:00, 19:00 - 22:30",
      wednesday: "12:00 - 15:00, 19:00 - 22:30",
      thursday: "12:00 - 15:00, 19:00 - 22:30",
      friday: "12:00 - 15:00, 19:00 - 22:30",
      saturday: "12:00 - 15:00, 19:00 - 22:30",
      sunday: "12:00 - 15:00, 19:00 - 22:30",
    },
    contact: {
      phone: "+34 941 789 012",
    },
    features: ["Tradicional", "Tortillas", "Familiar"],
    priceRange: "€",
    category: "bar",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-11",
  },
];

export const getBarById = (id: string): Bar | undefined => {
  return bars.find((bar) => bar.id === id);
};

export const getTopRatedBars = (limit: number = 10): Bar[] => {
  return bars.sort((a, b) => b.rating - a.rating).slice(0, limit);
};

export const getBarsByCategory = (category: string): Bar[] => {
  return bars.filter((bar) => bar.category === category);
};

export const getBarsByNeighborhood = (neighborhood: string): Bar[] => {
  return bars.filter((bar) => bar.location.neighborhood === neighborhood);
};

// Helper function to get bars by IDs
export function getBarsByIds(barIds: string[]): Bar[] {
  return bars.filter((bar) => barIds.includes(bar.id));
}
