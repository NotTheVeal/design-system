import React from 'react';

export type DividerWeight = 'subtle' | 'default' | 'strong';
export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps {
  weight?: DividerWeight;
  orientation?: DividerOrientation;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

// Figma exact (node 4532:1092):
// Subtle: #E0E0E0 — inside cards on white bg
// Default: #CCCCCC — standard on #F5F5F5 page bg
// Strong: #999999 — dense tables and data grids
// All: 1px thickness

const COLORS: Record<DividerWeight, string> = {
  subtle:  '#E0E0E0',
  default: '#CCCCCC',
  strong:  '#999999',
};

export const Divider: React.FC<DividerProps> = ({
  weight = 'default', orientation = 'horizontal', label, className = '', style,
}) => {
  const color = COLORS[weight];
  const font = "'Source Sans Pro', -apple-system, sans-serif";

  if (orientation === 'vertical') {
    return (
      <div
        className={className}
        style={{ width: 1, alignSelf: 'stretch', background: color, flexShrink: 0, ...style }}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  if (label) {
    return (
      <div
        className={className}
        style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', ...style }}
        role="separator"
        aria-orientation="horizontal"
      >
        <div style={{ flex: 1, height: 1, background: color }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: '#777777', fontFamily: font, whiteSpace: 'nowrap' }}>{label}</span>
        <div style={{ flex: 1, height: 1, background: color }} />
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{ width: '100%', height: 1, background: color, flexShrink: 0, ...style }}
      role="separator"
      aria-orientation="horizontal"
    />
  );
};

export default Divider;
