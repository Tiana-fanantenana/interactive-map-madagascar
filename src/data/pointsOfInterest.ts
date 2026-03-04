import type { POI } from '../types';

export const POINTS_OF_INTEREST: POI[] = [
  // Villes majeures
  { id: 'tana', name: 'Antananarivo', category: 'city', lat: -18.9137, lon: 47.5361, description: 'Capitale de Madagascar', emoji: '🏙️' },
  { id: 'toamasina', name: 'Toamasina', category: 'city', lat: -18.1492, lon: 49.4023, description: 'Premier port du pays', emoji: '⚓' },
  { id: 'mahajanga', name: 'Mahajanga', category: 'city', lat: -15.7167, lon: 46.3167, description: 'Ville côtière du nord-ouest', emoji: '🌊' },
  { id: 'toliara', name: 'Toliara', category: 'city', lat: -23.3568, lon: 43.6917, description: 'Capitale du grand sud', emoji: '☀️' },
  { id: 'antsiranana', name: 'Antsiranana', category: 'city', lat: -12.3482, lon: 49.2960, description: 'Diego Suarez, extrême nord', emoji: '⛵' },

  // Parcs nationaux
  { id: 'tsingy', name: 'Tsingy de Bemaraha', category: 'park', lat: -18.9500, lon: 44.7167, description: 'Forêt de calcaire UNESCO', emoji: '🏔️' },
  { id: 'ranomafana', name: 'Parc Ranomafana', category: 'park', lat: -21.2667, lon: 47.4167, description: 'Forêt tropicale humide, lémuriens', emoji: '🌿' },
  { id: 'ankarana', name: 'Parc Ankarana', category: 'park', lat: -12.9333, lon: 49.1167, description: 'Tsingy et grottes, crocodiles', emoji: '🦎' },
  { id: 'andringitra', name: 'Parc Andringitra', category: 'park', lat: -22.2000, lon: 46.9333, description: 'Plus haute montagne de Madagascar', emoji: '⛰️' },
  { id: 'isalo', name: 'Parc de l\'Isalo', category: 'park', lat: -22.5333, lon: 45.3333, description: 'Canyon et piscines naturelles', emoji: '🏜️' },

  // Sites touristiques
  { id: 'baobabs', name: 'Allée des Baobabs', category: 'heritage', lat: -20.2500, lon: 44.4167, description: 'Site iconique de Madagascar', emoji: '🌳' },
  { id: 'ambohimanga', name: 'Ambohimanga', category: 'heritage', lat: -18.7667, lon: 47.5500, description: 'Colline royale, UNESCO', emoji: '👑' },
  { id: 'nosy-be', name: 'Nosy Be', category: 'beach', lat: -13.3317, lon: 48.2642, description: 'Île parfumée, plongée', emoji: '🏝️' },
  { id: 'ifaty', name: 'Ifaty', category: 'beach', lat: -23.1500, lon: 43.6167, description: 'Récifs coralliens, plages', emoji: '🐠' },
  { id: 'ile-sainte-marie', name: 'Île Sainte-Marie', category: 'beach', lat: -16.9500, lon: 49.9167, description: 'Baleines à bosse, pirates', emoji: '🐋' },

  // Aéroports
  { id: 'aero-tana', name: 'Aéroport Ivato', category: 'airport', lat: -18.7969, lon: 47.4788, description: 'Aéroport international principal', emoji: '✈️' },
  { id: 'aero-nosy', name: 'Aéroport Nosy Be', category: 'airport', lat: -13.3117, lon: 48.3147, description: 'Aéroport Fascène', emoji: '✈️' },
];