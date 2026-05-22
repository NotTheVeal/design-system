import React from 'react';

interface LoadingProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
}

const Loading: React.FC<LoadingProps> = ({ className = '', size = 'md', ariaLabel = 'Loading...' }) => {
  const spinnerSize = size === 'sm' ? 'var(--ps-loading-spinner-sizing-sm)' : size === 'lg' ? 'var(--ps-loading-spinner-sizing-lg)' : 'var(--ps-loading-spinner-sizing-md)';

  return (
    <>
      <style>
        {`
          :root {
            --ps-font: 'Source Sans Pro', sans-serif;
            --ps-blue: #005BA6;
            --ps-midnight: #002F48;
            --ps-loading-spinner-sizing-sm: 16px;
            --ps-loading-spinner-sizing-md: 20px;
            --ps-loading-spinner-sizing-lg: 32px;
            --ps-loading-button-background: #005BA6;
            --ps-loading-button-border: #005BA6;
            --ps-loading-button-text: #FFFFFF;
            --ps-loading-skeleton-color-base: #F1F1F1;
            --ps-loading-skeleton-color-highlight: #FAFAFA;
          }
          .loading {
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: var(--ps-font);
            color: var(--ps-blue);
            min-height: 48px;
          }
          .spinner {
            width: ${spinnerSize};
            height: ${spinnerSize};
            border: 4px solid var(--ps-loading-button-border);
            border-top: 4px solid var(--ps-loading-button-text);
            border-radius: 50%;
            animation: spin var(--ps-loading-spinner-animation-duration) var(--ps-loading-spinner-animation-timing) var(--ps-loading-spinner-animation-iteration);
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div className={`loading ${className}`} role="status" aria-label={ariaLabel}>
        <div className="spinner" aria-hidden="true"></div>
      </div>
    </>
  );
};

export default Loading;
