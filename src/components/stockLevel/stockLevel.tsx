import React from 'react';
const FONT = "'Source Sans 3', -apple-system, sans-serif";
export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';
export interface StockLevelProps extends React.HTMLAttributes<HTMLDivElement> {
  current: number;
  max: number;
  label?: string;
  showNumbers?: boolean;
}
function getStatus(pct: number): StockStatus {
  if (pct === 0) return 'out-of-stock';
  if (pct <= 25) return 'low-stock';
  return 'in-stock';
}
const STATUS_COLORS: Record<StockStatus, string> = {
  'in-stock':    '#005BA6',
  'low-stock':   '#B45309',
  'out-of-stock':'#E00000',
};
const STATUS_LABELS: Record<StockStatus, string> = {
  'in-stock':    'In Stock',
  'low-stock':   'Low Stock',
  'out-of-stock':'Out of Stock',
};
const StockLevel = React.forwardRef<HTMLDivElement, StockLevelProps>(function StockLevel(
  { current, max, label, showNumbers = true, className = '', style, ...rest },
  ref,
) {
  const pct = Math.min(100, Math.max(0, Math.round((current / max) * 100)));
  const status = getStatus(pct);
  const color = STATUS_COLORS[status];
  return (
    <div ref={ref} className={className} style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: FONT, minWidth: 200, ...style }} {...rest}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {label && <span style={{ fontSize: 12, fontWeight: 600, color: '#4A4A4A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>}
        {showNumbers && <span style={{ fontSize: 12, fontWeight: 400, color: '#777777' }}>{current.toLocaleString()} / {max.toLocaleString()} units</span>}
      </div>
      <div style={{ height: 6, background: '#DCDCDC', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 4, transition: 'width 300ms ease' }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 600, color, lineHeight: 1 }}>{STATUS_LABELS[status]}</span>
    </div>
  );
});
StockLevel.displayName = 'StockLevel';
export { StockLevel };
export default StockLevel;
