import React from 'react';

export type StatusBadgeColor = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'primary';
export type StatusBadgeVariant = 'status' | 'outlined' | 'dot';
export type StatusBadgeSize = 'sm' | 'md';

export interface StatusBadgeProps {
  label: string;
  color?: StatusBadgeColor;
  variant?: StatusBadgeVariant;
  size?: StatusBadgeSize;
  className?: string;
}

// Figma (node 4390:43755 — Small Status Chip):
// Base: bg #E5E5E5, text #525252, SemiBold 12px, 4px radius, 4px padding
// Color variants use semantic backgrounds

const COLOR_MAP: Record<StatusBadgeColor, { bg: string; text: string; border: string }> = {
  success: { bg: '#E2F5EE', text: '#0E7C55', border: '#17AB78' },
  warning: { bg: '#FFFBF2', text: '#B45309', border: '#E3A92D' },
  danger:  { bg: '#FEF0F0', text: '#E00000', border: '#E00000' },
  info:    { bg: '#EFF9FE', text: '#005BA6', border: '#005BA6' },
  neutral: { bg: '#E5E5E5', text: '#525252', border: '#CCCCCC' }, // Figma exact
  primary: { bg: '#EFF9FE', text: '#005BA6', border: '#005BA6' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label, color = 'neutral', variant = 'status', size = 'md', className = '',
}) => {
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const c = COLOR_MAP[color];
  const isSmall = size === 'sm';
  const height = isSmall ? 18 : 22;
  const fontSize = isSmall ? 11 : 12;

  if (variant === 'dot') {
    return (
      <span className={className} style={{ display:'inline-flex', alignItems:'center', gap:6, fontFamily:font, fontSize, fontWeight:600, color:c.text }}>
        <span style={{ width:8, height:8, borderRadius:'50%', background:c.border, flexShrink:0 }}/>
        {label}
      </span>
    );
  }

  if (variant === 'outlined') {
    return (
      <span className={className} style={{
        display:'inline-flex', alignItems:'center', justifyContent:'center',
        height, padding:'0 8px', borderRadius:4,
        border:`1px solid ${c.border}`, background:'transparent',
        fontFamily:font, fontSize, fontWeight:600, color:c.text,
        lineHeight:'12px', whiteSpace:'nowrap',
      }}>{label}</span>
    );
  }

  // Figma default: filled, 4px radius, 4px padding
  return (
    <span className={className} style={{
      display:'inline-flex', alignItems:'center', justifyContent:'center',
      height, padding:'0 8px', borderRadius:4,
      background:c.bg,
      fontFamily:font, fontSize, fontWeight:600, color:c.text,
      lineHeight:'12px', whiteSpace:'nowrap',
    }}>{label}</span>
  );
};

export default StatusBadge;
