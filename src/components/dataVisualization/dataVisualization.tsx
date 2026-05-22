import React from 'react';

interface DataVisualizationProps {
  title: string;
  data: Array<{ label: string; value: number }>;
  className?: string;
}

const DataVisualization: React.FC<DataVisualizationProps> = ({ title, data, className }) => {
  return (
    <div className={`data-visualization ${className}`} role="region" aria-label={title} tabIndex={0}>
      <style>
        {`
          :root {
            --ps-font-family: 'Source Sans Pro', sans-serif;
            --ps-primary-color: #005BA6;
            --ps-midnight: #002F48;
            --ps-spacing-4: 4px;
            --ps-spacing-8: 8px;
            --ps-spacing-12: 12px;
            --ps-spacing-16: 16px;
            --ps-spacing-20: 20px;
            --ps-spacing-24: 24px;
            --ps-spacing-32: 32px;
            --ps-spacing-40: 40px;
            --ps-spacing-48: 48px;
            --ps-spacing-64: 64px;
            --ps-border-radius: 4px;
            --ps-modal-border-radius: 8px;
            --ps-pill-border-radius: 100px;
            --ps-card-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            --ps-focus-ring: 0 0 0 3px rgba(0, 147, 244, 0.3);
            --ps-input-height: 48px;
            --ps-input-border: 1px solid #DCDCDC;
            --ps-input-focus-border: 1px solid #005BA6;
            --ps-button-primary-background: white;
            --ps-button-primary-border: #005BA6;
            --ps-button-primary-hover: #005BA6;
          }

          .data-visualization {
            font-family: var(--ps-font-family);
            margin: var(--ps-spacing-50) var(--ps-spacing-60);
            padding: var(--ps-spacing-16);
            background-color: var(--ps-midnight);
            border-radius: var(--ps-border-radius);
          }

          .data-visualization-title {
            font-size: var(--ps-typography-title-fontSize);
            font-weight: var(--ps-typography-title-fontWeight);
            color: var(--ps-primary-color);
          }

          .data-visualization-chart {
            display: flex;
            gap: var(--ps-spacing-8);
          }
        `}
      </style>
      <h2 className="data-visualization-title">{title}</h2>
      <div className="data-visualization-chart">
        {data.map((item, index) => (
          <div key={index} style={{ width: `${item.value}%`, backgroundColor: 'var(--ps-primary-color)', borderRadius: 'var(--ps-bar-border-radius)' }}>
            {item.label}: {item.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataVisualization;
