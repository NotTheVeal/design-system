import React, { useState, useRef, useEffect } from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

// One-time style injection for focus-within outline
const STYLE_ID = 'ps-select-styles';
const injectSelectStyles = () => {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .ps-select-option:hover { background: #F1F1F1; }
    .ps-select-option[aria-selected="true"] { background: #DCEAED; color: #005BA6; font-weight: 600; }
  `;
  document.head.appendChild(style);
};

interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SelectProps {
  options: (SelectOption | string)[];
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
}

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select an option',
  disabled = false,
  error,
  helperText,
  className = '',
}) => {
  if (typeof document !== 'undefined') injectSelectStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalise options
  const normalised: SelectOption[] = options.map(o =>
    typeof o === 'string' ? { label: o, value: o } : o
  );

  const selectedOption = normalised.find(o => o.value === value);
  const hasValue = !!selectedOption;
  const isFloating = focused || isOpen || hasValue;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const borderColor = error ? '#D32F2F' : focused || isOpen ? '#005BA6' : '#DCDCDC';

  const handleSelect = (opt: SelectOption) => {
    if (opt.disabled) return;
    onChange(opt.value);
    setIsOpen(false);
    setFocused(false);
  };

  return (
    <div ref={containerRef} className={className} style={{ width: '100%', fontFamily }}>
      {/* Trigger */}
      <div
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={() => { if (!disabled) { setIsOpen(!isOpen); setFocused(true); } }}
        onFocus={() => setFocused(true)}
        onBlur={() => { if (!isOpen) setFocused(false); }}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (!disabled) setIsOpen(!isOpen); }
          if (e.key === 'Escape') { setIsOpen(false); setFocused(false); }
        }}
        style={{
          position: 'relative',
          height: 48,
          border: `1px solid ${borderColor}`,
          borderRadius: 4,
          background: disabled ? '#FAFAFA' : '#FFFFFF',
          cursor: disabled ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          padding: '0 36px 0 12px',
          outline: 'none',
          transition: 'border-color 150ms ease',
          boxShadow: focused || isOpen ? '0 0 0 3px rgba(0,147,244,0.3)' : 'none',
          fontFamily,
        }}
      >
        {/* Floating label */}
        {label && (
          <span style={{
            position: 'absolute',
            left: 12,
            top: isFloating ? 6 : '50%',
            transform: isFloating ? 'none' : 'translateY(-50%)',
            fontSize: isFloating ? 11 : 16,
            fontWeight: isFloating ? 600 : 400,
            color: error ? '#D32F2F' : focused || isOpen ? '#005BA6' : '#777777',
            transition: 'all 150ms ease',
            pointerEvents: 'none',
            fontFamily,
          }}>
            {label}
          </span>
        )}

        {/* Selected value */}
        <span style={{
          fontSize: 16,
          color: hasValue ? '#2B2B2B' : '#949494',
          marginTop: label && isFloating ? 10 : 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontFamily,
          opacity: disabled ? 0.5 : 1,
        }}>
          {hasValue ? selectedOption!.label : (!label ? placeholder : '')}
        </span>

        {/* Chevron */}
        <span style={{
          position: 'absolute',
          right: 10,
          top: '50%',
          transform: `translateY(-50%) rotate(${isOpen ? 180 : 0}deg)`,
          transition: 'transform 150ms ease',
          color: disabled ? '#BBBBBB' : '#4A4A4A',
          display: 'flex',
          pointerEvents: 'none',
        }}>
          <ChevronDown />
        </span>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            zIndex: 200,
            width: containerRef.current?.offsetWidth ?? 'auto',
            marginTop: 4,
            background: '#FFFFFF',
            border: '1px solid #DCDCDC',
            borderRadius: 4,
            boxShadow: '0 6px 20px rgba(0,47,72,0.15)',
            maxHeight: 240,
            overflowY: 'auto',
            fontFamily,
          }}
        >
          {normalised.map(opt => (
            <div
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className="ps-select-option"
              onClick={() => handleSelect(opt)}
              style={{
                padding: '10px 12px',
                fontSize: 14,
                color: opt.disabled ? '#BBBBBB' : '#2B2B2B',
                cursor: opt.disabled ? 'not-allowed' : 'pointer',
                fontFamily,
                transition: 'background 100ms ease',
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}

      {/* Helper / Error text */}
      {(error || helperText) && (
        <p style={{
          margin: '4px 0 0',
          fontSize: 12,
          color: error ? '#D32F2F' : '#777777',
          fontFamily,
        }}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Select;
