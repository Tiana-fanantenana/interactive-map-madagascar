import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, List, ChevronRight, Search } from 'lucide-react';
import type { Region } from '../../types';
import { REGIONS } from '../../data/regions';
import RegionDetail from './RegionDetail';

interface Props {
  selectedRegion: Region | null;
  onRegionSelect: (region: Region) => void;
  onClose: () => void;
}

export default function Sidebar({ selectedRegion, onRegionSelect, onClose }: Props) {
  const [view, setView] = useState<'detail' | 'list'>('detail');
  const [search, setSearch] = useState('');

  const filtered = REGIONS.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.capital.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ x: -380 }}
      animate={{ x: 0 }}
      exit={{ x: -380 }}
      transition={{ type: 'spring', damping: 28, stiffness: 260 }}
      style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: 'var(--sidebar-width)', zIndex: 1000,
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        boxShadow: 'var(--shadow-deep)',
        overflowY: 'auto',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '20px 20px 16px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, background: 'var(--bg-surface)', zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #4CAF7D, #38BDF8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16,
          }}>🗺️</div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700 }}>Madagascar</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{REGIONS.length} régions</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => setView(v => v === 'list' ? 'detail' : 'list')}
            title="Liste des régions"
            style={{
              background: view === 'list' ? 'var(--bg-elevated)' : 'transparent',
              border: `1px solid ${view === 'list' ? 'var(--border-hover)' : 'transparent'}`,
              borderRadius: 8, padding: '6px', color: 'var(--text-muted)', cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            <List size={15} />
          </button>
          <button onClick={onClose} style={{
            background: 'transparent', border: 'none',
            color: 'var(--text-muted)', cursor: 'pointer', padding: '6px',
            borderRadius: 8, transition: 'color 0.15s',
          }}>
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Contenu */}
      <AnimatePresence mode="wait">
        {view === 'list' ? (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Search */}
            <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                borderRadius: 10, padding: '8px 12px',
              }}>
                <Search size={13} color="var(--text-muted)" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Rechercher une région..."
                  style={{
                    background: 'transparent', border: 'none', outline: 'none',
                    color: 'var(--text-primary)', fontSize: 13,
                    fontFamily: 'var(--font-body)', flex: 1,
                  }}
                />
              </div>
            </div>
            <div>
              {filtered.map((region, i) => (
                <motion.button
                  key={region.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => { onRegionSelect(region); setView('detail'); }}
                  style={{
                    width: '100%', padding: '12px 20px', background: 'transparent',
                    border: 'none', borderBottom: '1px solid var(--border)',
                    color: 'var(--text-primary)', textAlign: 'left', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 12,
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                >
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{region.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{region.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{region.capital}</div>
                  </div>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: region.color, flexShrink: 0 }} />
                  <ChevronRight size={14} color="var(--text-muted)" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AnimatePresence mode="wait">
              {selectedRegion ? (
                <RegionDetail key={selectedRegion.id} region={selectedRegion} />
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{ padding: '40px 20px', textAlign: 'center' }}
                >
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🗺️</div>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    Clique sur une région ou utilise la liste pour explorer Madagascar
                  </p>
                  <button
                    onClick={() => setView('list')}
                    style={{
                      marginTop: 20, padding: '10px 20px',
                      borderRadius: 10, background: 'var(--bg-elevated)',
                      border: '1px solid var(--border)', color: 'var(--text-secondary)',
                      cursor: 'pointer', fontSize: 13, fontFamily: 'var(--font-body)',
                    }}
                  >
                    Voir toutes les régions →
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}