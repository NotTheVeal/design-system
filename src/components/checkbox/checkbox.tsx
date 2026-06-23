import React from 'react';
import { Check, Minus } from 'lucide-react';

export type CheckboxColorScheme = 'current' | 'future';
export type CheckboxState = 'unchecked' | 'checked' | 'indeterminate' | 'disabled';

export interface CheckboxProps {
  /**
   * current = ORANGE #FF9505 (Figma spec, live product) — DEFAULT
   * future = PS Blue #005BA6 (planned direction)
   */
  colorScheme?: CheckboxColorScheme;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: string;
  helperText?: string;
  error?: string;
  id?: string;
  onChange?: (checked: boolean) => void;
  className?: string;
}

const COLORS = {
  current: {
    checked: '#FF9505',      // Orange — Figma spec
    checkedBorder: '#FF9505',
    hoverBorder: '#EC8000',
    focus: 'rgba(255,149,5,0.35)',
  },
  future: {
    checked: '#005BA6',       // PS Blue — future
    checkedBorder: '#005BA6',
    hoverBorder: '#004A84',
    focus: 'rgba(0,147,244,0.3)',
  },
};

export const Checkbox: React.FC<CheckboxProps> = ({
  colorScheme = 'current',
  checked = false,
  indeterminate = false,
  disabled = false,
  label,
  helperText,
  error,
  id,
  onChange,
  className = '',
}) => {
  const c = COLORS[colorScheme];
  const isActive = checked || indeterminate;
  const bg = disabled ? '#F1F1F1' : isActive ? c.checked : '#FFFFFF';
  const border = disabled ? '1.5px solid #DCDCDC' : error ? '1.5px solid #FF0000' : isActive ? `1.5px solid ${c.checkedBorder}` : '1.5px solid #CCCCCC';
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 4, fontFamily: "'Source Sans 3', -apple-system, sans-serif" }} className={className}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }} onClick={() => !disabled && onChange?.(!checked)}>
        <div role="checkbox" aria-checked={indeterminate ? 'mixed' : checked} tabIndex={disabled ? -1 : 0} id={id} style={{ width: 24, height: 24, borderRadius: 2, border, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 150ms ease', outline: 'none' }}>
          {checked && !indeterminate && <Check size={14} strokeWidth={1.75} color="white" aria-hidden="true" />}
          {indeterminate && !checked && <Minus size={14} strokeWidth={1.75} color="white" aria-hidden="true" />}
        </div>
        {label && <span style={{ fontSize: 14, color: disabled ? '#949494' : error ? '#FF0000' : '#4A4A4A' }}>{label}</span>}
      </div>
      {helperText && !error && <span style={{ fontSize: 12, color: '#777777', paddingLeft: 32 }}>{helperText}</span>}
      {error && <span style={{ fontSize: 12, color: '#FF0000', paddingLeft: 32 }}>{error}</span>}
    </div>
  );
};
export default Checkbox;
