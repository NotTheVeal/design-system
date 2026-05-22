import React from 'react';

interface MetricProps {
  value: string | number;
  label: string;
  trend?: 'positive' | 'negative' | 'neutral';
  className?: string;
}

const Metric: React.FC<MetricProps> = ({ value, label, trend, className }) => {
  const trendColors = {
    positive: 'var(--ps-metric-color-trend-positive)',
    negative: 'var(--ps-metric-color-trend-negative)',
    neutral: 'var(--ps-metric-color-trend-neutral)',
  };

  return (
    <div className={`metric ${className}`} role="metric" aria-label={`${label}: ${value}`}>
      <style>
        {`
          :root {
            --ps-font: 'Source Sans Pro', sans-serif;
            --ps-color-primary: #005BA6;
            --ps-color-midnight: #002F48;
            --ps-color-background: var(--ps-metric-color-background);
            --ps-color-border: var(--ps-metric-color-border);
            --ps-spacing-padding: 16px;
            --ps-border-radius: 4px;
            --ps-border-width: 1px;
            --ps-shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.1);
            --ps-focus-ring: 0 0 0 3px rgba(0, 147, 244, 0.3);
          }
          .metric {
            font-family: var(--ps-font);
            background: var(--ps-color-background);
            padding: var(--ps-spacing-padding);
            border-radius: var(--ps-border-radius);
            border: var(--ps-border-width) solid var(--ps-color-border);
            transition: box-shadow 0.2s;
          }
          .metric:hover {
            box-shadow: var(--ps-shadow-hover);
          }
          .value {
            font-size: var(--ps-metric-typography-value-fontSize);
            font-weight: var(--ps-metric-typography-value-fontWeight);
            color: var(--ps-metric-color-text-primary);
          }
          .label {
            font-size: var(--ps-metric-typography-label-fontSize);
            font-weight: var(--ps-metric-typography-label-fontWeight);
            color: var(--ps-metric-color-label);
          }
          .trend-positive {
            color: var(--ps-metric-color-trend-positive);
          }
          .trend-negative {
            color: var(--ps-metric-color-trend-negative);
          }
          .trend-neutral {
            color: var(--ps-metric-color-trend-neutral);
          }
        `}
      </style>
      <span className={`value ${trend ? `trend-${trend}` : ''}`}>{value}</span>
      <span className="label">{label}</span>
    </div>
  );
};

export default Metric;
