import React from 'react';

interface TooltipProps {
  content: string;
  className?: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, className, children }) => {
  return (
    <>
      <style jsx>{`
        :root {
          --ps-tooltip-background: #323232;
          --ps-tooltip-text: var(--semantic-color-surface-default);
          --ps-tooltip-border: transparent;
          --ps-tooltip-radius: 4px;
          --ps-tooltip-shadow: var(--semantic-shadow-md);
          --ps-tooltip-padding-v: 6px;
          --ps-tooltip-padding-h: 10px;
          --ps-tooltip-max-width: 240px;
          --ps-tooltip-z-index: 500;
          --ps-tooltip-font-size: 12px;
          --ps-tooltip-font-weight: 400;
          --ps-tooltip-line-height: 16px;
          --ps-tooltip-arrow-size: 6px;
          --ps-tooltip-arrow-color: #323232;
          --ps-tooltip-animation-duration: 150ms;
          --ps-tooltip-animation-easing: ease;
        }

        .tooltip {
          position: relative;
          display: inline-block;
          z-index: var(--ps-tooltip-z-index);
        }

        .tooltip-content {
          visibility: hidden;
          width: var(--ps-tooltip-max-width);
          background-color: var(--ps-tooltip-background);
          color: var(--ps-tooltip-text);
          text-align: center;
          border-radius: var(--ps-tooltip-radius);
          padding: var(--ps-tooltip-padding-v) var(--ps-tooltip-padding-h);
          position: absolute;
          z-index: var(--ps-tooltip-z-index);
          bottom: 125%; /* Position above the tooltip */
          left: 50%;
          transform: translateX(-50%);
          opacity: 0;
          transition: opacity var(--ps-tooltip-animation-duration) var(--ps-tooltip-animation-easing);
          box-shadow: var(--ps-tooltip-shadow);
        }

        .tooltip:hover .tooltip-content,
        .tooltip:focus .tooltip-content {
          visibility: visible;
          opacity: 1;
        }

        .tooltip-arrow {
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -3px;
          border-width: var(--ps-tooltip-arrow-size);
          border-style: solid;
          border-color: var(--ps-tooltip-arrow-color) transparent transparent transparent;
        }
      `}</style>
      <div className={`tooltip ${className || ''}`} role="tooltip" aria-label={content}>
        {children}
        <div className="tooltip-content">
          {content}
          <div className="tooltip-arrow" />
        </div>
      </div>
    </>
  );
};

export default Tooltip;
