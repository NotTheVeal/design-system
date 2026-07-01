import React from 'react';

const FONT = "'Source Sans 3', -apple-system, sans-serif";

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface StockLevelProps extends React.HTMLAttributes<HTMLDivElement> {
  current: number;
  max?: number;
  showLabel?: boolean;
  showBar?: boolean;
}

function getStatus(current: number, max: number): StockStatus {
  if (current === 0) return 'out-of-stock';
  if (current / max < 0.25) return 'low-stock';
  return 'in-stock';
}

const STATUS_COLORS: Record<StockStatus, string> = {
  'in-stock': '#0E7C55',
  'low-stock': '#B45309',
  'out-of-stock': '#E00000',
};

const STATUS_LABELS: Record<StockStatus, string> = {
  'in-stock': 'In Stock',
  'low-stock': 'Low Stock',
  'out-of-stock': 'Out of Stock',
};

const StockLevel = React.forwardRef<HTMLDivElement, StockLevelProps>(function StockLevel(
  { current, max = 100, showLabel = true, showBar = true, className = '', style, ...rest },
  ref,
) {
  const pct = Math.min(100, Math.max(0, (current / max) * 100));
  const status = getStatus(current, max);
  const color = STATUS_COLORS[status];

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: FONT, ...style }}
      {...rest}
    >
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#777777' }}>
            {current} / {max} units
          </span>
          <span style={{ fontSize: 12, fontWeight: 600, color }}>{STATUS_LABELS[status]}</span>
        </div>
      )}
      {showBar && (
        <div style={{ height: 8, background: '#DCDCDC', borderRadius: 4, overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${pct}%`,
              background: color,
              borderRadius: 4,
              transition: 'width 300ms ease',
            }}
            role="progressbar"
            aria-valuenow={current}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-label={`Stock level: ${current} of ${max}`}
          />
        </div>
      )}
    </div>
  );
});

StockLevel.displayName = 'StockLevel';
export { StockLevel };
export default StockLevel;
