import type { POICategory } from '../../types';

const CATEGORIES: { key: POICategory | 'all'; label: string; color: string; emoji: string }[] = [
  { key: 'all',      label: 'Tout',      color: '#E8EAF0', emoji: '🌍' },
  { key: 'city',     label: 'Villes',    color: '#EF4444', emoji: '🏙️' },
  { key: 'park',     label: 'Parcs',     color: '#4CAF7D', emoji: '🌿' },
  { key: 'beach',    label: 'Plages',    color: '#38BDF8', emoji: '🏖️' },
  { key: 'heritage', label: 'Patrimoine',color: '#F5A623', emoji: '🏛️' },
  { key: 'airport',  label: 'Aéroports', color: '#A78BFA', emoji: '✈️' },
];

interface Props {
  activeFilter: string;
  onFilterChange: (cat: string) => void;
  showPOI: boolean;
  onTogglePOI: () => void;
}

export default function Legend({ activeFilter, onFilterChange, showPOI, onTogglePOI }: Props) {
  return (
    <div style={{
      position: 'absolute', bottom: 24, right: 24, zIndex: 1000,
      background: 'var(--bg-surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '16px',
      boxShadow: 'var(--shadow-deep)',
      minWidth: 200,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Points d'intérêt
        </span>
        <button onClick={onTogglePOI} style={{
          padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600,
          background: showPOI ? '#4CAF7D22' : 'var(--bg-elevated)',
          color: showPOI ? '#4CAF7D' : 'var(--text-muted)',
          border: `1px solid ${showPOI ? '#4CAF7D44' : 'var(--border)'}`,
          cursor: 'pointer', transition: 'all 0.2s',
        }}>
          {showPOI ? 'Masquer' : 'Afficher'}
        </button>
      </div>

      {showPOI && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {CATEGORIES.map(({ key, label, color, emoji }) => (
            <button
              key={key}
              onClick={() => onFilterChange(key)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 10px', borderRadius: 8, cursor: 'pointer',
                background: activeFilter === key ? color + '18' : 'transparent',
                border: `1px solid ${activeFilter === key ? color + '44' : 'transparent'}`,
                color: activeFilter === key ? color : 'var(--text-secondary)',
                transition: 'all 0.15s', textAlign: 'left',
              }}
            >
              <span style={{ fontSize: 14 }}>{emoji}</span>
              <span style={{ fontSize: 12, fontWeight: activeFilter === key ? 600 : 400 }}>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}