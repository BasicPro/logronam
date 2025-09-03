import { Bar } from '../types/bar';

export const bars: Bar[] = [
  {
    id: 'bar-laurel-1',
    name: 'Bar Soriano',
    description: 'Una de las tabernas más emblemáticas de la calle Laurel, famosa por sus pinchos tradicionales y su ambiente auténtico.',
    location: {
      address: 'Calle Laurel, 2, 26001 Logroño',
      coordinates: { lat: 42.4656, lng: -2.4456 },
      neighborhood: 'Calle Laurel'
    },
    images: {
      main: '/images/bars/soriano-main.svg',
      interior: '/images/bars/soriano-interior.svg',
      exterior: '/images/bars/soriano-exterior.svg'
    },
    rating: 4.8,
    totalReviews: 342,
    bestPintxo: {
      id: 'pintxo-1',
      name: 'Champiñón a la plancha',
      description: 'Champiñón fresco a la plancha con ajo, perejil y aceite de oliva virgen extra.',
      price: 2.50,
      image: '/images/pintxos/champinon-plancha.svg',
      taste: 'Intenso sabor a champiñón con el toque perfecto de ajo y perejil',
      ingredients: ['Champiñones', 'Ajo', 'Perejil', 'Aceite de oliva', 'Sal'],
      rating: 4.9
    },
    pintxos: [
      {
        id: 'pintxo-1',
        name: 'Champiñón a la plancha',
        description: 'Champiñón fresco a la plancha con ajo, perejil y aceite de oliva virgen extra.',
        price: 2.50,
        image: '/images/pintxos/champinon-plancha.svg',
        taste: 'Intenso sabor a champiñón con el toque perfecto de ajo y perejil',
        ingredients: ['Champiñones', 'Ajo', 'Perejil', 'Aceite de oliva', 'Sal'],
        rating: 4.9
      },
      {
        id: 'pintxo-2',
        name: 'Tortilla de patatas',
        description: 'Tortilla española tradicional con cebolla, jugosa por dentro.',
        price: 3.00,
        image: '/images/pintxos/tortilla-patatas.svg',
        taste: 'Cremosa y sabrosa, perfecta textura',
        ingredients: ['Huevos', 'Patatas', 'Cebolla', 'Aceite de oliva', 'Sal'],
        rating: 4.7
      }
    ],
    reviews: [
      {
        id: 'review-1',
        rating: 5,
        comment: 'El mejor champiñón de Logroño, sin duda. Ambiente auténtico y servicio excelente.',
        author: 'María González',
        date: '2024-01-15',
        verified: true
      }
    ],
    openingHours: {
      monday: '12:00 - 16:00, 20:00 - 24:00',
      tuesday: '12:00 - 16:00, 20:00 - 24:00',
      wednesday: '12:00 - 16:00, 20:00 - 24:00',
      thursday: '12:00 - 16:00, 20:00 - 24:00',
      friday: '12:00 - 16:00, 20:00 - 24:00',
      saturday: '12:00 - 16:00, 20:00 - 24:00',
      sunday: '12:00 - 16:00, 20:00 - 24:00'
    },
    contact: {
      phone: '+34 941 123 456',
      instagram: '@barsoriano'
    },
    features: ['Terraza', 'WiFi', 'Accesible', 'Grupos'],
    priceRange: '€€',
    category: 'taberna',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15'
  },
  {
    id: 'bar-laurel-2',
    name: 'Bar Blanco y Negro',
    description: 'Taberna moderna con una selección cuidadosa de pinchos creativos y vinos de la región.',
    location: {
      address: 'Calle Laurel, 15, 26001 Logroño',
      coordinates: { lat: 42.4658, lng: -2.4454 },
      neighborhood: 'Calle Laurel'
    },
    images: {
      main: '/images/bars/blanco-negro-main.svg',
      interior: '/images/bars/blanco-negro-interior.svg'
    },
    rating: 4.6,
    totalReviews: 287,
    bestPintxo: {
      id: 'pintxo-3',
      name: 'Foie con manzana',
      description: 'Foie gras con compota de manzana y reducción de Pedro Ximénez.',
      price: 4.50,
      image: '/images/pintxos/foie-manzana.svg',
      taste: 'Delicado equilibrio entre el foie y la acidez de la manzana',
      ingredients: ['Foie gras', 'Manzana', 'Pedro Ximénez', 'Pan tostado'],
      rating: 4.8
    },
    pintxos: [
      {
        id: 'pintxo-3',
        name: 'Foie con manzana',
        description: 'Foie gras con compota de manzana y reducción de Pedro Ximénez.',
        price: 4.50,
        image: '/images/pintxos/foie-manzana.svg',
        taste: 'Delicado equilibrio entre el foie y la acidez de la manzana',
        ingredients: ['Foie gras', 'Manzana', 'Pedro Ximénez', 'Pan tostado'],
        rating: 4.8
      }
    ],
    reviews: [
      {
        id: 'review-2',
        rating: 4,
        comment: 'Muy buenos pinchos creativos, aunque un poco caros. Ambiente moderno.',
        author: 'Carlos Ruiz',
        date: '2024-01-10',
        verified: true
      }
    ],
    openingHours: {
      monday: '12:00 - 16:00, 20:00 - 01:00',
      tuesday: '12:00 - 16:00, 20:00 - 01:00',
      wednesday: '12:00 - 16:00, 20:00 - 01:00',
      thursday: '12:00 - 16:00, 20:00 - 01:00',
      friday: '12:00 - 16:00, 20:00 - 01:00',
      saturday: '12:00 - 16:00, 20:00 - 01:00',
      sunday: '12:00 - 16:00, 20:00 - 01:00'
    },
    contact: {
      phone: '+34 941 234 567',
      website: 'www.blancoynegro.com',
      instagram: '@blancoynegro'
    },
    features: ['Terraza', 'WiFi', 'Vinos', 'Grupos'],
    priceRange: '€€€',
    category: 'bar',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-10'
  },
  {
    id: 'bar-laurel-3',
    name: 'Taberna Herrerías',
    description: 'Taberna tradicional con más de 50 años de historia, especializada en pinchos clásicos riojanos.',
    location: {
      address: 'Calle Herrerías, 8, 26001 Logroño',
      coordinates: { lat: 42.4654, lng: -2.4458 },
      neighborhood: 'Casco Antiguo'
    },
    images: {
      main: '/images/bars/herrerias-main.svg',
      interior: '/images/bars/herrerias-interior.svg'
    },
    rating: 4.7,
    totalReviews: 198,
    bestPintxo: {
      id: 'pintxo-4',
      name: 'Pimientos del piquillo rellenos',
      description: 'Pimientos del piquillo rellenos de bacalao con salsa vizcaína.',
      price: 3.50,
      image: '/images/pintxos/pimientos-piquillo.svg',
      taste: 'Sabor intenso del pimiento con la suavidad del bacalao',
      ingredients: ['Pimientos del piquillo', 'Bacalao', 'Cebolla', 'Tomate', 'Aceite'],
      rating: 4.8
    },
    pintxos: [
      {
        id: 'pintxo-4',
        name: 'Pimientos del piquillo rellenos',
        description: 'Pimientos del piquillo rellenos de bacalao con salsa vizcaína.',
        price: 3.50,
        image: '/images/pintxos/pimientos-piquillo.svg',
        taste: 'Sabor intenso del pimiento con la suavidad del bacalao',
        ingredients: ['Pimientos del piquillo', 'Bacalao', 'Cebolla', 'Tomate', 'Aceite'],
        rating: 4.8
      }
    ],
    reviews: [
      {
        id: 'review-3',
        rating: 5,
        comment: 'Auténtica taberna riojana. Los pimientos del piquillo son espectaculares.',
        author: 'Ana Martín',
        date: '2024-01-08',
        verified: true
      }
    ],
    openingHours: {
      monday: '12:00 - 15:30, 19:30 - 23:30',
      tuesday: '12:00 - 15:30, 19:30 - 23:30',
      wednesday: '12:00 - 15:30, 19:30 - 23:30',
      thursday: '12:00 - 15:30, 19:30 - 23:30',
      friday: '12:00 - 15:30, 19:30 - 23:30',
      saturday: '12:00 - 15:30, 19:30 - 23:30',
      sunday: '12:00 - 15:30, 19:30 - 23:30'
    },
    contact: {
      phone: '+34 941 345 678'
    },
    features: ['Tradicional', 'Accesible', 'Familias'],
    priceRange: '€€',
    category: 'taberna',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-08'
  }
];

export const getBarById = (id: string): Bar | undefined => {
  return bars.find(bar => bar.id === id);
};

export const getTopRatedBars = (limit: number = 10): Bar[] => {
  return bars
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

export const getBarsByCategory = (category: string): Bar[] => {
  return bars.filter(bar => bar.category === category);
};

export const getBarsByNeighborhood = (neighborhood: string): Bar[] => {
  return bars.filter(bar => bar.location.neighborhood === neighborhood);
};
