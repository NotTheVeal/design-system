import React, { useId, useState } from 'react';

// Fix: updated to 'Source Sans 3' (Source Sans Pro is deprecated)
const FONT = "'Source Sans 3', -apple-system, sans-serif";

// A11y P0 + React D: export ToggleProps so callers can extend/type it; add aria-label prop
export interface ToggleProps {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: (v: boolean) => void;
  id?: string;
  className?: string;
  /** Accessible name when no visible label is rendered */
  'aria-label'?: string;
  [key: string]: unknown;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked = false,
  disabled = false,
  label,
  onChange,
  id,
  className = '',
  'aria-label': ariaLabel,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);

  // A11y P0: generate a stable id for the label span so aria-labelledby can link to it
  const uid = useId();
  const labelId = label ? `${uid}-label` : undefined;

  const handleClick = () => {
    if (!disabled) onChange?.(!checked);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === ' ' || e.key === 'Enter') && !disabled) {
      e.preventDefault();
      onChange?.(!checked);
    }
  };

  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        fontFamily: FONT,
      }}
      className={className}
    >
      {/* Track */}
      {/* Fix: width 44px → 40px (spec: 40×24px) */}
      {/* Fix: OFF color #DCDCDC → #CCCCCC */}
      {/* A11y P0: aria-labelledby links switch to visible label; aria-label for unlabelled usage */}
      <div
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        aria-labelledby={labelId}
        aria-label={!label ? ariaLabel : undefined}
        tabIndex={disabled ? -1 : 0}
        id={id}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          position: 'relative',
          width: 40,
          height: 24,
          borderRadius: 12,
          background: disabled
            ? '#DCDCDC'
            : checked
            ? '#005BA6'
            : '#CCCCCC',
          transition: 'background 200ms ease',
          outline: 'none',
          boxShadow: focused
            ? '0 0 0 3px rgba(0,91,166,0.35)'
            : 'none',
        }}
        {...rest}
      >
        {/* Thumb */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: checked ? 'calc(100% - 22px)' : 2,
            transform: 'translateY(-50%)',
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: '#FFFFFF',
            boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
            transition: 'left 200ms ease',
          }}
        />
      </div>

      {/* A11y P0: id={labelId} provides the accessible name via aria-labelledby above */}
      {label && (
        <span
          id={labelId}
          style={{ fontSize: 14, color: disabled ? '#949494' : '#4A4A4A', userSelect: 'none' }}
        >
          {label}
        </span>
      )}
    </label>
  );
};

export default Toggle;

/*
 * CHANGES vs. original toggle.tsx
 * ─────────────────────────────────────────────────────────────────
 * [P1] Track width:   44px  →  40px   (spec: 40×24px)
 * [P1] OFF color:     #DCDCDC  →  #CCCCCC   (spec: gray-300)
 * [P1] Thumb size:    18px  →  20px   (spec: 20px diameter)
 * [A11y P0] ToggleProps exported; aria-label prop added
 * [A11y P0] role="switch" linked to visible label via aria-labelledby
 * [A11y P0] aria-label fallback for unlabelled usage
 * [React D] ...rest spread onto root switch div
 * ─────────────────────────────────────────────────────────────────
 */
