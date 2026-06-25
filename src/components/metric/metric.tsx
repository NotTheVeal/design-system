import React from 'react';

const fontFamily = "'Source Sans 3', 'Source Sans Pro', sans-serif";

type TrendDirection = 'up' | 'down' | 'neutral';

interface SparklinePoint {
  value: number;
}

interface MetricProps {
  label?: string;
  value: string | number;
  unit?: string;
  trend?: TrendDirection;
  trendValue?: string | number;
  trendLabel?: string;
  description?: string;
  card?: boolean;
  sparkline?: SparklinePoint[];
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

function MiniSparkline({ points }: { points: SparklinePoint[] }) {
  if (points.length < 2) return null;
  const w = 64;
  const h = 28;
  const vals = points.map((p) => p.value);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = max - min || 1;
  const xs = points.map((_, i) => (i / (points.length - 1)) * w);
  const ys = points.map((p) => h - ((p.value - min) / range) * h);
  const poly = xs.map((x, i) => `${x},${ys[i]}`).join(' ');
  const color = '#005BA6';
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      <polyline points={poly} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={xs[xs.length - 1]} cy={ys[ys.length - 1]} r={2.5} fill={color} />
    </svg>
  );
}

export const Metric: React.FC<MetricProps> = ({
  label,
  value,
  unit,
  trend = 'neutral',
  trendValue,
  trendLabel,
  description,
  card = false,
  sparkline,
  className = '',
}) => {
  const trendColor = TREND_COLORS[trend];

  const inner = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, fontFamily, position: 'relative' }}>
      {label && (
        <div style={{ fontSize: 12, fontWeight: 600, color: '#777777', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4, fontFamily }}>
          {label}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontSize: 42, fontWeight: 700, color: '#002F48', lineHeight: 1, fontFamily }}>
              {typeof value === 'number' ? value.toLocaleString() : value}
            </span>
            {unit && (
              <span style={{ fontSize: 16, fontWeight: 600, color: '#4A4A4A', fontFamily }}>{unit}</span>
            )}
          </div>
          {(trendValue !== undefined || trendLabel) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6, fontSize: 14, fontWeight: 600, color: trendColor, fontFamily }}>
              {trend === 'up' && <TrendUp />}
              {trend === 'down' && <TrendDown />}
              {trendValue !== undefined && <span>{trendValue}</span>}
              {trendLabel && <span style={{ fontWeight: 400, color: '#777777' }}>{trendLabel}</span>}
            </div>
          )}
          {description && (
            <div style={{ fontSize: 13, color: '#777777', marginTop: 4, fontFamily }}>{description}</div>
          )}
        </div>
        {sparkline && sparkline.length > 1 && (
          <div style={{ alignSelf: 'flex-end', marginLeft: 12 }}>
            <MiniSparkline points={sparkline} />
          </div>
        )}
      </div>
    </div>
  );

  if (card) {
    return (
      <div className={className} style={{ background: '#FFFFFF', border: '1px solid #DCDCDC', borderRadius: 4, padding: 16, fontFamily }}>
        {inner}
      </div>
    );
  }

  return <div className={className}>{inner}</div>;
};

export default Metric;
