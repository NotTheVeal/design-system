import React from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  onPrimaryActionClick?: () => void;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  onPrimaryActionClick,
  className,
}) => {
  return (
    <div className={`empty-state ${className}`} role="alert" tabIndex={0}>
      <style>{`
        :root {
          --ps-primary-color: #005BA6;
          --ps-midnight: #002F48;
          --ps-title-color: #4A4A4A;
          --ps-description-color: #777777;
          --ps-icon-size: 40px;
          --ps-icon-circle-size: 80px;
          --ps-icon-circle-radius: 50%;
          --ps-neutral-icon-bg: #F1F1F1;
          --ps-neutral-icon-color: #949494;
          --ps-container-bg: #FFFFFF;
          --ps-container-border-color: #DCDCDC;
          --ps-container-border-radius: 4px;
          --ps-container-padding: 32px;
          --ps-spacing: 16px;
          --ps-title-size: 16px;
          --ps-description-size: 14px;
          --ps-title-weight: 600;
        }
        .empty-state {
          background: var(--ps-container-bg);
          border: 1px solid var(--ps-container-border-color);
          border-radius: var(--ps-container-border-radius);
          padding: var(--ps-container-padding);
          text-align: center;
        }
        .icon {
          background: var(--ps-neutral-icon-bg);
          border-radius: var(--ps-icon-circle-radius);
          display: inline-flex;
          justify-content: center;
          align-items: center;
          height: var(--ps-icon-circle-size);
          width: var(--ps-icon-circle-size);
          margin-bottom: var(--ps-spacing);
        }
        .icon > svg {
          width: var(--ps-icon-size);
          height: var(--ps-icon-size);
          color: var(--ps-neutral-icon-color);
        }
        .title {
          color: var(--ps-title-color);
          font-size: var(--ps-title-size);
          font-weight: var(--ps-title-weight);
          margin-bottom: var(--ps-spacing);
        }
        .description {
          color: var(--ps-description-color);
          font-size: var(--ps-description-size);
          margin-bottom: var(--ps-spacing);
        }
        .primary-button {
          background: white;
          border: 1px solid var(--ps-primary-color);
          color: var(--ps-primary-color);
          height: 48px;
          border-radius: 4px;
          cursor: pointer;
        }
        .primary-button:hover {
          background: var(--ps-primary-color);
          color: white;
        }
      `}</style>
      {icon && <div className="icon">{icon}</div>}
      <div className="title">{title}</div>
      <div className="description">{description}</div>
      {onPrimaryActionClick && (
        <button className="primary-button" onClick={onPrimaryActionClick} aria-label="Primary action">
          Take Action
        </button>
      )}
    </div>
  );
};

export default EmptyState;
