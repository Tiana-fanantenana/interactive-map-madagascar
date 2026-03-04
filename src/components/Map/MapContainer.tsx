import { useEffect } from 'react';
import { MapContainer as LeafletMap, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Region, MapLayer } from '../../types';
import { POINTS_OF_INTEREST } from '../../data/pointsOfInterest';
import RegionLayer from './RegionLayer';
import MarkerLayer from './MarkerLayer';

// Fix Leaflet default icon
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const TILE_LAYERS: Record<MapLayer, { url: string; attribution: string }> = {
  standard: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: ' CartoDB  OpenStreetMap',
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: ' Esri',
  },
  terrain: {
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: ' OpenTopoMap',
  },
};

function FlyToRegion({ region }: { region: Region | null }) {
  const map = useMap();
  useEffect(() => {
    if (region) {
      map.flyTo([region.lat, region.lon], 9, { duration: 1.4, easeLinearity: 0.25 });
    }
  }, [region, map]);
  return null;
}

interface Props {
  activeLayer: MapLayer;
  selectedRegion: Region | null;
  onRegionSelect: (region: Region) => void;
  showPOI: boolean;
  filterCategory: string;
}

export default function MapContainerWrapper({ activeLayer, selectedRegion, onRegionSelect, showPOI, filterCategory }: Props) {
  const filteredPOI = POINTS_OF_INTEREST.filter(p =>
    filterCategory === 'all' ? true : p.category === filterCategory
  );

  return (
    <LeafletMap
      center={[-20.0, 47.0]}
      zoom={6}
      minZoom={5}
      maxZoom={14}
      style={{ width: '100%', height: '100%' }}
      zoomControl={true}
      attributionControl={false}
    >
      <TileLayer
        url={TILE_LAYERS[activeLayer].url}
        attribution={TILE_LAYERS[activeLayer].attribution}
      />
      <RegionLayer onRegionSelect={onRegionSelect} />
      {showPOI && <MarkerLayer pois={filteredPOI} />}
      <FlyToRegion region={selectedRegion} />
    </LeafletMap>
  );
}