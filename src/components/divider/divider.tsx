import React from 'react';

interface DividerProps {
  className?: string;
  label?: string;
}

const Divider: React.FC<DividerProps> = ({ className, label }) => {
  return (
    <div className={`divider ${className}`} role="separator" aria-label={label}>
      {label && <span className="divider-label">{label}</span>}
      <style jsx>{`
        :root {
          --ps-divider-color: {semantic.color.border.default};
          --ps-divider-color-strong: {semantic.color.border.strong};
          --ps-divider-weight: 1px;
          --ps-divider-weight-thick: 2px;
          --ps-divider-margin-v: 16px;
          --ps-divider-margin-h: 0;
          --ps-divider-label-text: {semantic.color.text.tertiary};
          --ps-divider-label-font-size: 12px;
          --ps-divider-label-padding-h: 8px;
        }
        .divider {
          margin: var(--ps-divider-margin-v) var(--ps-divider-margin-h);
          border-bottom: var(--ps-divider-weight) solid var(--ps-divider-color);
          position: relative;
        }
        .divider-label {
          font-family: 'Source Sans Pro', sans-serif;
          font-size: var(--ps-divider-label-font-size);
          color: var(--ps-divider-label-text);
          padding: 0 var(--ps-divider-label-padding-h);
          background: white;
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
        }
      `}</style>
    </div>
  );
};

export default Divider;
