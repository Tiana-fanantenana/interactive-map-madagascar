export interface Region {
  id: string;
  name: string;
  capital: string;
  area: number;
  population: number;
  description: string;
  climate: string;
  highlights: string[];
  color: string;
  emoji: string;
  lat: number;
  lon: number;
}

export type POICategory = 'city' | 'park' | 'beach' | 'heritage' | 'airport';

export interface POI {
  id: string;
  name: string;
  category: POICategory;
  lat: number;
  lon: number;
  description: string;
  emoji: string;
}

export type MapLayer = 'standard' | 'satellite' | 'terrain';