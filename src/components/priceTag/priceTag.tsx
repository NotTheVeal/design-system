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
const SIZES: Record<PriceTagSize, { main: number; orig: number; badge: number }> = {
  sm: { main: 14, orig: 12, badge: 10 },
  md: { main: 18, orig: 13, badge: 11 },
  lg: { main: 24, orig: 16, badge: 12 },
};
const PriceTag = React.forwardRef<HTMLDivElement, PriceTagProps>(function PriceTag(
  { price, originalPrice, currency = 'USD', size = 'md', locale = 'en-US', className = '', style, ...rest },
  ref,
) {
  const fmt = (n: number) => new Intl.NumberFormat(locale, { style: 'currency', currency }).format(n);
  const pct = originalPrice && originalPrice > price ? Math.round((1 - price / originalPrice) * 100) : null;
  const sz = SIZES[size];
  return (
    <div ref={ref} className={className} style={{ display: 'inline-flex', alignItems: 'baseline', gap: 10, padding: '8px 12px', background: '#FFFFFF', border: '1px solid #DCDCDC', borderRadius: 4, fontFamily: FONT, ...style }} {...rest}>
      <span style={{ fontSize: sz.main, fontWeight: 700, color: '#002F48', lineHeight: 1 }}>{fmt(price)}</span>
      {originalPrice && originalPrice > price && (
        <span style={{ fontSize: sz.orig, fontWeight: 400, color: '#777777', textDecoration: 'line-through' }}>{fmt(originalPrice)}</span>
      )}
      {pct !== null && (
        <span style={{ fontSize: sz.badge, fontWeight: 600, color: '#0E7C55', background: '#E2F5EE', padding: '2px 6px', borderRadius: 100, lineHeight: 1.4 }}>-{pct}%</span>
      )}
    </div>
  );
});
PriceTag.displayName = 'PriceTag';
export { PriceTag };
export default PriceTag;
