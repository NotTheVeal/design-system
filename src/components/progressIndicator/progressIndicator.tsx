import React from 'react';

export interface ProgressIndicatorProps {
  value: number; // 0–100
  label?: string;
  showPercent?: boolean;
  color?: string;
  className?: string;
}

// Figma spec (node 4582:866 — Progress Bar):
// Track: #E0E0E0, 8px height, 4px radius
// Fill: #005BA6, 4px radius
// Label: 12px #616161, Regular; Percentage: SemiBold

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  value, label, showPercent = true, color = '#005BA6', className = '',
}) => {
  const pct = Math.min(100, Math.max(0, Math.round(value)));
  const font = "'Source Sans Pro', -apple-system, sans-serif";

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', fontFamily: font }}>
      {(label || showPercent) && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: '#616161', fontFamily: font }}>
          {label && <span style={{ fontWeight: 400 }}>{label}</span>}
          {showPercent && <span style={{ fontWeight: 600, flexShrink: 0 }}>{pct}%</span>}
        </div>
      )}
      {/* Track — #E0E0E0, 8px, 4px radius */}
      <div style={{
        width: '100%',
        height: 8,
        background: '#E0E0E0',
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Fill — #005BA6, 4px radius */}
        <div
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{
            position: 'absolute',
            left: 0, top: 0,
            height: '100%',
            width: `${pct}%`,
            background: color,
            borderRadius: 4,
            transition: 'width 300ms ease',
          }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;
