import React from 'react';

const FONT = "'Source Sans 3', -apple-system, sans-serif";

export type PriceTagSize = 'sm' | 'md' | 'lg';

export interface PriceTagProps extends React.HTMLAttributes<HTMLDivElement> {
  price: number;
  originalPrice?: number;
  currency?: string;
  size?: PriceTagSize;
  locale?: string;
}

const SIZE: Record<PriceTagSize, { price: number; original: number; savings: number }> = {
  sm: { price: 13, original: 11, savings: 10 },
  md: { price: 16, original: 13, savings: 11 },
  lg: { price: 20, original: 15, savings: 12 },
};

const PriceTag = React.forwardRef<HTMLDivElement, PriceTagProps>(function PriceTag(
  { price, originalPrice, currency = 'USD', size = 'md', locale = 'en-US', className = '', style, ...rest },
  ref,
) {
  const fmt = (n: number) => new Intl.NumberFormat(locale, { style: 'currency', currency }).format(n);
  const savings = originalPrice && originalPrice > price
    ? Math.round((1 - price / originalPrice) * 100)
    : null;
  const sz = SIZE[size];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 10px',
        background: '#E2F5EE',
        borderRadius: 4,
        fontFamily: FONT,
        ...style,
      }}
      {...rest}
    >
      <span style={{ fontSize: sz.price, fontWeight: 700, color: '#002F48' }}>{fmt(price)}</span>
      {originalPrice && originalPrice > price && (
        <span style={{ fontSize: sz.original, color: '#777777', textDecoration: 'line-through' }}>
          {fmt(originalPrice)}
        </span>
      )}
      {savings !== null && (
        <span style={{ fontSize: sz.savings, fontWeight: 600, color: '#0E7C55' }}>-{savings}%</span>
      )}
    </div>
  );
});

PriceTag.displayName = 'PriceTag';
export { PriceTag };
export default PriceTag;
