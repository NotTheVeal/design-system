import React, { useId } from 'react';

export type CheckboxColorScheme = 'current' | 'future';

export interface CheckboxProps {
  /**
   * Color scheme for the checkbox fill and focus ring.
   * Both colorSchemes use blue: current=blue#005BA6 | future=blue#005BA6
   * future is the preferred variant going forward.
   * @default 'future'
   */
  colorScheme?: CheckboxColorScheme;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: string;
  id?: string;
  onChange?: (v: boolean) => void;
  className?: string;
  [key: string]: unknown;
}

// Fix: both color schemes now use blue (orange #FF9505 removed in v1.2.x purge)
const C = {
  current: { fill: '#005BA6', focus: 'rgba(0,91,166,0.5)' },
  future:  { fill: '#005BA6', focus: 'rgba(0,91,166,0.5)' },
};

// Fix: font updated to 'Source Sans 3'
const FONT = "'Source Sans 3', -apple-system, sans-serif";

export const Checkbox: React.FC<CheckboxProps> = ({
  colorScheme = 'future',
  checked = false,
  indeterminate = false,
  disabled = false,
  label,
  id,
  onChange,
  className = '',
  ...rest
}) => {
  // A11y P0: generate a stable id for the label span so aria-labelledby can link to it
  const uid = useId();
  const labelId = label ? `${uid}-label` : undefined;

  const c = C[colorScheme];
  const bg = disabled ? '#F1F1F1' : checked || indeterminate ? c.fill : '#FFF';

  // Fix: unchecked border changes from #949494 (gray-500) → #CCCCCC (gray-400)
  const border = disabled
    ? '1.5px solid #DCDCDC'
    : checked || indeterminate
    ? `1.5px solid ${c.fill}`
    : '1.5px solid #CCCCCC';

  const onKD = (e: React.KeyboardEvent) => {
    if ((e.key === ' ' || e.key === 'Enter') && !disabled) {
      e.preventDefault();
      onChange?.(!checked);
    }
  };

  return (
    <div
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
      {/* A11y P0: aria-labelledby links this role="checkbox" to the visible label span */}
      <div
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        aria-disabled={disabled}
        aria-labelledby={labelId}
        tabIndex={disabled ? -1 : 0}
        id={id}
        style={{
          width: 24,
          height: 24,
          borderRadius: 2,
          border,
          background: bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'all 150ms ease',
          outline: 'none',
        }}
        onClick={() => !disabled && onChange?.(!checked)}
        onKeyDown={onKD}
        onFocus={e => {
          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 3px ${c.focus}`;
        }}
        onBlur={e => {
          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        }}
        {...rest}
      >
        {indeterminate && !checked && (
          <svg width="12" height="2" viewBox="0 0 12 2">
            <rect width="12" height="2" rx="1" fill="white" />
          </svg>
        )}
        {checked && !indeterminate && (
          <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
            <path
              d="M1 5L5.5 9.5L13 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
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
    </div>
  );
};

export default Checkbox;
