import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { POI, POICategory } from '../../types';

const CATEGORY_COLORS: Record<POICategory, string> = {
  city:     '#EF4444',
  park:     '#4CAF7D',
  beach:    '#38BDF8',
  heritage: '#F5A623',
  airport:  '#A78BFA',
};

const createEmojiIcon = (emoji: string, color: string) =>
  L.divIcon({
    html: `
      <div style="
        width:36px; height:36px; border-radius:50%;
        background:${color}22; border:2px solid ${color};
        display:flex; align-items:center; justify-content:center;
        font-size:16px; cursor:pointer;
        box-shadow: 0 4px 12px ${color}44;
        transition: transform 0.2s;
      ">${emoji}</div>
    `,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
  });

export default function MarkerLayer({ pois }: { pois: POI[] }) {
  return (
    <>
      {pois.map(poi => (
        <Marker
          key={poi.id}
          position={[poi.lat, poi.lon]}
          icon={createEmojiIcon(poi.emoji, CATEGORY_COLORS[poi.category])}
        >
          <Popup>
            <div style={{ padding: '12px 16px', minWidth: 180 }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{poi.emoji}</div>
              <div style={{
                fontSize: 14, fontWeight: 700, color: '#E8EAF0',
                fontFamily: "'IBM Plex Sans', sans-serif", marginBottom: 4,
              }}>
                {poi.name}
              </div>
              <div style={{ fontSize: 12, color: '#9CA3AF', fontFamily: "'IBM Plex Sans', sans-serif" }}>
                {poi.description}
              </div>
              <div style={{
                marginTop: 8, display: 'inline-block',
                padding: '2px 8px', borderRadius: 99, fontSize: 11,
                background: CATEGORY_COLORS[poi.category] + '22',
                color: CATEGORY_COLORS[poi.category],
                border: `1px solid ${CATEGORY_COLORS[poi.category]}44`,
                fontFamily: "'IBM Plex Sans', sans-serif",
              }}>
                {poi.category}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}