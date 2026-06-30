import React from 'react';

export interface FilterChipProps {
  label: string;
  selected?: boolean;
  onSelect?: () => void;
  onRemove?: () => void;
  disabled?: boolean;
  count?: number;
  icon?: React.ReactNode;
  className?: string;
}

// PS Design System FilterChip — Pill Filter Tabs spec:
// 30px height, pill (100px radius), 1px border
// Default: white bg, #949494 border, #777777 text
// Selected: #005BA6 fill, white text, × dismiss button
// Hover: #005BA6 border, blue text

export const FilterChip: React.FC<FilterChipProps> = ({
  label, selected = false, onSelect, onRemove, disabled = false, count, icon, className = '',
}) => {
  const [hovered, setHovered] = React.useState(false);
  const font = "'Source Sans Pro', -apple-system, sans-serif";

  const bg     = selected ? '#005BA6' : '#FFFFFF';
  const color  = selected ? '#FFFFFF' : hovered ? '#005BA6' : '#777777';
  const border = selected ? 'none' : `1px solid ${hovered ? '#005BA6' : '#949494'}`;

  return (
    <>
      {/* WCAG 2.4.7: inject focus-visible ring for ps-chip buttons */}
      <style>{`.ps-chip:focus-visible { outline: 2px solid #005BA6; outline-offset: 2px; }`}</style>
      <span
        className={`ps-chip${className ? ' ' + className : ''}`}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-pressed={selected}
        aria-disabled={disabled}
        onClick={() => !disabled && onSelect?.()}
        onMouseEnter={() => !disabled && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onKeyDown={e => { if (!disabled && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onSelect?.(); } }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          height: 30,
          padding: selected && onRemove ? '0 6px 0 14px' : '0 14px',
          borderRadius: 100,          // pill
          border, background: bg,
          fontFamily: font, fontSize: 14, fontWeight: selected ? 600 : 400,
          color,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          transition: 'all 150ms ease',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        {icon && <span style={{ display:'flex', alignItems:'center', flexShrink:0 }}>{icon}</span>}
        <span>{label}</span>
        {count !== undefined && (
          <span style={{
            background: selected ? 'rgba(255,255,255,0.25)' : '#DCDCDC',
            color: selected ? '#FFFFFF' : '#4A4A4A',
            fontSize: 11, fontWeight: 700, borderRadius: 100,
            padding: '0 5px', minWidth: 16, textAlign: 'center',
          }}>{count}</span>
        )}
        {selected && onRemove && (
          <button
            onClick={e => { e.stopPropagation(); onRemove(); }}
            style={{
              background: 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer',
              width: 18, height: 18, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#FFFFFF', padding: 0, flexShrink: 0,
            }}
            aria-label={`Remove ${label} filter`}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
      </span>
    </>
  );
};

export default FilterChip;
