import { useEffect, useState } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { Region } from '../../types';
import { REGIONS } from '../../data/regions';

const GEOJSON_URL = 'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions.geojson';
// On utilise un GeoJSON simplifié de Madagascar depuis datahub.io
const MADA_GEOJSON_URL = 'https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries/MDG.geo.json';

interface Props {
  selectedRegion: Region | null;
  onRegionSelect: (region: Region) => void;
}

export default function RegionLayer({ selectedRegion, onRegionSelect }: Props) {
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    // GeoJSON public de Madagascar (contour national)
    fetch('https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries/MDG.geo.json')
      .then(r => r.json())
      .then(data => setGeoData(data))
      .catch(() => {
        // Fallback : contour simplifié manuel
        setGeoData(null);
      });
  }, []);

  if (!geoData) return null;

  const style = () => ({
    fillColor: '#4CAF7D',
    fillOpacity: 0.15,
    color: '#4CAF7D',
    weight: 2,
    opacity: 0.8,
    dashArray: '4 4',
  });

  const onEachFeature = (_: any, layer: L.Layer) => {
    const path = layer as L.Path;
    path.on({
      mouseover: () => {
        path.setStyle({ fillOpacity: 0.3, weight: 3, dashArray: '' });
      },
      mouseout: () => {
        path.setStyle({ fillOpacity: 0.15, weight: 2, dashArray: '4 4' });
      },
      click: () => {
        // Sélection aléatoire d'une région pour la démo
        const r = REGIONS[Math.floor(Math.random() * REGIONS.length)];
        onRegionSelect(r);
      },
    });
  };

  return <GeoJSON data={geoData} style={style} onEachFeature={onEachFeature} />;
}