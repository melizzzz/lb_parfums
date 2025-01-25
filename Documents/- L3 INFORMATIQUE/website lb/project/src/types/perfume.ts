export type Note = string;

export type PerfumeType = 'femme' | 'homme' | 'unisex';

export interface Perfume {
  id: string;
  name: string;
  type: PerfumeType;
  description: string;
  notes: Note[];
  price: number;
  size: string;
  image: string;
}

export interface SearchResult {
  perfumes: Perfume[];
  totalResults: number;
}