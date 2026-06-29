import React from 'react';

// Status badge variants from Figma (node 4390:40013)
export type BadgeStatus =
  | 'not-started'
  | 'in-progress'
  | 'canceled'
  | 'completed'
  | 'ship-dates-vary'
  | 'alternative-part'
  | 'made-to-order'
  | 'associated-parts'
  | 'neutral';

// Additional semantic variants for general use
export type BadgeVariant = 'status' | 'list' | 'chip';

export interface BadgeProps {
  label: string;
  status?: BadgeStatus;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
}

// Figma exact palette — text is always #1E1E1E (near-black), border-radius 3px
const STATUS_STYLES: Record<BadgeStatus, { bg: string; border: string }> = {
  'not-started':     { bg: '#FFFBF2', border: '#FFB000' },  // amber
  'in-progress':     { bg: '#FFFBF2', border: '#FFB000' },  // amber
  'canceled':        { bg: '#F7F7F7', border: '#B6B6B6' },  // grey
  'completed':       { bg: '#E2F5EE', border: '#17AB78' },  // green
  'ship-dates-vary': { bg: '#FEF0F0', border: '#E00000' },  // red
  'alternative-part':{ bg: '#FFFBF1', border: '#FFB000' },  // amber
  'made-to-order':   { bg: '#E2F5EE', border: '#17AB78' },  // green
  'associated-parts':{ bg: '#F7F7F7', border: '#B6B6B6' },  // grey
  'neutral':         { bg: '#F7F7F7', border: '#B6B6B6' },  // grey
};

export const Badge: React.FC<BadgeProps> = ({
  label,
  status = 'neutral',
  variant = 'status',
  icon,
}) => {
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const styles = STATUS_STYLES[status] || STATUS_STYLES.neutral;

  if (variant === 'list') {
    // List badges: pill shape (100px radius), same color logic
    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        height: 26,
        padding: '0 12px',
        borderRadius: 100,
        border: `1px solid ${styles.border}`,
        background: styles.bg,
        fontFamily: font,
        fontSize: 12,
        fontWeight: 700,
        color: '#1E1E1E',
        textTransform: 'uppercase',
        letterSpacing: '0.3px',
        lineHeight: '16px',
        whiteSpace: 'nowrap',
      }}>
        {icon && <span style={{ display:'flex', alignItems:'center', flexShrink:0 }}>{icon}</span>}
        {label}
      </span>
    );
  }

  if (variant === 'chip') {
    // Small chips (20px height)
    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 20,
        padding: '0 8px',
        borderRadius: 100,
        border: `1px solid ${styles.border}`,
        background: styles.bg,
        fontFamily: font,
        fontSize: 11,
        fontWeight: 700,
        color: '#1E1E1E',
        textTransform: 'uppercase',
        letterSpacing: '0.3px',
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
    );
  }

  // Default: status badge — Figma: 26px height, px-16 py-5, rounded-3px, border 1px
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 26,
      padding: '5px 16px',
      borderRadius: 3,
      border: `1px solid ${styles.border}`,
      background: styles.bg,
      fontFamily: font,
      fontSize: 12,
      fontWeight: 700,
      color: '#1E1E1E',       // Figma: #1E1E1E text (near-black) for all badges
      textTransform: 'uppercase',
      letterSpacing: '0.3px',
      lineHeight: '16px',
      whiteSpace: 'nowrap',
    }}>
      {icon && <span style={{ display:'flex', alignItems:'center', flexShrink:0 }}>{icon}</span>}
      {label}
    </span>
  );
};

export default Badge;
