import React from 'react';

export type BadgeVariant = 'status' | 'list' | 'assignment';
export type BadgeStatus = 'available' | 'unavailable' | 'pending' | 'on-order' | 'active' | 'inactive' | 'neutral' | 'new' | 'sale' | 'featured';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  status?: BadgeStatus;
  uppercase?: boolean;
}

const STATUS_COLORS: Record<BadgeStatus, { bg: string; color: string; border: string }> = {
  available:   { bg: '#E2F5EE', color: '#0E7C55', border: 'rgba(14,124,85,0.2)' },
  active:      { bg: '#E2F5EE', color: '#0E7C55', border: 'rgba(14,124,85,0.2)' },
  unavailable: { bg: '#FACBCB', color: '#D32F2F', border: 'rgba(211,47,47,0.2)' },
  inactive:    { bg: '#FACBCB', color: '#D32F2F', border: 'rgba(211,47,47,0.2)' },
  pending:     { bg: '#FFF4D0', color: '#B45309', border: 'rgba(180,83,9,0.2)'  },
  'on-order':  { bg: '#FFF4D0', color: '#B45309', border: 'rgba(180,83,9,0.2)'  },
  new:         { bg: '#EFF9FE', color: '#005BA6', border: 'rgba(0,91,166,0.2)'  },
  sale:        { bg: '#EFF9FE', color: '#005BA6', border: 'rgba(0,91,166,0.2)'  },
  featured:    { bg: '#EDE9FE', color: '#6D28D9', border: 'rgba(109,40,217,0.2)' },
  neutral:     { bg: '#F1F1F1', color: '#777777', border: '#DCDCDC'             },
};

export const Badge: React.FC<BadgeProps> = ({
  label, variant = 'status', status = 'neutral', uppercase = true,
}) => {
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const colors = STATUS_COLORS[status] || STATUS_COLORS.neutral;
  const base: React.CSSProperties = {
    fontFamily: font, fontSize: 12, fontWeight: 700, lineHeight: 1,
    display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap',
    letterSpacing: variant === 'list' ? '0.5px' : '0.3px',
    textTransform: uppercase ? 'uppercase' : 'none',
    background: colors.bg, color: colors.color, border: `1px solid ${colors.border}`,
  };
  if (variant === 'list')       return <span style={{ ...base, padding: '4px 12px', borderRadius: 100 }}>{label}</span>;
  if (variant === 'assignment') return <span style={{ ...base, padding: '3px 8px',  borderRadius: 4   }}>{label}</span>;
  return <span style={{ ...base, padding: '4px 10px', borderRadius: 4 }}>{label}</span>;
};

export default Badge;
