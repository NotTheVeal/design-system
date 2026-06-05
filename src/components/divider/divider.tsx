import React from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

type DividerWeight = 'subtle' | 'default' | 'strong';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  weight?: DividerWeight;
  color?: string;
  className?: string;
}

const WEIGHT_COLORS: Record<DividerWeight, string> = {
  subtle: '#EDEDED',
  default: '#CCCCCC',
  strong: '#999999',
};

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
        className={className}
        style={{ display: 'inline-block', alignSelf: 'stretch', width: 1, backgroundColor: lineColor }}
      />
    );
  }

  if (label) {
    return (
      <div role="separator" className={className} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1, height: 1, backgroundColor: lineColor }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: '#777777', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap', fontFamily }}>
          {label}
        </span>
        <div style={{ flex: 1, height: 1, backgroundColor: lineColor }} />
      </div>
    );
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={className}
      style={{ width: '100%', height: 1, backgroundColor: lineColor }}
    />
  );
};

export default Divider;
