import React from 'react';

export interface FilterChipProps {
  label: string;
  selected?: boolean;
  onToggle?: (selected: boolean) => void;
  onRemove?: () => void;
  disabled?: boolean;
  count?: number;
  icon?: React.ReactNode;
  className?: string;
}

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  selected = false,
  onToggle,
  onRemove,
  disabled = false,
  count,
  icon,
  className = '',
}) => {
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const [hovered, setHovered] = React.useState(false);

  const bg = selected ? '#DCEAED' : hovered && !disabled ? '#F1F1F1' : '#FFFFFF';
  const border = selected ? '#005BA6' : '#DCDCDC';
  const color = selected ? '#005BA6' : '#4A4A4A';

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: 32,
        padding: onRemove ? '0 6px 0 12px' : '0 12px',
        borderRadius: 100,
        border: '1px solid ' + border,
        background: bg,
        color,
        fontFamily: font,
        fontSize: 13,
        fontWeight: selected ? 600 : 400,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 150ms ease',
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => !disabled && !onRemove && onToggle?.(!selected)}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      <span>{label}</span>
      {count !== undefined && (
        <span style={{ fontSize: 11, fontWeight: 700, background: selected ? '#005BA6' : '#DCDCDC', color: selected ? 'white' : '#4A4A4A', borderRadius: 100, padding: '1px 6px', lineHeight: 1.4 }}>
          {count}
        </span>
      )}
      {onRemove && (
        <button
          onClick={e => { e.stopPropagation(); !disabled && onRemove(); }}
          style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer', color: selected ? '#005BA6' : '#949494', padding: 2, borderRadius: '50%', marginLeft: 2 }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,91,166,0.1)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'none')}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export default FilterChip;
