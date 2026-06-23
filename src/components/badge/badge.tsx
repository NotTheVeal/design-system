import React from 'react';
const FONT = "'Source Sans 3', -apple-system, sans-serif";
export type BadgeVariant = 'active' | 'approved' | 'pending' | 'warning' | 'danger' | 'error' | 'neutral' | 'default' | 'success' | 'info';
export type BadgeType = 'status' | 'smartChip' | 'list';
export interface BadgeProps { label: string; variant?: BadgeVariant; type?: BadgeType; icon?: React.ReactNode; className?: string; style?: React.CSSProperties; }
const VARIANT_COLORS = {
  active:    { bg: '#E2F5EE', text: '#17AB78', border: '#17AB78', dot: '#17AB78' },
  approved:  { bg: '#E2F5EE', text: '#17AB78', border: '#17AB78', dot: '#17AB78' },
  success:   { bg: '#E2F5EE', text: '#17AB78', border: '#17AB78', dot: '#17AB78' },
  pending:   { bg: '#EFF9FE', text: '#005BA6', border: '#B0C6D3', dot: '#009CF4' },
  info:      { bg: '#EFF9FE', text: '#005BA6', border: '#B0C6D3', dot: '#009CF4' },
  default:   { bg: '#EFF9FE', text: '#005BA6', border: '#B0C6D3', dot: '#009CF4' },
  warning:   { bg: '#FFF4E5', text: '#E3A92D', border: '#FFCA82', dot: '#E3A92D' },
  danger:    { bg: '#FEF0F0', text: '#FF0000', border: '#FFCFCF', dot: '#FF0000' },
  error:     { bg: '#FEF0F0', text: '#FF0000', border: '#FFCFCF', dot: '#FF0000' },
  neutral:   { bg: '#E6E6E6', text: '#4A4A4A', border: '#DCDCDC', dot: '#949494' },
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
