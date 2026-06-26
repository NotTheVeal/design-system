import React from 'react';
const FONT = "'Source Sans Pro', -apple-system, sans-serif";

export type BadgeVariant = 'active' | 'approved' | 'pending' | 'warning' | 'danger' | 'error' | 'neutral' | 'default' | 'success' | 'info' | 'unavailable' | 'on-order';
export type BadgeType = 'status' | 'assignment' | 'list';
export interface BadgeProps { label: string; variant?: BadgeVariant; type?: BadgeType; icon?: React.ReactNode; className?: string; style?: React.CSSProperties; }

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  'Available':    { bg: '#E2F5EE', text: '#0E7C55' },
  'Unavailable':  { bg: '#FACBCB', text: '#D32F2F' },
  'On Order':     { bg: '#FFF4D0', text: '#B45309' },
  'Pending':      { bg: '#FFF4D0', text: '#B45309' },
};

const VARIANT_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  active:      { bg: '#E2F5EE', text: '#0E7C55', border: '#0E7C55', dot: '#0E7C55' },
  approved:    { bg: '#E2F5EE', text: '#0E7C55', border: '#0E7C55', dot: '#0E7C55' },
  success:     { bg: '#E2F5EE', text: '#0E7C55', border: '#0E7C55', dot: '#0E7C55' },
  unavailable: { bg: '#FACBCB', text: '#D32F2F', border: '#D32F2F', dot: '#D32F2F' },
  danger:      { bg: '#FEF0F0', text: '#D32F2F', border: '#FFCFCF', dot: '#D32F2F' },
  error:       { bg: '#FEF0F0', text: '#D32F2F', border: '#FFCFCF', dot: '#D32F2F' },
  'on-order':  { bg: '#FFF4D0', text: '#B45309', border: '#FFCA82', dot: '#B45309' },
  warning:     { bg: '#FFF4D0', text: '#B45309', border: '#FFCA82', dot: '#B45309' },
  pending:     { bg: '#FFF4D0', text: '#B45309', border: '#FFCA82', dot: '#B45309' },
  info:        { bg: '#EFF9FE', text: '#005BA6', border: '#B0C6D3', dot: '#005BA6' },
  default:     { bg: '#F1F1F1', text: '#777777', border: '#DCDCDC', dot: '#777777' },
  neutral:     { bg: '#F1F1F1', text: '#777777', border: '#DCDCDC', dot: '#777777' },
};

const getColors = (v: BadgeVariant) => VARIANT_COLORS[v] ?? VARIANT_COLORS['neutral'];

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'neutral', type = 'status', icon, className = '', style }) => {
  // Status type: check label for semantic coloring
  if (type === 'status') {
    const sc = STATUS_COLORS[label];
    const bg = sc ? sc.bg : getColors(variant).bg;
    const text = sc ? sc.text : getColors(variant).text;
    return (
      <span className={className} role="status" aria-label={label}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: FONT, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1, whiteSpace: 'nowrap', backgroundColor: bg, color: text, padding: '4px 8px', borderRadius: 4, border: 'none', ...style }}>
        {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
        {label}
      </span>
    );
  }

  // Assignment type: square corners (border-radius: 4px)
  if (type === 'assignment') {
    const { bg, text, dot } = getColors(variant);
    return (
      <span className={className} role="status" aria-label={label}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: FONT, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1, whiteSpace: 'nowrap', backgroundColor: bg, color: text, padding: '6px 16px', borderRadius: 4, border: 'none', ...style }}>
        <span aria-hidden="true" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', backgroundColor: dot, flexShrink: 0 }} />
        {label}
      </span>
    );
  }

  // List/pill type: full pill (border-radius: 100px)
  const { bg, text, border } = getColors(variant);
  return (
    <span className={className} role="status" aria-label={label}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: FONT, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1, whiteSpace: 'nowrap', backgroundColor: bg, color: text, padding: '6px 16px', borderRadius: 100, border: `1px solid ${border}`, ...style }}>
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      {label}
    </span>
  );
};

export default Badge;
