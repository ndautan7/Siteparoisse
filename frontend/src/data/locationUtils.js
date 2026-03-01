import { clochersData } from '@/data/clochersData';

// Lieux supplémentaires (non-clochers)
export const EXTRA_LOCATIONS = [
  {
    displayName: 'Maison de la Fraternité — Castanet-Tolosan',
    googleMapsUrl: 'https://www.google.com/maps/search/Maison+de+la+Fraternité+10+avenue+de+Toulouse+31320+Castanet-Tolosan',
  },
  {
    displayName: 'Centre Paroissial — Saint-Orens',
    googleMapsUrl: 'https://www.google.com/maps/search/Centre+Paroissial+Place+du+Souvenir+31650+Saint-Orens-de-Gameville',
  },
];

// Construire la liste complète des lieux (clochers + extra)
const clochersLocations = Object.values(clochersData).map(c => `${c.churchName} — ${c.name}`);
const extraLocationNames = EXTRA_LOCATIONS.map(l => l.displayName);

export const ALL_LOCATIONS = [...clochersLocations, ...extraLocationNames];

// Construire le mapping nom → URL Google Maps
const locationToGoogleMapsUrl = {};

// Ajouter les clochers
Object.values(clochersData).forEach(c => {
  const displayName = `${c.churchName} — ${c.name}`;
  if (c.googleMapsUrl) {
    locationToGoogleMapsUrl[displayName] = c.googleMapsUrl;
  } else if (c.coordinates) {
    // Construire une URL Google Maps à partir des coordonnées
    locationToGoogleMapsUrl[displayName] = `https://www.google.com/maps/search/?api=1&query=${c.coordinates.lat},${c.coordinates.lng}`;
  } else if (c.address) {
    locationToGoogleMapsUrl[displayName] = `https://www.google.com/maps/search/${encodeURIComponent(c.address)}`;
  }
});

// Ajouter les lieux supplémentaires
EXTRA_LOCATIONS.forEach(l => {
  locationToGoogleMapsUrl[l.displayName] = l.googleMapsUrl;
});

/**
 * Retourne l'URL Google Maps pour un nom de lieu donné.
 * Recherche exacte d'abord, puis recherche partielle.
 * @param {string} locationName - Le nom du lieu
 * @returns {string|null} L'URL Google Maps ou null
 */
export const getGoogleMapsUrl = (locationName) => {
  if (!locationName) return null;

  // Recherche exacte
  if (locationToGoogleMapsUrl[locationName]) {
    return locationToGoogleMapsUrl[locationName];
  }

  // Recherche partielle (le lieu peut être stocké légèrement différemment)
  const lower = locationName.toLowerCase();
  const match = Object.keys(locationToGoogleMapsUrl).find(key =>
    key.toLowerCase() === lower ||
    key.toLowerCase().includes(lower) ||
    lower.includes(key.toLowerCase())
  );

  if (match) {
    return locationToGoogleMapsUrl[match];
  }

  // Fallback : recherche Google Maps avec le nom du lieu
  return `https://www.google.com/maps/search/${encodeURIComponent(locationName)}`;
};
