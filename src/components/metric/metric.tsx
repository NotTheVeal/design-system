import React from 'react';

export interface MetricProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  delta?: string;
  deltaLabel?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'card';
  className?: string;
}

const TrendUp = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);
const TrendDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const TrendFlat = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const trendConfig = {
  up:      { color: '#0E7C55', bg: '#E2F5EE', icon: <TrendUp />, label: 'Increase' },
  down:    { color: '#D32F2F', bg: '#FACBCB', icon: <TrendDown />, label: 'Decrease' },
  neutral: { color: '#777777', bg: '#F1F1F1', icon: <TrendFlat />, label: 'No change' },
};

const valueSizes = { sm: 24, md: 36, lg: 48 };
const labelSizes = { sm: 12, md: 13, lg: 14 };

export const Metric: React.FC<MetricProps> = ({
  label,
  value,
  unit,
  trend,
  delta,
  deltaLabel = 'vs last period',
  description,
  size = 'md',
  variant = 'default',
  className = '',
}) => {
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const tc = trend ? trendConfig[trend] : null;
  const isCard = variant === 'card';

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: 8,
        padding: isCard ? '20px 24px' : 0,
        background: isCard ? '#FFFFFF' : 'transparent',
        border: isCard ? '1px solid #DCDCDC' : undefined,
        borderRadius: isCard ? 4 : undefined,
        boxShadow: isCard ? '0 1px 4px rgba(0,47,72,0.08)' : undefined,
        fontFamily: font,
        minWidth: isCard ? 180 : undefined,
      }}
    >
      {/* Label */}
      <span style={{ fontSize: labelSizes[size], fontWeight: 600, color: '#777777', lineHeight: '18px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {label}
      </span>

      {/* Value row */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
        <span style={{ fontSize: valueSizes[size], fontWeight: 300, color: '#002F48', lineHeight: 1.1, fontFamily: font }}>
          {value}
        </span>
        {unit && (
          <span style={{ fontSize: valueSizes[size] * 0.45, fontWeight: 400, color: '#777777', paddingBottom: 4 }}>
            {unit}
          </span>
        )}
      </div>

      {/* Trend row */}
      {tc && (delta !== undefined) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 3,
              padding: '2px 6px',
              borderRadius: 4,
              background: tc.bg,
              color: tc.color,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {tc.icon}
            {delta}
          </span>
          {deltaLabel && (
            <span style={{ fontSize: 12, color: '#949494' }}>{deltaLabel}</span>
          )}
        </div>
      )}

      {/* Description */}
      {description && (
        <span style={{ fontSize: 12, color: '#949494', lineHeight: '18px' }}>{description}</span>
      )}
    </div>
  );
};

export default Metric;
