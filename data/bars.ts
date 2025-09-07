import { BarBase } from "../types/bar";

export const barsBase: BarBase[] = [
  {
    id: "bar-soriano",
    contact: {
      phone: "941228807",
    },
    location: {
      address: "Calle Laurel, 2, 26001 Logroño",
      neighborhood: "Calle Laurel",
    },
    images: ["/images/bars/bar-soriano.jpg"],
    rating: 4.8,
    featuredPintxos: ["champinon-plancha-soriano"],
    pintxos: ["champinon-plancha", "tortilla-patatas"],
    priceRange: "€",
    category: "taberna",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
  },
  {
    id: "bar-angel",
    contact: {
      phone: "941206355",
    },
    location: {
      address: "Calle Laurel, 12, 26001 Logroño",
      neighborhood: "Calle Laurel",
    },
    images: ["/images/bars/bar-angel.jpg"],
    rating: 4.9,
    featuredPintxos: ["champinon-plancha-angel"],
    pintxos: ["champinon-plancha"],
    priceRange: "€",
    category: "taberna",
    createdAt: "2025-09-05",
    updatedAt: "2025-09-05",
  },
  {
    id: "la-traviesa",
    contact: {
      phone: "629630433",
    },
    location: {
      address: "Travesía de Laurel, 11, 26001 Logroño",
      neighborhood: "Calle Laurel",
    },
    images: ["/images/bars/la-traviesa.jpg"],
    rating: 4.6,
    featuredPintxos: ["bocatita-travieso", "taco-de-costilla"],
    pintxos: ["bocatita-travieso", "taco-de-costilla"],
    priceRange: "€€",
    category: "bar",
    createdAt: "2025-09-05",
    updatedAt: "2025-09-05",
  },
  {
    id: "bar-sebas",
    contact: {
      phone: "629630433",
    },
    location: {
      address: "Calle Laurel, 11, 26001 Logroño",
      neighborhood: "Calle Laurel",
    },
    images: ["/images/bars/bar-sebas.jpg"],
    rating: 4.3,
    featuredPintxos: ["sebas-tortilla-patatas"],
    pintxos: ["tortilla-patatas"],
    priceRange: "€",
    category: "bar",
    createdAt: "2025-09-05",
    updatedAt: "2025-09-05",
  },
];
