import React from 'react';

type DividerWeight = 'subtle' | 'default' | 'strong';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  weight?: DividerWeight;
  /** Override color directly — prefer using `weight` for semantic variants */
  color?: string;
  className?: string;
}

const WEIGHT_COLORS: Record<DividerWeight, string> = {
  subtle:  '#EDEDED',  // Inside cards and panels on white backgrounds
  default: '#CCCCCC',  // Standard divider on page backgrounds — most common
  strong:  '#999999',  // High-contrast for dense tables and data grids
};

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  label,
  weight = 'default',
  color,
  className = '',
}) => {
  const lineColor = color ?? WEIGHT_COLORS[weight];

  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={`inline-block self-stretch w-px ${className}`}
        style={{ backgroundColor: lineColor }}
      />
    );
  }

  if (label) {
    return (
      <div role="separator" className={`flex items-center gap-3 ${className}`}>
        <div className="flex-1 h-px" style={{ backgroundColor: lineColor }} />
        <span
          className="text-[12px] font-semibold text-[#777777] uppercase tracking-wide whitespace-nowrap"
          style={{ fontFamily }}
        >
          {label}
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: lineColor }} />
      </div>
    );
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={`w-full h-px ${className}`}
      style={{ backgroundColor: lineColor }}
    />
  );
};

export default Divider;
