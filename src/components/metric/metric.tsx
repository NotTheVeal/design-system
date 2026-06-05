import React from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

type TrendDirection = 'up' | 'down' | 'neutral';

interface MetricProps {
  label?: string;
  value: string | number;
  unit?: string;
  trend?: TrendDirection;
  trendValue?: string | number;
  trendLabel?: string;
  className?: string;
}

const TrendUp = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 10 5 5 8 8 13 2" />
    <polyline points="9 2 13 2 13 6" />
  </svg>
);

const TrendDown = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 5 9 8 6 13 12" />
    <polyline points="9 12 13 12 13 8" />
  </svg>
);

const TREND_COLORS: Record<TrendDirection, string> = {
  up: '#0E7C55',
  down: '#E00000',
  neutral: '#777777',
};

const Metric: React.FC<MetricProps> = ({
  label,
  value,
  unit,
  trend = 'neutral',
  trendValue,
  trendLabel,
  className = '',
}) => {
  const trendColor = TREND_COLORS[trend];

  return (
    <div className={className} style={{ fontFamily }}>
      {label && (
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: '#777777',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 4,
            fontFamily,
          }}
        >
          {label}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{ fontSize: 32, fontWeight: 300, color: '#002F48', lineHeight: 1, fontFamily }}>
          {value}
        </span>
        {unit && (
          <span style={{ fontSize: 16, fontWeight: 600, color: '#4A4A4A', fontFamily }}>
            {unit}
          </span>
        )}
      </div>
      {(trendValue !== undefined || trendLabel) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            marginTop: 6,
            fontSize: 14,
            fontWeight: 600,
            color: trendColor,
            fontFamily,
          }}
        >
          {trend === 'up' && <TrendUp />}
          {trend === 'down' && <TrendDown />}
          {trendValue !== undefined && <span>{trendValue}</span>}
          {trendLabel && (
            <span style={{ fontWeight: 400, color: '#777777' }}>{trendLabel}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Metric;
