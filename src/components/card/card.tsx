import React, { useState } from 'react';

// Fix: updated to 'Source Sans 3' (Source Sans Pro is deprecated)
const FONT = "'Source Sans 3', -apple-system, sans-serif";

interface CardProps {
  children?: React.ReactNode;
  variant?: 'base' | 'event' | 'status' | 'aiData' | 'data' | 'list' | 'analytics';
  clickable?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

// CORRECTED values:
// padding:      20px                          (was 16px / p-4)
// hover border: 2px solid #005BA6            (was no border change  spec requires PS Blue border on hover)
// hover shadow: 0 6px 20px rgba(0,47,72,0.18) (was rgba(0,0,0,0.1)  now midnight-tinted per brand)
// base shadow:  0 1px 4px rgba(0,47,72,0.08)  (was rgba(0,0,0,0.06)  midnight-tinted)

const BASE_SHADOW = '0 1px 4px rgba(0,47,72,0.08)';
const HOVER_SHADOW = '0 6px 20px rgba(0,47,72,0.18)';
const PS_BLUE = '#005BA6';

// Variant-specific accent colors (top border stripe)
const VARIANT_ACCENT: Record<string, string> = {
  base:      'none',
  event:     '#005BA6',
  status:    '#009CF4',
  aiData:    '#7B2D8B',
  data:      '#005BA6',
  list:      'none',
  analytics: '#002F48',
};

const getVariantBorderTop = (variant: string): string => {
  const accent = VARIANT_ACCENT[variant] ?? 'none';
  return accent === 'none' ? 'none' : `3px solid ${accent}`;
};

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'base',
  clickable = false,
  onClick,
  className = '',
  style,
}) => {
  const [hovered, setHovered] = useState(false);
  const isInteractive = clickable || !!onClick;

  const cardStyle: React.CSSProperties = {
    fontFamily: FONT,
    // CORRECTED: 20px padding (was 16px)
    padding: 20,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    // CORRECTED hover border: 2px solid #005BA6 (was no border change)
    // When not hovered, use a transparent 2px border to prevent layout shift
    border: hovered && isInteractive
      ? `2px solid ${PS_BLUE}`
      : '2px solid transparent',
    // Variant top accent via boxShadow inset trick when also showing hover border
    // We separate via borderTop only when not hovered (to avoid double-border on top)
    borderTop: hovered && isInteractive
      ? `2px solid ${PS_BLUE}`
      : getVariantBorderTop(variant),
    // CORRECTED shadows: midnight-tinted rgba(0,47,72,...) not rgba(0,0,0,...)
    boxShadow: hovered && isInteractive ? HOVER_SHADOW : BASE_SHADOW,
    cursor: isInteractive ? 'pointer' : 'default',
    transition: 'box-shadow 0.18s ease, border-color 0.18s ease',
    boxSizing: 'border-box',
    ...style,
  };

  return (
    <div
      className={className}
      style={cardStyle}
      onClick={isInteractive ? onClick : undefined}
      onMouseEnter={() => isInteractive && setHovered(true)}
      onMouseLeave={() => isInteractive && setHovered(false)}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
};

// Convenience sub-components for structured card layouts
export const CardHeader: React.FC<{ children?: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <div
    style={{
      fontFamily: FONT,
      fontWeight: 700,
      fontSize: 16,
      color: '#1A1A1A',
      marginBottom: 12,
      ...style,
    }}
  >
    {children}
  </div>
);

export const CardBody: React.FC<{ children?: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <div
    style={{
      fontFamily: FONT,
      fontSize: 14,
      color: '#4A4A4A',
      lineHeight: 1.5,
      ...style,
    }}
  >
    {children}
  </div>
);

export const CardFooter: React.FC<{ children?: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <div
    style={{
      fontFamily: FONT,
      fontSize: 13,
      color: '#777777',
      marginTop: 16,
      paddingTop: 12,
      borderTop: '1px solid #EEEEEE',
      ...style,
    }}
  >
    {children}
  </div>
);

export default Card;
