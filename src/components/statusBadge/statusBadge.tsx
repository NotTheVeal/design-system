import React from 'react';

export type StatusBadgeVariant = 'status' | 'outlined' | 'dot';
export type StatusBadgeColor = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'primary';

export interface StatusBadgeProps {
  label: string;
  color?: StatusBadgeColor;
  variant?: StatusBadgeVariant;
  size?: 'sm' | 'md';
  className?: string;
}

// Status (solid) = filled pill with dark colored text â light bg IS the PS standard
// But for true "solid" feel, we use darker bg tones
const colorMap: Record<StatusBadgeColor, {
  solidBg: string; solidText: string;
  outlinedBg: string; outlinedText: string; outlinedBorder: string;
  dot: string;
}> = {
  success: { solidBg: '#17AB78', solidText: '#FFFFFF', outlinedBg: '#E2F5EE', outlinedText: '#0E7C55', outlinedBorder: '#0E7C55', dot: '#17AB78' },
  warning: { solidBg: '#E3A92D', solidText: '#FFFFFF', outlinedBg: '#FFF4D0', outlinedText: '#B45309', outlinedBorder: '#B45309', dot: '#E3A92D' },
  danger:  { solidBg: '#D32F2F', solidText: '#FFFFFF', outlinedBg: '#FACBCB', outlinedText: '#D32F2F', outlinedBorder: '#D32F2F', dot: '#D32F2F' },
  info:    { solidBg: '#005BA6', solidText: '#FFFFFF', outlinedBg: '#EFF9FE', outlinedText: '#005BA6', outlinedBorder: '#005BA6', dot: '#005BA6' },
  neutral: { solidBg: '#949494', solidText: '#FFFFFF', outlinedBg: '#F1F1F1', outlinedText: '#777777', outlinedBorder: '#949494', dot: '#949494' },
  primary: { solidBg: '#005BA6', solidText: '#FFFFFF', outlinedBg: '#DCEAED', outlinedText: '#002F48', outlinedBorder: '#005BA6', dot: '#005BA6' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  color = 'neutral',
  variant = 'status',
  size = 'md',
  className = '',
}) => {
  const c = colorMap[color];
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const fontSize = size === 'sm' ? 11 : 12;
  const padding = size === 'sm' ? '1px 7px' : '2px 10px';

  if (variant === 'dot') {
    return (
      <span className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: font, fontSize, fontWeight: 600, color: '#4A4A4A', lineHeight: '20px' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.dot, flexShrink: 0, display: 'inline-block' }} />
        {label}
      </span>
    );
  }

  if (variant === 'outlined') {
    return (
      <span className={className} style={{ display: 'inline-flex', alignItems: 'center', padding, borderRadius: '4px', border: `1px solid ${c.outlinedBorder}`, background: c.outlinedBg, fontFamily: font, fontSize, fontWeight: 700, color: c.outlinedText, lineHeight: '16px', letterSpacing: '0.2px', whiteSpace: 'nowrap' }}>
        {label}
      </span>
    );
  }

  // status = solid filled pill (true solid fill with white text)
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center', padding, borderRadius: '100px', background: c.solidBg, border: 'none', fontFamily: font, fontSize, fontWeight: 700, color: c.solidText, lineHeight: '16px', letterSpacing: '0.5px', textTransform: 'uppercase' as const, whiteSpace: 'nowrap' }}>
      {label}
    </span>
  );
};

export default StatusBadge;
