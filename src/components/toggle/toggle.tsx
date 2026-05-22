import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label: string;
  className?: string;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, disabled = false, label, className }) => {
  return (
    <div className={`toggle-container ${className}`}>
      <style>{`
        :root {
          --ps-primary-color: #005BA6;
          --ps-track-off-color: #DCDCDC;
          --ps-track-on-color: var(--ps-primary-color);
          --ps-thumb-color: #ffffff;
          --ps-thumb-disabled-color: var(--ps-track-off-color);
          --ps-label-color: #002F48;
          --ps-label-disabled-color: var(--ps-track-off-color);
          --ps-track-width: 44px;
          --ps-track-height: 24px;
          --ps-thumb-size: 18px;
          --ps-thumb-offset: 3px;
          --ps-label-gap: 8px;
          --ps-border-radius-track: 30px;
          --ps-border-radius-thumb: 50%;
          --ps-transition-duration: 200ms;
        }
        .toggle-container {
          display: flex;
          align-items: center;
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
          opacity: ${disabled ? '0.5' : '1'};
        }
        .toggle-label {
          margin-left: var(--ps-label-gap);
          color: ${disabled ? 'var(--ps-label-disabled-color)' : 'var(--ps-label-color)'};
        }
        .toggle-track {
          width: var(--ps-track-width);
          height: var(--ps-track-height);
          background-color: ${checked ? 'var(--ps-track-on-color)' : 'var(--ps-track-off-color)'};
          border-radius: var(--ps-border-radius-track);
          position: relative;
          transition: background-color var(--ps-transition-duration);
        }
        .toggle-thumb {
          width: var(--ps-thumb-size);
          height: var(--ps-thumb-size);
          background-color: ${disabled ? 'var(--ps-thumb-disabled-color)' : 'var(--ps-thumb-color)'};
          border-radius: var(--ps-border-radius-thumb);
          position: absolute;
          top: 50%;
          left: ${checked ? `calc(100% - var(--ps-thumb-size) - var(--ps-thumb-offset))` : '0'};
          transform: translateY(-50%);
          transition: left var(--ps-transition-duration);
        }
        .toggle-track:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(0, 147, 244, 0.3);
        }
        .toggle-track:hover {
          background-color: ${checked ? 'var(--ps-primary-color)' : 'var(--ps-track-off-color)'};
        }
      `}</style>
      <div
        className="toggle-track"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        tabIndex={0}
        onClick={() => !disabled && onChange(!checked)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            !disabled && onChange(!checked);
          }
        }}
        disabled={disabled}
      >
        <div className="toggle-thumb" />
      </div>
      <span className="toggle-label">{label}</span>
    </div>
  );
};

export default Toggle;
