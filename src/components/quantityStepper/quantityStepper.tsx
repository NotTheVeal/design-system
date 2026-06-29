import React from 'react';

export interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

// PS Design System QuantityStepper — from Cart component:
// 32px button height, white bg, #DCDCDC border, 4px radius
// − and + buttons, number in center
// Hover: #F1F1F1 bg on buttons

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  value, min = 0, max = 9999, step = 1, onChange, disabled = false, size = 'md', className = '',
}) => {
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const h = size === 'sm' ? 28 : 32;
  const btnW = h;
  const inputW = size === 'sm' ? 36 : 44;

  const decrement = () => { if (value - step >= min) onChange(value - step); };
  const increment = () => { if (value + step <= max) onChange(value + step); };

  const btnStyle = (active: boolean): React.CSSProperties => ({
    width: btnW, height: h,
    background: '#FFFFFF', border: '1px solid #DCDCDC',
    cursor: disabled || !active ? 'not-allowed' : 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: disabled || !active ? '#DCDCDC' : '#4A4A4A',
    fontSize: 18, fontWeight: 400, fontFamily: font,
    transition: 'background 150ms ease',
    opacity: disabled ? 0.5 : 1,
    flexShrink: 0,
  });

  return (
    <div
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 4, overflow: 'hidden' }}
    >
      <button
        onClick={decrement}
        disabled={disabled || value <= min}
        style={{ ...btnStyle(value > min), borderRadius: '4px 0 0 4px', borderRight: 'none' }}
        aria-label="Decrease quantity"
        onMouseEnter={e => { if (!disabled && value > min) e.currentTarget.style.background = '#F1F1F1'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF'; }}
      >
        −
      </button>
      <input
        type="number"
        value={value}
        min={min} max={max}
        disabled={disabled}
        onChange={e => {
          const n = parseInt(e.target.value);
          if (!isNaN(n) && n >= min && n <= max) onChange(n);
        }}
        style={{
          width: inputW, height: h,
          border: '1px solid #DCDCDC', borderLeft: 'none', borderRight: 'none',
          textAlign: 'center', fontSize: 14, fontFamily: font, color: '#4A4A4A',
          fontWeight: 600, background: '#FFFFFF', outline: 'none',
          MozAppearance: 'textfield',
        }}
        aria-label="Quantity"
      />
      <button
        onClick={increment}
        disabled={disabled || value >= max}
        style={{ ...btnStyle(value < max), borderRadius: '0 4px 4px 0', borderLeft: 'none' }}
        aria-label="Increase quantity"
        onMouseEnter={e => { if (!disabled && value < max) e.currentTarget.style.background = '#F1F1F1'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF'; }}
      >
        +
      </button>
    </div>
  );
};

export default QuantityStepper;
