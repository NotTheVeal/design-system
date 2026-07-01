import React from 'react';

const FONT = "'Source Sans 3', -apple-system, sans-serif";

export type VendorTier = 'preferred' | 'approved' | 'standard' | 'new';

export interface VendorBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  tier?: VendorTier;
  logoInitials?: string;
  compact?: boolean;
}

const TIER_CONFIG: Record<VendorTier, { label: string; color: string; bg: string }> = {
  preferred: { label: 'Preferred Vendor', color: '#0E7C55', bg: '#E2F5EE' },
  approved:  { label: 'Approved Vendor',  color: '#005BA6', bg: '#EFF9FE' },
  standard:  { label: 'Standard Vendor',  color: '#777777', bg: '#F1F1F1' },
  new:       { label: 'New Vendor',        color: '#B45309', bg: '#FFF4E5' },
};

const VendorBadge = React.forwardRef<HTMLDivElement, VendorBadgeProps>(function VendorBadge(
  { name, tier = 'standard', logoInitials, compact = false, className = '', style, ...rest },
  ref,
) {
  const config = TIER_CONFIG[tier];
  const initials = logoInitials ?? name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: compact ? '4px 8px' : '6px 10px',
        background: '#FFFFFF',
        border: '1px solid #DCDCDC',
        borderRadius: 4,
        fontFamily: FONT,
        ...style,
      }}
      {...rest}
    >
      <div
        aria-hidden="true"
        style={{
          width: compact ? 24 : 32,
          height: compact ? 24 : 32,
          borderRadius: '50%',
          background: '#002F48',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: compact ? 10 : 12,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {initials}
      </div>
      {!compact && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#002F48', lineHeight: 1.3 }}>{name}</span>
          <span style={{
            fontSize: 11, fontWeight: 600, color: config.color,
            background: config.bg, padding: '1px 6px', borderRadius: 3, display: 'inline-block',
          }}>
            {config.label}
          </span>
        </div>
      )}
      {compact && (
        <span style={{ fontSize: 12, fontWeight: 600, color: '#002F48' }}>{name}</span>
      )}
    </div>
  );
});

VendorBadge.displayName = 'VendorBadge';
export { VendorBadge };
export default VendorBadge;
