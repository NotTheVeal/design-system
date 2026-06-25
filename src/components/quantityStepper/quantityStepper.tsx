import React from 'react';

const FONT = "'Source Sans 3', -apple-system, sans-serif";

export interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
  disabled?: boolean;
  className?: string;
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  value,
  onChange,
  min = 1,
  max,
  size = 'md',
  disabled = false,
  className = '',
}) => {
  const btnSize = size === 'sm' ? 24 : 32;
  const fontSize = size === 'sm' ? 13 : 14;

  const decrement = () => { if (!disabled && value > min) onChange(value - 1); };
  const increment = () => { if (!disabled && (max === undefined || value < max)) onChange(value + 1); };

  const atMin = value <= min;
  const atMax = max !== undefined && value >= max;

  const btnStyle = (inactive: boolean): React.CSSProperties => ({
    width: btnSize,
    height: btnSize,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #DCDCDC',
    borderRadius: 4,
    background: '#FFFFFF',
    color: (disabled || inactive) ? '#DCDCDC' : '#005BA6',
    cursor: (disabled || inactive) ? 'not-allowed' : 'pointer',
    fontFamily: FONT,
    fontSize: fontSize + 2,
    fontWeight: 400,
    lineHeight: 1,
    transition: 'all 120ms ease',
    flexShrink: 0,
    outline: 'none',
    padding: 0,
  });

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        opacity: disabled ? 0.5 : 1,
        fontFamily: FONT,
      }}
      aria-label="Quantity"
    >
      <button
        onClick={decrement}
        disabled={disabled || atMin}
        aria-label="Decrease quantity"
        style={btnStyle(atMin)}
      >
        −
      </button>
      <div
        style={{
          width: 40,
          height: btnSize,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #DCDCDC',
          borderRadius: 4,
          background: '#FFFFFF',
          fontFamily: FONT,
          fontSize,
          fontWeight: 600,
          color: '#4A4A4A',
          userSelect: 'none',
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </div>
      <button
        onClick={increment}
        disabled={disabled || atMax}
        aria-label="Increase quantity"
        style={btnStyle(atMax)}
      >
        +
      </button>
    </div>
  );
};

export default QuantityStepper;
