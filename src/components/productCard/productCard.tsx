/**
 * ProductCard â PS Design System 2.0
 *
 * SRP (Search Results Page) product card.
 * Both colorScheme='current' AND colorScheme='future' use #005BA6 (PS Blue) â no orange.
 *
 * Spec:
 *   - Font: Source Sans 3, -apple-system, sans-serif
 *   - Grid variant:
 *       Width: auto (fills column)
 *       Image area: aspect ratio 1:1, #F5F5F5 bg
 *       Product name: 14px, 600 weight, #2B2B2B, 2-line clamp
 *       Manufacturer: 12px, #777777
 *       Part number: 12px, #777777
 *       Price: 18px, 700 weight, #2B2B2B
 *       Availability badge: IN STOCK (green) / LOW STOCK (amber) / OUT OF STOCK (grey)
 *       "ADD TO CART": FILLED PS Blue (#005BA6), 36px height, full width
 *       "SEE OPTIONS (N)": outline style, 36px height, full width
 *       8px gap between buttons
 *   - List variant:
 *       Image: 80x80px square on left
 *       Content: flex column
 *       Buttons: right-aligned
 */

import React, { useState } from 'react';

const FONT = "'Source Sans 3', -apple-system, sans-serif";

// Both colorSchemes use PS Blue â no orange ever
const COLOR_SCHEMES = {
  current: {
    primary:      '#005BA6',
    primaryHover: '#004A84',
    primaryText:  '#FFFFFF',
  },
  future: {
    primary:      '#005BA6',
    primaryHover: '#004A84',
    primaryText:  '#FFFFFF',
  },
} as const;

export type ProductCardColorScheme = 'current' | 'future';
export type ProductCardVariant = 'grid' | 'list';

export interface ProductCardProps {
  colorScheme?: ProductCardColorScheme;
  variant?: ProductCardVariant;
  productName?: string;
  partNumber?: string;
  oem?: string;
  price?: string;
  availability?: string;
  optionsCount?: number;
  imageSrc?: string;
  onSeeBuyingOptions?: () => void;
  onPrimary?: () => void;
  className?: string;
}

// Availability badge colors
const AVAILABILITY_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  'In Stock':    { bg: '#E2F5EE', color: '#0E7C55', border: '#0E7C55' },
  'Low Stock':   { bg: '#FFF4E5', color: '#B45309', border: '#B45309' },
  'Out of Stock':{ bg: '#F1F1F1', color: '#777777', border: '#DCDCDC' },
};

// Crosshair/image placeholder icon
const ImagePlaceholder = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#DCDCDC" strokeWidth="1.5" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <polyline points="21 15 16 10 5 21" />
    <circle cx="8.5" cy="8.5" r="1.5" fill="#DCDCDC" stroke="none" />
  </svg>
);

/** Grid variant â vertical portrait card */
const GridCard: React.FC<ProductCardProps & { c: typeof COLOR_SCHEMES['future'] }> = (props) => {
  const {
    c,
    colorScheme = 'future',
    productName = 'Patient Cable, SpO2 Spot Check',
    partNumber = 'OEM-89400-01',
    oem = 'Nellcor',
    price = '$42.50',
    availability = 'In Stock',
    optionsCount = 2,
    imageSrc,
    onSeeBuyingOptions,
    onPrimary,
    className = '',
  } = props;

  const [addHovered, setAddHovered] = useState(false);
  const [seeHovered, setSeeHovered] = useState(false);

  const availStyle = AVAILABILITY_STYLES[availability] ?? AVAILABILITY_STYLES['In Stock'];

  const btnBase: React.CSSProperties = {
    height: 36,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 700,
    cursor: 'pointer',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontFamily: 'inherit',
    transition: 'background 200ms ease, border-color 200ms ease',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div
      className={className}
      style={{
        width: '100%',
        background: '#FFF',
        border: '1px solid #DCDCDC',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(0,47,72,0.08)',
        fontFamily: FONT,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image area â aspect-ratio 1:1, #F5F5F5 bg */}
      <div
        style={{
          width: '100%',
          aspectRatio: '1',
          background: '#F5F5F5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {imageSrc ? (
          <img src={imageSrc} alt={productName} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
        ) : (
          <ImagePlaceholder size={48} />
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '12px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* Product name â 14px, 600, #2B2B2B, 2-line clamp */}
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#2B2B2B',
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {productName}
        </div>

        {/* Manufacturer â 12px, #777777 */}
        <div style={{ fontSize: 12, color: '#777777' }}>{oem}</div>

        {/* Part number â 12px, #777777 */}
        <div style={{ fontSize: 12, color: '#777777' }}>Part #: {partNumber}</div>

        {/* Availability badge */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            height: 20,
            padding: '0 6px',
            borderRadius: 10,
            border: `1px solid ${availStyle.border}`,
            background: availStyle.bg,
            color: availStyle.color,
            fontSize: 11,
            fontWeight: 600,
            alignSelf: 'flex-start',
            marginTop: 2,
          }}
        >
          {availability}
        </span>

        {/* Price â 18px, 700, #2B2B2B */}
        <div style={{ fontSize: 18, fontWeight: 700, color: '#2B2B2B', marginTop: 4 }}>{price}</div>
      </div>

      {/* Buttons â 8px gap */}
      <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* ADD TO CART â filled PS Blue */}
        <button
          onClick={onPrimary}
          onMouseEnter={() => setAddHovered(true)}
          onMouseLeave={() => setAddHovered(false)}
          disabled={availability === 'Out of Stock'}
          style={{
            ...btnBase,
            background: availability === 'Out of Stock' ? '#DCDCDC' : addHovered ? c.primaryHover : c.primary,
            border: 'none',
            color: availability === 'Out of Stock' ? '#949494' : c.primaryText,
            cursor: availability === 'Out of Stock' ? 'not-allowed' : 'pointer',
          }}
        >
          Add to Cart
        </button>

        {/* SEE OPTIONS â outline */}
        <button
          onClick={onSeeBuyingOptions}
          onMouseEnter={() => setSeeHovered(true)}
          onMouseLeave={() => setSeeHovered(false)}
          style={{
            ...btnBase,
            background: seeHovered ? '#EFF9FE' : '#FFFFFF',
            border: `1px solid ${c.primary}`,
            color: c.primary,
          }}
        >
          See Options ({optionsCount})
        </button>
      </div>
    </div>
  );
};

/** List variant â horizontal SRP row */
const ListCard: React.FC<ProductCardProps & { c: typeof COLOR_SCHEMES['future'] }> = (props) => {
  const {
    c,
    colorScheme = 'future',
    productName = 'Patient Cable, SpO2 Spot Check',
    partNumber = 'OEM-89400-01',
    oem = 'Nellcor',
    price = '$42.50',
    availability = 'In Stock',
    optionsCount = 2,
    imageSrc,
    onSeeBuyingOptions,
    className = '',
  } = props;

  const [seeHovered, setSeeHovered] = useState(false);
  const availStyle = AVAILABILITY_STYLES[availability] ?? AVAILABILITY_STYLES['In Stock'];

  return (
    <div
      className={className}
      style={{
        width: '100%',
        background: '#FFF',
        border: '1px solid #DCDCDC',
        borderRadius: 4,
        boxShadow: '0 1px 4px rgba(0,47,72,0.08)',
        fontFamily: FONT,
        display: 'flex',
        alignItems: 'stretch',
        padding: 16,
        gap: 16,
      }}
    >
      {/* Image â 80x80px */}
      <div
        style={{
          width: 80,
          height: 80,
          background: '#F5F5F5',
          borderRadius: 4,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {imageSrc ? (
          <img src={imageSrc} alt={productName} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
        ) : (
          <ImagePlaceholder size={32} />
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#2B2B2B', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {productName}
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <span style={{ fontSize: 12, color: '#777777' }}>{oem}</span>
          <span style={{ fontSize: 12, color: '#949494' }}>Part #: {partNumber}</span>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: 11,
              background: availStyle.bg,
              color: availStyle.color,
              border: `1px solid ${availStyle.border}`,
              padding: '2px 8px',
              borderRadius: 100,
              fontWeight: 600,
            }}
          >
            {availability}
          </span>
        </div>
      </div>

      {/* Right â price + button */}
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: 10, minWidth: 160 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#2B2B2B' }}>{price}</div>
        <button
          onClick={onSeeBuyingOptions}
          onMouseEnter={() => setSeeHovered(true)}
          onMouseLeave={() => setSeeHovered(false)}
          style={{
            background: seeHovered ? c.primary : '#FFFFFF',
            border: `1px solid ${seeHovered ? c.primary : '#DCDCDC'}`,
            borderRadius: 4,
            height: 36,
            padding: '0 16px',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: 0.5,
            textTransform: 'uppercase',
            fontFamily: 'inherit',
            transition: 'background 200ms ease',
            color: seeHovered ? '#FFFFFF' : c.primary,
            whiteSpace: 'nowrap',
          }}
        >
          View All Buying Options ({optionsCount})
        </button>
      </div>
    </div>
  );
};

export const ProductCard: React.FC<ProductCardProps> = ({ variant = 'grid', ...props }) => {
  const c = COLOR_SCHEMES[props.colorScheme ?? 'future'];
  return variant === 'list'
    ? <ListCard c={c} {...props} />
    : <GridCard c={c} {...props} />;
};

ProductCard.displayName = 'ProductCard';

export default ProductCard;
