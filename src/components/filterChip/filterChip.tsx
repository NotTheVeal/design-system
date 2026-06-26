import React from 'react';

export interface FilterChipProps {
  label: string;
  selected?: boolean;
  onToggle?: (selected: boolean) => void;
  count?: number;
  disabled?: boolean;
  className?: string;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  selected = false,
  onToggle,
  count,
  disabled = false,
  className = '',
}) => {
  const font = "'Source Sans Pro', -apple-system, sans-serif";

  return (
    <span
      className={className}
      onClick={() => !disabled && onToggle && onToggle(!selected)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: 32,
        padding: '0 12px',
        borderRadius: 100,
        border: '1px solid ' + (selected ? '#005BA6' : '#DCDCDC'),
        background: selected ? '#DCEAED' : '#FFFFFF',
        color: selected ? '#005BA6' : '#4A4A4A',
        fontFamily: font,
        fontSize: 13,
        fontWeight: selected ? 600 : 400,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 150ms ease',
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
      {count !== undefined && (
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          background: selected ? '#005BA6' : '#DCDCDC',
          color: selected ? 'white' : '#4A4A4A',
          borderRadius: 100,
          padding: '1px 6px',
        }}>
          {count}
        </span>
      )}
    </span>
  );
};

export default FilterChip;
