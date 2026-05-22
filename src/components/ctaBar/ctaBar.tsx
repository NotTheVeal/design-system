import React from 'react';

interface CtaBarProps {
  title: string;
  description?: string;
  primaryButtonLabel: string;
  secondaryButtonLabel?: string;
  onPrimaryButtonClick: () => void;
  onSecondaryButtonClick?: () => void;
  className?: string;
}

const CtaBar: React.FC<CtaBarProps> = ({
  title,
  description,
  primaryButtonLabel,
  secondaryButtonLabel,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  className,
}) => {
  return (
    <div className={`cta-bar ${className}`} role="banner" aria-labelledby="ctaBarTitle">
      <style jsx>{`
        :root {
          --ps-color-background-default: #ffffff;
          --ps-color-background-sticky: #ffffff;
          --ps-color-border: #dcdcdc;
          --ps-color-text-primary: #000000;
          --ps-color-text-secondary: #586067;
          --ps-spacing-padding-x: 24px;
          --ps-spacing-padding-y: 16px;
          --ps-spacing-button-gap: 12px;
          --ps-border-width: 1px;
          --ps-border-radius: 4px;
          --ps-shadow-sticky: 0 4px 12px rgba(0,0,0,0.1);
          --ps-sizing-min-height: 72px;
        }
        .cta-bar {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: var(--ps-color-background-default);
          padding: var(--ps-spacing-padding-y) var(--ps-spacing-padding-x);
          min-height: var(--ps-sizing-min-height);
          border-radius: var(--ps-border-radius);
          box-shadow: var(--ps-shadow-sticky);
          border: var(--ps-border-width) solid var(--ps-color-border);
        }
        .cta-bar__title {
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: bold;
          color: var(--ps-color-text-primary);
          margin-bottom: var(--ps-spacing-button-gap);
        }
        .cta-bar__description {
          font-family: 'Source Sans Pro', sans-serif;
          color: var(--ps-color-text-secondary);
          margin-bottom: var(--ps-spacing-button-gap);
        }
        .cta-bar__button {
          height: 48px;
          padding: 0 16px;
          border: 1px solid #005BA6;
          background: white;
          color: #005BA6;
          border-radius: var(--ps-border-radius);
          cursor: pointer;
          transition: background 0.3s;
        }
        .cta-bar__button:hover {
          background: #005BA6;
          color: white;
        }
        .cta-bar__button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(0, 147, 244, 0.3);
        }
      `}</style>
      <h2 id="ctaBarTitle" className="cta-bar__title">{title}</h2>
      {description && <p className="cta-bar__description">{description}</p>}
      <div className="cta-bar__button-container" style={{ gap: 'var(--ps-spacing-button-gap)', display: 'flex' }}>
        <button className="cta-bar__button" onClick={onPrimaryButtonClick} aria-label={primaryButtonLabel}>{primaryButtonLabel}</button>
        {secondaryButtonLabel && onSecondaryButtonClick && (
          <button className="cta-bar__button" onClick={onSecondaryButtonClick} aria-label={secondaryButtonLabel}>{secondaryButtonLabel}</button>
        )}
      </div>
    </div>
  );
};

export default CtaBar;
