import { PintxoBase } from "../../types/pintxo";

export const pintxosBase: PintxoBase[] = [
  {
    id: "champinon-plancha",
    image: "/images/pintxos/champi.jpg",
    price: 2.5,
    category: "traditional",
    bars: ["bar-laurel-1", "bar-laurel-2", "bar-laurel-3"],
    popularity: 5,
    difficulty: "easy",
  },
  {
    id: "foie-manzana",
    image: "/images/pintxos/foie-manzana.svg",
    price: 4.5,
    category: "modern",
    bars: ["bar-laurel-4", "bar-laurel-5"],
    popularity: 4,
    difficulty: "medium",
  },
  {
    id: "pimientos-piquillo",
    image: "/images/pintxos/pimientos-piquillo.svg",
    price: 3.0,
    category: "traditional",
    bars: ["bar-laurel-1", "bar-laurel-6"],
    popularity: 4,
    difficulty: "easy",
  },
  {
    id: "tortilla-patatas",
    image: "/images/pintxos/tortilla-patatas.svg",
    price: 3.5,
    category: "traditional",
    bars: ["bar-laurel-2", "bar-laurel-7"],
    popularity: 5,
    difficulty: "medium",
  },
];
