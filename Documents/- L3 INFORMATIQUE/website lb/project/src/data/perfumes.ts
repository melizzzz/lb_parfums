import { Perfume } from '../types/perfume';

export const perfumes: Perfume[] = [
  {
    id: 'elegance-nocturne',
    name: 'Élégance Nocturne',
    type: 'femme',
    description: 'Une fragrance florale et musquée qui évoque l\'élégance d\'une soirée parisienne.',
    notes: ['Rose', 'Jasmin', 'Musc Blanc', 'Vanille'],
    price: 85,
    size: '50ml',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80'
  },
  {
    id: 'bois-precieux',
    name: 'Bois Précieux',
    type: 'homme',
    description: 'Un parfum boisé et épicé qui incarne la sophistication masculine.',
    notes: ['Santal', 'Vétiver', 'Poivre Noir', 'Cèdre'],
    price: 90,
    size: '100ml',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80'
  },
  {
    id: 'harmonie-divine',
    name: 'Harmonie Divine',
    type: 'unisex',
    description: 'Une création unique qui transcende les genres avec ses notes équilibrées.',
    notes: ['Bergamote', 'Iris', 'Ambre', 'Musc'],
    price: 95,
    size: '75ml',
    image: 'https://images.unsplash.com/photo-1592945403244-b3faa7b3a4e1?auto=format&fit=crop&q=80'
  }
];