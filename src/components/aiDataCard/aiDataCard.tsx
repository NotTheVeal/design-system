import React from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

type TrendDir = 'up' | 'down' | 'neutral';

const TREND_COLORS: Record<TrendDir, string> = {
  up: '#0E7C55',
  down: '#E00000',
  neutral: '#777777',
};

const TrendUpIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 9 4.5 4.5 7.5 7.5 12 2" />
    <polyline points="8 2 12 2 12 6" />
  </svg>
);

const TrendDownIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 4.5 8.5 7.5 5.5 12 11" />
    <polyline points="8 11 12 11 12 7" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 1v2M7 11v2M1 7h2M11 7h2M3.05 3.05l1.41 1.41M9.54 9.54l1.41 1.41M3.05 10.95l1.41-1.41M9.54 4.46l1.41-1.41" />
  </svg>
);

interface AiDataCardProps {
  title: string;
  value?: string | number;
  description?: string;
  insight?: string;
  trend?: TrendDir;
  trendValue?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  confidence?: number;
  isLoading?: boolean;
  className?: string;
}

const AiDataCard: React.FC<AiDataCardProps> = ({
  title,
  value,
  description,
  insight,
  trend = 'neutral',
  trendValue,
  icon,
  actions,
  confidence,
  isLoading = false,
  className = '',
}) => {
  const trendColor = TREND_COLORS[trend];

  return (
    <div
      className={className}
      style={{
        background: '#FFFFFF',
        border: '1px solid #DCDCDC',
        borderRadius: 8,
        boxShadow: '0 1px 4px rgba(0,47,72,0.08)',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        fontFamily,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {icon && (
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: '#EFF9FE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#005BA6',
                flexShrink: 0,
              }}
            >
              {icon}
            </div>
          )}
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: '#777777',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontFamily,
            }}
          >
            {title}
          </span>
        </div>
        {actions && <div style={{ flexShrink: 0 }}>{actions}</div>}
      </div>

      {/* Content */}
      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ height: 32, background: '#F1F1F1', borderRadius: 4, width: '66%' }} />
          <div style={{ height: 16, background: '#F1F1F1', borderRadius: 4, width: '100%' }} />
        </div>
      ) : (
        <>
          {value !== undefined && (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 32, fontWeight: 700, color: '#002F48', lineHeight: 1, fontFamily }}>
                {value}
              </span>
              {(trendValue || trend !== 'neutral') && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: trendColor }}>
                  {trend === 'up' && <TrendUpIcon />}
                  {trend === 'down' && <TrendDownIcon />}
                  {trendValue && <span>{trendValue}</span>}
                </div>
              )}
            </div>
          )}

          {description && (
            <div style={{ fontSize: 14, color: '#777777', fontFamily, lineHeight: 1.5 }}>
              {description}
            </div>
          )}
        </>
      )}

      {/* Insight */}
      {insight && (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 8,
            padding: '8px 12px',
            background: '#EFF9FE',
            borderRadius: 4,
            border: '1px solid #DCEAED',
          }}
        >
          <span style={{ flexShrink: 0, color: '#005BA6', marginTop: 2 }}>
            <SparkleIcon />
          </span>
          <span style={{ fontSize: 13, color: '#005BA6', fontFamily, lineHeight: 1.5 }}>
            {insight}
          </span>
        </div>
      )}

      {/* Confidence */}
      {confidence !== undefined && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, color: '#777777', flexShrink: 0, fontFamily }}>
            Confidence
          </span>
          <div
            style={{
              flex: 1,
              height: 4,
              background: '#DCDCDC',
              borderRadius: 999,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                background: '#005BA6',
                borderRadius: 999,
                width: `${Math.min(100, Math.max(0, confidence))}%`,
              }}
            />
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#4A4A4A', flexShrink: 0, fontFamily }}>
            {confidence}%
          </span>
        </div>
      )}
    </div>
  );
};

export default AiDataCard;
