import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Map, PanelLeftOpen, Layers } from 'lucide-react';
import MapContainerWrapper from './components/Map/MapContainer';
import Sidebar from './components/Sidebar/Sidebar';
import Legend from './components/Legend/Legend';
import type { Region, MapLayer } from './types';
import './styles/globals.css';

const LAYERS: { key: MapLayer; label: string; emoji: string }[] = [
  { key: 'standard',  label: 'Sombre',    emoji: '🌑' },
  { key: 'satellite', label: 'Satellite', emoji: '🛰️' },
  { key: 'terrain',   label: 'Relief',    emoji: '⛰️' },
];

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [activeLayer, setActiveLayer] = useState<MapLayer>('standard');
  const [showPOI, setShowPOI] = useState(true);
  const [filterCategory, setFilterCategory] = useState('all');
  const [layerMenuOpen, setLayerMenuOpen] = useState(false);

  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
    setSidebarOpen(true);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', background: 'var(--bg-base)' }}>

      {/* Carte */}
      <div style={{
        position: 'absolute', inset: 0,
        marginLeft: sidebarOpen ? 'var(--sidebar-width)' : 0,
        transition: 'margin-left 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <MapContainerWrapper
          activeLayer={activeLayer}
          selectedRegion={selectedRegion}
          onRegionSelect={handleRegionSelect}
          showPOI={showPOI}
          filterCategory={filterCategory}
        />
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <Sidebar
            selectedRegion={selectedRegion}
            onRegionSelect={handleRegionSelect}
            onClose={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Bouton ouvrir sidebar */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          style={{
            position: 'absolute', left: 16, top: 16, zIndex: 1000,
            background: 'var(--bg-surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '10px 14px',
            color: 'var(--text-primary)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8,
            boxShadow: 'var(--shadow-card)', fontSize: 13, fontWeight: 500,
            fontFamily: 'var(--font-body)', transition: 'all 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)'}
        >
          <PanelLeftOpen size={15} /> Explorer
        </button>
      )}

      {/* Sélecteur de couche */}
      <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 1000 }}>
        <button
          onClick={() => setLayerMenuOpen(v => !v)}
          style={{
            background: 'var(--bg-surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '10px 14px',
            color: 'var(--text-primary)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8,
            boxShadow: 'var(--shadow-card)', fontSize: 13, fontWeight: 500,
            fontFamily: 'var(--font-body)',
          }}
        >
          <Layers size={15} /> Couches
        </button>
        {layerMenuOpen && (
          <div style={{
            position: 'absolute', top: '110%', right: 0,
            background: 'var(--bg-surface)', border: '1px solid var(--border)',
            borderRadius: 12, overflow: 'hidden',
            boxShadow: 'var(--shadow-deep)', minWidth: 150,
          }}>
            {LAYERS.map(({ key, label, emoji }) => (
              <button key={key} onClick={() => { setActiveLayer(key); setLayerMenuOpen(false); }}
                style={{
                  width: '100%', padding: '10px 16px', background: activeLayer === key ? 'var(--bg-elevated)' : 'transparent',
                  border: 'none', borderBottom: '1px solid var(--border)',
                  color: activeLayer === key ? 'var(--accent-green)' : 'var(--text-secondary)',
                  cursor: 'pointer', textAlign: 'left', fontSize: 13,
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontFamily: 'var(--font-body)', fontWeight: activeLayer === key ? 600 : 400,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => { if (activeLayer !== key) (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)'; }}
                onMouseLeave={e => { if (activeLayer !== key) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                {emoji} {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Titre flottant */}
      <div style={{
        position: 'absolute',
        bottom: 24, left: sidebarOpen ? 'calc(var(--sidebar-width) + 16px)' : 16,
        zIndex: 999, transition: 'left 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        background: 'var(--bg-surface)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '10px 16px',
        display: 'flex', alignItems: 'center', gap: 8,
        boxShadow: 'var(--shadow-card)',
      }}>
        <Map size={14} color="var(--accent-green)" />
        <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
          Interactive Map · Madagascar
        </span>
      </div>

      {/* Légende */}
      <Legend
        activeFilter={filterCategory}
        onFilterChange={setFilterCategory}
        showPOI={showPOI}
        onTogglePOI={() => setShowPOI(v => !v)}
      />
    </div>
  );
}