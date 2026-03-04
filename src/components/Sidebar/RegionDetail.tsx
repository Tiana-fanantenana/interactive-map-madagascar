import { motion } from 'framer-motion';
import { MapPin, Users, Map, Thermometer, Star } from 'lucide-react';
import type { Region } from '../../types';

export default function RegionDetail({ region }: { region: Region }) {
  return (
    <motion.div
      key={region.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero */}
      <div style={{
        padding: '24px 20px 20px',
        background: `linear-gradient(135deg, ${region.color}18, transparent)`,
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ fontSize: 40, marginBottom: 10 }}>{region.emoji}</div>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700,
          color: 'var(--text-primary)', marginBottom: 4, lineHeight: 1.2,
        }}>
          {region.name}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: region.color, fontSize: 13, fontWeight: 500 }}>
          <MapPin size={13} />
          {region.capital}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '16px 20px' }}>
        {[
          { icon: <Map size={14} />, label: 'Superficie', value: `${region.area.toLocaleString()} km²` },
          { icon: <Users size={14} />, label: 'Population', value: `${(region.population / 1000000).toFixed(1)}M hab.` },
          { icon: <Thermometer size={14} />, label: 'Climat', value: region.climate },
          { icon: <Star size={14} />, label: 'Highlights', value: `${region.highlights.length} sites` },
        ].map(({ icon, label, value }) => (
          <div key={label} style={{
            background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)',
            padding: '12px', border: '1px solid var(--border)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-muted)', fontSize: 11, marginBottom: 5 }}>
              {icon} {label}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Description */}
      <div style={{ padding: '0 20px 16px' }}>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {region.description}
        </p>
      </div>

      {/* À voir */}
      <div style={{ padding: '0 20px 24px' }}>
        <h4 style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
          À ne pas manquer
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {region.highlights.map((h, i) => (
            <motion.div
              key={h}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-elevated)', border: '1px solid var(--border)',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: region.color, flexShrink: 0, boxShadow: `0 0 6px ${region.color}80` }} />
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{h}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}