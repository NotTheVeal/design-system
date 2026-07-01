import React from 'react';
const FONT = "'Source Sans 3', -apple-system, sans-serif";
export type VendorTier = 'preferred' | 'approved' | 'standard' | 'new';
export interface VendorBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  tier?: VendorTier;
  logoUrl?: string;
  compact?: boolean;
}
const TIER_CONFIG: Record<VendorTier, { label: string; color: string; bg: string }> = {
  preferred: { label: 'Preferred Vendor', color: '#0E7C55', bg: '#E2F5EE' },
  approved:  { label: 'Approved Vendor',  color: '#005BA6', bg: '#EFF9FE' },
  standard:  { label: 'Standard Vendor',  color: '#777777', bg: '#F1F1F1' },
  new:       { label: 'New Vendor',       color: '#B45309', bg: '#FFF4E5' },
};
function getInitials(name: string): string {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}
const VendorBadge = React.forwardRef<HTMLDivElement, VendorBadgeProps>(function VendorBadge(
  { name, tier = 'standard', logoUrl, compact = false, className = '', style, ...rest },
  ref,
) {
  const cfg = TIER_CONFIG[tier];
  return (
    <div ref={ref} className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: compact ? '6px 10px' : '10px 14px', background: '#FFFFFF', border: '1px solid #DCDCDC', borderRadius: 4, fontFamily: FONT, ...style }} {...rest}>
      {logoUrl ? (
        <img src={logoUrl} alt={name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
      ) : (
        <div aria-hidden="true" style={{ width: 36, height: 36, borderRadius: '50%', background: '#005BA6', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0, letterSpacing: '0.5px' }}>
          {getInitials(name)}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#002F48', lineHeight: 1.2 }}>{name}</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: cfg.color, background: cfg.bg, padding: '2px 6px', borderRadius: 100, lineHeight: 1.4, width: 'fit-content' }}>{cfg.label}</span>
      </div>
    </div>
  );
});
VendorBadge.displayName = 'VendorBadge';
export { VendorBadge };
export default VendorBadge;
