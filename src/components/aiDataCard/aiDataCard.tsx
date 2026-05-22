import React from 'react';

interface AiDataCardProps {
  title: string;
  manufacturer: string;
  tracking: string;
  costLabel: string;
  costAmount: string;
  imageSrc: string;
  className?: string;
}

const AiDataCard: React.FC<AiDataCardProps> = ({
  title,
  manufacturer,
  tracking,
  costLabel,
  costAmount,
  imageSrc,
  className = ''
}) => {
  return (
    <div className={`ai-data-card ${className}`} role="presentation">
      <style jsx>{`
        :root {
          --ps-color-background-default: #F5F5F5;
          --ps-color-background-hover: #E6F2FF;
          --ps-color-border-default: #E5E5E5;
          --ps-color-border-hover: #CCE5FF;
          --ps-color-text-title: #4A4A4A;
          --ps-color-text-manufacturer: #777777;
          --ps-color-text-tracking: #005BA6;
          --ps-color-text-costLabel: #949494;
          --ps-color-text-costAmount: #4A4A4A;
          --ps-color-divider: #E5E5E5;
          --ps-sizing-width: 348px;
          --ps-sizing-imageArea: 100px;
          --ps-spacing-padding: 16px;
          --ps-spacing-gap: 8px;
          --ps-spacing-dividerMargin: 12px;
          --ps-border-radius: 8px;
          --ps-border-width: 1px;
          --ps-shadow-default: 0 4px 12px rgba(0, 0, 0, 0.04);
          --ps-typography-title-fontSize: 16px;
          --ps-typography-title-fontWeight: 700;
          --ps-typography-manufacturer-fontSize: 14px;
          --ps-typography-manufacturer-fontWeight: 400;
          --ps-typography-tracking-fontSize: 14px;
          --ps-typography-tracking-fontWeight: 600;
          --ps-typography-costLabel-fontSize: 14px;
          --ps-typography-costAmount-fontSize: 16px;
          --ps-typography-costAmount-fontWeight: 700;
        }

        .ai-data-card {
          width: var(--ps-sizing-width);
          background: var(--ps-color-background-default);
          border-radius: var(--ps-border-radius);
          border: var(--ps-border-width) solid var(--ps-color-border-default);
          box-shadow: var(--ps-shadow-default);
          padding: var(--ps-spacing-padding);
          transition: background 0.3s, border-color 0.3s;

          &:hover {
            background: var(--ps-color-background-hover);
            border-color: var(--ps-color-border-hover);
          }
        }

        .title {
          font-size: var(--ps-typography-title-fontSize);
          font-weight: var(--ps-typography-title-fontWeight);
          color: var(--ps-color-text-title);
        }

        .manufacturer {
          font-size: var(--ps-typography-manufacturer-fontSize);
          font-weight: var(--ps-typography-manufacturer-fontWeight);
          color: var(--ps-color-text-manufacturer);
        }

        .tracking {
          font-size: var(--ps-typography-tracking-fontSize);
          font-weight: var(--ps-typography-tracking-fontWeight);
          color: var(--ps-color-text-tracking);
        }

        .cost {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: var(--ps-spacing-dividerMargin);
        }

        .cost-label {
          font-size: var(--ps-typography-costLabel-fontSize);
          color: var(--ps-color-text-costLabel);
        }

        .cost-amount {
          font-size: var(--ps-typography-costAmount-fontSize);
          font-weight: var(--ps-typography-costAmount-fontWeight);
          color: var(--ps-color-text-costAmount);
        }

        .image {
          width: var(--ps-sizing-imageArea);
          height: var(--ps-sizing-imageArea);
          background-image: url(${imageSrc});
          background-size: cover;
          border-radius: var(--ps-border-radius);
          margin-bottom: var(--ps-spacing-gap);
        }
      `}</style>
      <div className="image" />
      <h2 className="title" aria-label="Title">{title}</h2>
      <p className="manufacturer" aria-label="Manufacturer">{manufacturer}</p>
      <p className="tracking" aria-label="Tracking Number">{tracking}</p>
      <div className="cost" aria-label="Cost Information">
        <span className="cost-label">{costLabel}</span>
        <span className="cost-amount">{costAmount}</span>
      </div>
    </div>
  );
};

export default AiDataCard;
