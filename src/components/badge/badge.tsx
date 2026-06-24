import React from 'react';
const FONT = "'Source Sans 3', -apple-system, sans-serif";
export type BadgeVariant = 'active' | 'approved' | 'pending' | 'warning' | 'danger' | 'error' | 'neutral' | 'default' | 'success' | 'info';
export type BadgeType = 'status' | 'smartChip' | 'list';
export interface BadgeProps { label: string; variant?: BadgeVariant; type?: BadgeType; icon?: React.ReactNode; className?: string; style?: React.CSSProperties; }
const VARIANT_COLORS = {
  active:    { bg: '#E2F5EE', text: '#0E7C55', border: '#0E7C55', dot: '#0E7C55' },
  approved:  { bg: '#E2F5EE', text: '#0E7C55', border: '#0E7C55', dot: '#0E7C55' },
  success:   { bg: '#E2F5EE', text: '#0E7C55', border: '#0E7C55', dot: '#0E7C55' },
  pending:   { bg: '#EFF9FE', text: '#005BA6', border: '#B0C6D3', dot: '#005BA6' },
  info:      { bg: '#EFF9FE', text: '#005BA6', border: '#B0C6D3', dot: '#005BA6' },
  default:   { bg: '#EFF9FE', text: '#005BA6', border: '#B0C6D3', dot: '#005BA6' },
  warning:   { bg: '#FFF4E5', text: '#B45309', border: '#FFCA82', dot: '#B45309' },
  danger:    { bg: '#FEF0F0', text: '#E00000', border: '#FFCFCF', dot: '#E00000' },
  error:     { bg: '#FEF0F0', text: '#E00000', border: '#FFCFCF', dot: '#E00000' },
  neutral:   { bg: '#F1F1F1', text: '#4A4A4A', border: '#DCDCDC', dot: '#949494' },
};
const getColors = (v: BadgeVariant) => (VARIANT_COLORS as any)[v] ?? VARIANT_COLORS['neutral'];
export const Badge: React.FC<BadgeProps> = ({ label, variant = 'neutral', type = 'status', icon, className = '', style }) => {
  const { bg, text, border, dot } = getColors(variant);
  const baseStyle: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: FONT, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1, whiteSpace: 'nowrap', backgroundColor: bg, color: text };
  const typeStyle: React.CSSProperties = type === 'status' ? { padding: '4px 8px', borderRadius: 4, border: `1px solid ${border}` } : type === 'list' ? { padding: '6px 16px', borderRadius: 100, border: `1px solid ${border}` } : { padding: '6px 16px', borderRadius: 9999, border: 'none', gap: 6 };
  return (
    <span className={className} style={{ ...baseStyle, ...typeStyle, ...style }} role="status" aria-label={label}>
      {type === 'smartChip' && <span aria-hidden="true" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', backgroundColor: dot, flexShrink: 0 }} />}
      {type !== 'smartChip' && icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      {label}
    </span>
  );
};
export default Badge;
