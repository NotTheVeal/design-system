import React from 'react';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  className?: string;
  color?: string;
}

const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  label,
  className = '',
  color = '#DCDCDC',
}) => {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={`inline-block self-stretch w-px ${className}`}
        style={{ backgroundColor: color }}
      />
    );
  }

  if (label) {
    return (
      <div role="separator" className={`flex items-center gap-3 ${className}`}>
        <div className="flex-1 h-px" style={{ backgroundColor: color }} />
        <span className="text-[12px] font-semibold text-[#777777] uppercase tracking-wide whitespace-nowrap">
          {label}
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: color }} />
      </div>
    );
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={`w-full h-px ${className}`}
      style={{ backgroundColor: color }}
    />
  );
};

export default Divider;
