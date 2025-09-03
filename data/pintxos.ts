import { Bar } from "../types/bar";

// Re-export the Pintxo interface from types/bar
export type { Pintxo } from "../types/bar";

// Internationalized pintxo data structure
export const pintxos = [
  {
    id: "champinon-plancha",
    name: {
      es: "Champiñón a la plancha",
      en: "Grilled Mushroom",
      fr: "Champignon grillé",
      ca: "Xampinyó a la planxa",
      pt: "Cogumelo grelhado",
      de: "Gegrillter Pilz",
      it: "Funghi grigliati",
    },
    description: {
      es: "Champiñones frescos a la plancha con ajo, perejil y aceite de oliva virgen extra.",
      en: "Fresh mushrooms grilled with garlic, parsley and extra virgin olive oil.",
      fr: "Champignons frais grillés avec ail, persil et huile d'olive extra vierge.",
      ca: "Xampinyons frescos a la planxa amb all, julivert i oli d'oliva verge extra.",
      pt: "Cogumelos frescos grelhados com alho, salsa e azeite de oliva extra virgem.",
      de: "Frische Pilze gegrillt mit Knoblauch, Petersilie und nativem Olivenöl extra.",
      it: "Funghi freschi grigliati con aglio, prezzemolo e olio extravergine di oliva.",
    },
    image: "/images/pintxos/champi.jpg",
    price: 2.5,
    category: "traditional" as const,
    ingredients: {
      es: ["champiñones", "ajo", "perejil", "aceite de oliva", "sal"],
      en: ["mushrooms", "garlic", "parsley", "olive oil", "salt"],
      fr: ["champignons", "ail", "persil", "huile d'olive", "sel"],
      ca: ["xampinyons", "all", "julivert", "oli d'oliva", "sal"],
      pt: ["cogumelos", "alho", "salsa", "azeite de oliva", "sal"],
      de: ["Pilze", "Knoblauch", "Petersilie", "Olivenöl", "Salz"],
      it: ["funghi", "aglio", "prezzemolo", "olio d'oliva", "sale"],
    },
    bars: ["bar-laurel-1", "bar-laurel-2", "bar-laurel-3"],
    popularity: 5,
    difficulty: "easy" as const,
    origin: {
      es: "Calle Laurel",
      en: "Laurel Street",
      fr: "Rue Laurel",
      ca: "Carrer Laurel",
      pt: "Rua Laurel",
      de: "Laurel Straße",
      it: "Via Laurel",
    },
    tags: {
      es: ["vegetariano", "tradicional", "popular"],
      en: ["vegetarian", "traditional", "popular"],
      fr: ["végétarien", "traditionnel", "populaire"],
      ca: ["vegetarià", "tradicional", "popular"],
      pt: ["vegetariano", "tradicional", "popular"],
      de: ["vegetarisch", "traditionell", "beliebt"],
      it: ["vegetariano", "tradizionale", "popolare"],
    },
  },
  {
    id: "pimientos-piquillo",
    name: {
      es: "Pimientos del piquillo rellenos",
      en: "Stuffed Piquillo Peppers",
      fr: "Poivrons piquillo farcis",
      ca: "Pebrots del piquillo farcits",
      pt: "Pimentos piquillo recheados",
      de: "Gefüllte Piquillo-Paprika",
      it: "Peperoni piquillo ripieni",
    },
    description: {
      es: "Pimientos del piquillo rellenos de bacalao desmigado con cebolla y tomate.",
      en: "Piquillo peppers stuffed with shredded cod with onion and tomato.",
      fr: "Poivrons piquillo farcis de morue effilochée avec oignon et tomate.",
      ca: "Pebrots del piquillo farcits de bacallà desmigat amb ceba i tomàquet.",
      pt: "Pimentos piquillo recheados com bacalhau desfiado com cebola e tomate.",
      de: "Piquillo-Paprika gefüllt mit zerkleinertem Kabeljau mit Zwiebel und Tomate.",
      it: "Peperoni piquillo ripieni di baccalà sminuzzato con cipolla e pomodoro.",
    },
    image: "/images/pintxos/pimientos-piquillo.svg",
    price: 3.5,
    category: "traditional" as const,
    ingredients: {
      es: [
        "pimientos del piquillo",
        "bacalao",
        "cebolla",
        "tomate",
        "aceite de oliva",
      ],
      en: ["piquillo peppers", "cod", "onion", "tomato", "olive oil"],
      fr: ["poivrons piquillo", "morue", "oignon", "tomate", "huile d'olive"],
      ca: [
        "pebrots del piquillo",
        "bacallà",
        "ceba",
        "tomàquet",
        "oli d'oliva",
      ],
      pt: [
        "pimentos piquillo",
        "bacalhau",
        "cebola",
        "tomate",
        "azeite de oliva",
      ],
      de: ["Piquillo-Paprika", "Kabeljau", "Zwiebel", "Tomate", "Olivenöl"],
      it: [
        "peperoni piquillo",
        "baccalà",
        "cipolla",
        "pomodoro",
        "olio d'oliva",
      ],
    },
    bars: ["bar-laurel-3", "bar-laurel-4"],
    popularity: 4,
    difficulty: "medium" as const,
    origin: {
      es: "La Rioja",
      en: "La Rioja",
      fr: "La Rioja",
      ca: "La Rioja",
      pt: "La Rioja",
      de: "La Rioja",
      it: "La Rioja",
    },
    tags: {
      es: ["pescado", "tradicional", "gourmet"],
      en: ["fish", "traditional", "gourmet"],
      fr: ["poisson", "traditionnel", "gourmet"],
      ca: ["peix", "tradicional", "gourmet"],
      pt: ["peixe", "tradicional", "gourmet"],
      de: ["Fisch", "traditionell", "gourmet"],
      it: ["pesce", "tradizionale", "gourmet"],
    },
  },
  {
    id: "foie-manzana",
    name: {
      es: "Foie con manzana",
      en: "Foie with Apple",
      fr: "Foie avec pomme",
      ca: "Foie amb poma",
      pt: "Foie com maçã",
      de: "Foie mit Apfel",
      it: "Foie con mela",
    },
    description: {
      es: "Foie gras con compota de manzana y reducción de vino tinto.",
      en: "Foie gras with apple compote and red wine reduction.",
      fr: "Foie gras avec compote de pomme et réduction de vin rouge.",
      ca: "Foie gras amb compota de poma i reducció de vi negre.",
      pt: "Foie gras com compota de maçã e redução de vinho tinto.",
      de: "Foie gras mit Apfelkompott und Rotweinreduktion.",
      it: "Foie gras con composta di mele e riduzione di vino rosso.",
    },
    image: "/images/pintxos/foie-manzana.svg",
    price: 4.5,
    category: "modern" as const,
    ingredients: {
      es: ["foie gras", "manzana", "vino tinto", "azúcar", "mantequilla"],
      en: ["foie gras", "apple", "red wine", "sugar", "butter"],
      fr: ["foie gras", "pomme", "vin rouge", "sucre", "beurre"],
      ca: ["foie gras", "poma", "vi negre", "sucre", "mantega"],
      pt: ["foie gras", "maçã", "vinho tinto", "açúcar", "manteiga"],
      de: ["Foie gras", "Apfel", "Rotwein", "Zucker", "Butter"],
      it: ["foie gras", "mela", "vino rosso", "zucchero", "burro"],
    },
    bars: ["bar-laurel-2", "bar-granvia-1"],
    popularity: 3,
    difficulty: "hard" as const,
    origin: {
      es: "Francia",
      en: "France",
      fr: "France",
      ca: "França",
      pt: "França",
      de: "Frankreich",
      it: "Francia",
    },
    tags: {
      es: ["gourmet", "moderno", "premium"],
      en: ["gourmet", "modern", "premium"],
      fr: ["gourmet", "moderne", "premium"],
      ca: ["gourmet", "modern", "premium"],
      pt: ["gourmet", "moderno", "premium"],
      de: ["gourmet", "modern", "premium"],
      it: ["gourmet", "moderno", "premium"],
    },
  },
  {
    id: "tortilla-patata",
    name: {
      es: "Tortilla de patata",
      en: "Potato Omelette",
      fr: "Omelette aux pommes de terre",
      ca: "Truita de patata",
      pt: "Tortilha de batata",
      de: "Kartoffelomelett",
      it: "Frittata di patate",
    },
    description: {
      es: "Tortilla española clásica con patatas, cebolla y huevos frescos.",
      en: "Classic Spanish omelette with potatoes, onion and fresh eggs.",
      fr: "Omelette espagnole classique avec pommes de terre, oignon et œufs frais.",
      ca: "Truita espanyola clàssica amb patates, ceba i ous frescos.",
      pt: "Tortilha espanhola clássica com batatas, cebola e ovos frescos.",
      de: "Klassisches spanisches Omelett mit Kartoffeln, Zwiebel und frischen Eiern.",
      it: "Frittata spagnola classica con patate, cipolla e uova fresche.",
    },
    image: "/images/pintxos/tortilla-patata.svg",
    price: 2.0,
    category: "traditional" as const,
    ingredients: {
      es: ["patatas", "cebolla", "huevos", "aceite de oliva", "sal"],
      en: ["potatoes", "onion", "eggs", "olive oil", "salt"],
      fr: ["pommes de terre", "oignon", "œufs", "huile d'olive", "sel"],
      ca: ["patates", "ceba", "ous", "oli d'oliva", "sal"],
      pt: ["batatas", "cebola", "ovos", "azeite de oliva", "sal"],
      de: ["Kartoffeln", "Zwiebel", "Eier", "Olivenöl", "Salz"],
      it: ["patate", "cipolla", "uova", "olio d'oliva", "sale"],
    },
    bars: [
      "bar-laurel-1",
      "bar-laurel-2",
      "bar-laurel-3",
      "bar-laurel-4",
      "bar-casco-1",
      "bar-casco-2",
    ],
    popularity: 5,
    difficulty: "medium" as const,
    origin: {
      es: "España",
      en: "Spain",
      fr: "Espagne",
      ca: "Espanya",
      pt: "Espanha",
      de: "Spanien",
      it: "Spagna",
    },
    tags: {
      es: ["tradicional", "popular", "clásico"],
      en: ["traditional", "popular", "classic"],
      fr: ["traditionnel", "populaire", "classique"],
      ca: ["tradicional", "popular", "clàssic"],
      pt: ["tradicional", "popular", "clássico"],
      de: ["traditionell", "beliebt", "klassisch"],
      it: ["tradizionale", "popolare", "classico"],
    },
  },
  {
    id: "gambas-ajillo",
    name: {
      es: "Gambas al ajillo",
      en: "Garlic Shrimp",
      fr: "Crevettes à l'ail",
      ca: "Gambes a l'all",
      pt: "Camarão ao alho",
      de: "Knoblauch-Garnelen",
      it: "Gamberi all'aglio",
    },
    description: {
      es: "Gambas frescas al ajillo con guindilla y perejil.",
      en: "Fresh shrimp with garlic, chili and parsley.",
      fr: "Crevettes fraîches à l'ail avec piment et persil.",
      ca: "Gambes fresques a l'all amb bitxo i julivert.",
      pt: "Camarão fresco ao alho com pimenta e salsa.",
      de: "Frische Garnelen mit Knoblauch, Chili und Petersilie.",
      it: "Gamberi freschi all'aglio con peperoncino e prezzemolo.",
    },
    image: "/images/pintxos/gambas-ajillo.svg",
    price: 3.0,
    category: "seafood" as const,
    ingredients: {
      es: [
        "gambas",
        "ajo",
        "guindilla",
        "perejil",
        "aceite de oliva",
        "vino blanco",
      ],
      en: ["shrimp", "garlic", "chili", "parsley", "olive oil", "white wine"],
      fr: [
        "crevettes",
        "ail",
        "piment",
        "persil",
        "huile d'olive",
        "vin blanc",
      ],
      ca: ["gambes", "all", "bitxo", "julivert", "oli d'oliva", "vi blanc"],
      pt: [
        "camarão",
        "alho",
        "pimenta",
        "salsa",
        "azeite de oliva",
        "vinho branco",
      ],
      de: [
        "Garnelen",
        "Knoblauch",
        "Chili",
        "Petersilie",
        "Olivenöl",
        "Weißwein",
      ],
      it: [
        "gamberi",
        "aglio",
        "peperoncino",
        "prezzemolo",
        "olio d'oliva",
        "vino bianco",
      ],
    },
    bars: ["bar-laurel-1", "bar-casco-1", "bar-granvia-1"],
    popularity: 4,
    difficulty: "easy" as const,
    origin: {
      es: "Andalucía",
      en: "Andalusia",
      fr: "Andalousie",
      ca: "Andalusia",
      pt: "Andaluzia",
      de: "Andalusien",
      it: "Andalusia",
    },
    tags: {
      es: ["marisco", "picante", "popular"],
      en: ["seafood", "spicy", "popular"],
      fr: ["fruits de mer", "épicé", "populaire"],
      ca: ["marisc", "picant", "popular"],
      pt: ["frutos do mar", "picante", "popular"],
      de: ["Meeresfrüchte", "scharf", "beliebt"],
      it: ["frutti di mare", "piccante", "popolare"],
    },
  },
];

// Helper functions
export function getPintxosByBar(barId: string) {
  return pintxos.filter((pintxo) => pintxo.bars.includes(barId));
}

export function getPintxosByCategory(category: string) {
  return pintxos.filter((pintxo) => pintxo.category === category);
}

export function getPintxosByPriceRange(minPrice: number, maxPrice: number) {
  return pintxos.filter(
    (pintxo) => pintxo.price >= minPrice && pintxo.price <= maxPrice
  );
}

export function getPopularPintxos(limit: number = 5) {
  return pintxos.sort((a, b) => b.popularity - a.popularity).slice(0, limit);
}

export function searchPintxos(query: string, locale: string = "es") {
  const lowercaseQuery = query.toLowerCase();
  return pintxos.filter(
    (pintxo) =>
      pintxo.name[locale as keyof typeof pintxo.name]
        ?.toLowerCase()
        .includes(lowercaseQuery) ||
      pintxo.description[locale as keyof typeof pintxo.description]
        ?.toLowerCase()
        .includes(lowercaseQuery) ||
      pintxo.ingredients[locale as keyof typeof pintxo.ingredients]?.some(
        (ingredient) => ingredient.toLowerCase().includes(lowercaseQuery)
      ) ||
      pintxo.tags[locale as keyof typeof pintxo.tags]?.some((tag) =>
        tag.toLowerCase().includes(lowercaseQuery)
      )
  );
}

export function getPintxoById(id: string) {
  return pintxos.find((pintxo) => pintxo.id === id);
}
