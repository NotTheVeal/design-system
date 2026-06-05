import React, { useState } from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterProps {
  label?: string;
  options?: FilterOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  onClick?: () => void;
  className?: string;
}

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 6 8 10 12 6" />
  </svg>
);

const Filter: React.FC<FilterProps> = ({
  label,
  options = [],
  value,
  defaultValue = [],
  onChange,
  onClick,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const [hovered, setHovered] = useState(false);

  const controlled = value !== undefined;
  const currentValue = controlled ? value! : internalValue;

  const activeCount = currentValue.length;
  const isActive = activeCount > 0;

  const handleToggle = () => {
    setIsOpen(prev => !prev);
    onClick?.();
  };

  const handleOptionClick = (optValue: string) => {
    const next = currentValue.includes(optValue)
      ? currentValue.filter(v => v !== optValue)
      : [...currentValue, optValue];
    if (!controlled) setInternalValue(next);
    onChange?.(next);
  };

  return (
    <div className={className} style={{ position: 'relative', display: 'inline-block', fontFamily }}>
      <button
        type="button"
        onClick={handleToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          height: 36,
          padding: '0 12px',
          background: isActive ? '#005BA6' : '#FFFFFF',
          border: `1px solid ${isActive ? '#005BA6' : hovered ? '#949494' : '#DCDCDC'}`,
          borderRadius: 4,
          fontSize: 14,
          fontWeight: isActive ? 600 : 400,
          color: isActive ? '#FFFFFF' : '#4A4A4A',
          cursor: 'pointer',
          fontFamily,
          transition: 'border-color 150ms ease, background 150ms ease',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
        {isActive && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.3)',
              fontSize: 11,
              fontWeight: 700,
              color: '#FFFFFF',
            }}
          >
            {activeCount}
          </span>
        )}
        <ChevronIcon />
      </button>

      {isOpen && options.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            zIndex: 100,
            background: '#FFFFFF',
            border: '1px solid #DCDCDC',
            borderRadius: 4,
            boxShadow: '0 2px 10px rgba(0,47,72,0.10)',
            minWidth: 180,
            padding: '4px 0',
          }}
        >
          {options.map(opt => {
            const selected = currentValue.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleOptionClick(opt.value)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  width: '100%',
                  padding: '8px 12px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 14,
                  color: selected ? '#005BA6' : '#4A4A4A',
                  fontWeight: selected ? 600 : 400,
                  textAlign: 'left',
                  fontFamily,
                }}
              >
                <span
                  style={{
                    width: 16,
                    height: 16,
                    border: `1.5px solid ${selected ? '#005BA6' : '#DCDCDC'}`,
                    borderRadius: 2,
                    background: selected ? '#005BA6' : '#FFFFFF',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {selected && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="1.5 5 4 7.5 8.5 2.5" />
                    </svg>
                  )}
                </span>
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Filter;
