import React from 'react';

export type BadgeStatus =
  | 'available'
  | 'unavailable'
  | 'on-order'
  | 'pending'
  | 'new'
  | 'featured'
  | 'sale'
  | 'active'
  | 'inactive'
  | 'neutral';

export type BadgeVariant = 'status' | 'list' | 'chip' | 'assignment';

export interface BadgeProps {
  label: string;
  status?: BadgeStatus;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
}

// Figma: border-radius 4px, 26px height, px-16 py-5, text #1E1E1E, Bold 12px UPPERCASE
const STATUS_STYLES: Record<BadgeStatus, { bg: string; border: string }> = {
  'available':   { bg: '#E2F5EE', border: '#17AB78' },
  'unavailable': { bg: '#FEF0F0', border: '#E00000' },
  'on-order':    { bg: '#FFFBF2', border: '#FFB000' },
  'pending':     { bg: '#FFFBF2', border: '#FFB000' },
  'new':         { bg: '#EBF4FF', border: '#005BA6' },
  'featured':    { bg: '#EBF4FF', border: '#005BA6' },
  'sale':        { bg: '#FEF0F0', border: '#E00000' },
  'active':      { bg: '#E2F5EE', border: '#17AB78' },
  'inactive':    { bg: '#F7F7F7', border: '#B6B6B6' },
  'neutral':     { bg: '#F7F7F7', border: '#B6B6B6' },
};

export const Badge: React.FC<BadgeProps> = ({ label, status = 'neutral', variant = 'status', icon }) => {
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const s = STATUS_STYLES[status] || STATUS_STYLES.neutral;
  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    fontFamily: font, fontSize: 12, fontWeight: 700,
    color: '#1E1E1E', textTransform: 'uppercase', letterSpacing: '0.3px',
    lineHeight: '16px', whiteSpace: 'nowrap',
    border: `1px solid ${s.border}`, background: s.bg,
  };
  if (variant === 'chip') {
    return <span style={{ ...base, height: 20, padding: '0 8px', borderRadius: 100 }}>
      {icon && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{icon}</span>}
      {label}
    </span>;
  }
  if (variant === 'list' || variant === 'assignment') {
    return <span style={{ ...base, height: 26, padding: '0 12px', borderRadius: 100 }}>
      {icon && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{icon}</span>}
      {label}
    </span>;
  }
  // status variant: 26px height, px-16, 4px radius
  return <span style={{ ...base, height: 26, padding: '5px 16px', borderRadius: 4 }}>
    {icon && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{icon}</span>}
    {label}
  </span>;
};

export default Badge;
