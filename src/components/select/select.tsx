import React, { useState, useRef, useEffect, useId, forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

// Fix: updated to 'Source Sans 3' (Source Sans Pro is deprecated)
const FONT = "'Source Sans 3', -apple-system, sans-serif";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  searchable?: boolean;
  size?: 'default' | 'sm';
  className?: string;
}

// PS Design System 2.0 spec values:
// Idle border:           #DCDCDC  (Border default)
// Hover border:          #4A4A4A
// Error border:          #D32F2F
// Dropdown item hover:   #F1F1F1
// Height (default):      48px     (spec: standard input height)
// Chevron size:          24px     (icon grid spec)
// Chevron strokeWidth:   1.75     (all Lucide icons)

export const Select = forwardRef<HTMLDivElement, SelectProps>(function Select(
  {
    label,
    options,
    value,
    onChange,
    placeholder = 'Select an option',
    disabled = false,
    error,
    searchable = false,
    size = 'default',
    className,
  },
  ref
) {
  const generatedId = useId();
  const selectId = generatedId;
  const labelId = `${selectId}-label`;
  const listboxId = `${selectId}-listbox`;
  const errorId = `${selectId}-error`;

  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  const filteredOptions = searchable
    ? options.filter((o) =>
        o.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && searchable && searchRef.current) {
      searchRef.current.focus();
    }
  }, [open, searchable]);

  const handleToggle = () => {
    if (!disabled) {
      setOpen((prev) => !prev);
      if (open) setSearchQuery('');
    }
  };

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return;
    onChange?.(option.value);
    setOpen(false);
    setSearchQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
    if (e.key === 'Escape') {
      setOpen(false);
      setSearchQuery('');
    }
    if (e.key === 'ArrowDown' && open) {
      e.preventDefault();
      const idx = filteredOptions.findIndex((o) => o.value === hoveredOption);
      const next = filteredOptions[idx + 1];
      if (next && !next.disabled) setHoveredOption(next.value);
    }
    if (e.key === 'ArrowUp' && open) {
      e.preventDefault();
      const idx = filteredOptions.findIndex((o) => o.value === hoveredOption);
      const prev = filteredOptions[idx - 1];
      if (prev && !prev.disabled) setHoveredOption(prev.value);
    }
    if (e.key === 'Enter' && open && hoveredOption) {
      const opt = filteredOptions.find((o) => o.value === hoveredOption);
      if (opt && !opt.disabled) handleSelect(opt);
    }
  };

  // Border logic per PS Design System 2.0:
  // idle:     #DCDCDC (Border default)
  // hover:    #4A4A4A (Text primary, slightly elevated for hover)
  // error:    #D32F2F (spec: Error border)
  // focus:    #005BA6 (PS Blue)
  // disabled: #DCDCDC
  const getBorderColor = () => {
    if (disabled) return '#DCDCDC';
    if (error) return '#D32F2F';
    if (open || focused) return '#005BA6';
    if (hovered) return '#4A4A4A';
    return '#DCDCDC';
  };

  const height = size === 'sm' ? 32 : 48;  // spec: 48px standard height
  const fontSize = size === 'sm' ? 13 : 15;

  const triggerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height,
    padding: size === 'sm' ? '0 10px' : '0 12px',
    border: `1px solid ${getBorderColor()}`,
    borderRadius: 4,
    backgroundColor: disabled ? '#F1F1F1' : '#FFFFFF',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: FONT,
    fontSize,
    color: disabled ? '#949494' : selectedOption ? '#4A4A4A' : '#777777',
    outline: 'none',
    transition: 'border-color 0.15s ease',
    userSelect: 'none',
    boxSizing: 'border-box',
    width: '100%',
  };

  const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: 4,
    backgroundColor: '#FFFFFF',
    border: '1px solid #DCDCDC',
    borderRadius: 4,
    boxShadow: '0 4px 12px rgba(0,47,72,0.12)',
    zIndex: 1000,
    maxHeight: 240,
    overflowY: 'auto',
  };

  const getOptionStyle = (option: SelectOption): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    padding: size === 'sm' ? '6px 10px' : '8px 12px',
    fontFamily: FONT,
    fontSize,
    color: option.disabled ? '#AAAAAA' : '#4A4A4A',
    cursor: option.disabled ? 'not-allowed' : 'pointer',
    // CORRECTED hover bg: #F1F1F1 (was #FAFAFA — too subtle)
    backgroundColor:
      hoveredOption === option.value && !option.disabled
        ? '#F1F1F1'
        : option.value === value
        ? '#EFF9FE'
        : 'transparent',
    fontWeight: option.value === value ? 600 : 400,
    transition: 'background-color 0.1s ease',
  });

  return (
    <div
      ref={(node) => {
        // Merge forwarded ref with internal containerRef
        containerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      style={{ position: 'relative', width: '100%', fontFamily: FONT }}
      className={className}
    >
      {label && (
        <label
          id={labelId}
          htmlFor={selectId}
          style={{
            display: 'block',
            marginBottom: 4,
            fontFamily: FONT,
            fontSize: 13,
            fontWeight: 600,
            color: disabled ? '#AAAAAA' : '#4A4A4A',
          }}
        >
          {label}
        </label>
      )}

      {/* Custom combobox trigger — id links to label via htmlFor (WCAG 1.3.1) */}
      <div
        id={selectId}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-labelledby={label ? labelId : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        tabIndex={disabled ? -1 : 0}
        style={triggerStyle}
        onClick={handleToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKeyDown}
      >
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        {/* CORRECTED chevron size: 24px (was 20px), strokeWidth 1.75 (unchanged) */}
        <ChevronDown
          size={24}
          strokeWidth={1.75}
          style={{
            flexShrink: 0,
            marginLeft: 8,
            color: disabled ? '#AAAAAA' : '#4A4A4A',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        />
      </div>

      {open && (
        <div id={listboxId} style={dropdownStyle} role="listbox">
          {searchable && (
            <div style={{ padding: '8px 12px', borderBottom: '1px solid #DCDCDC' }}>
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                style={{
                  width: '100%',
                  border: '1px solid #DCDCDC',
                  borderRadius: 4,
                  padding: '4px 8px',
                  fontFamily: FONT,
                  fontSize,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          )}

          {filteredOptions.length === 0 ? (
            <div
              style={{
                padding: '8px 12px',
                fontFamily: FONT,
                fontSize,
                color: '#777777',
                textAlign: 'center',
              }}
            >
              No options found
            </div>
          ) : (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                aria-disabled={option.disabled}
                style={getOptionStyle(option)}
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setHoveredOption(option.value)}
                onMouseLeave={() => setHoveredOption(null)}
              >
                {option.label}
              </div>
            ))
          )}
        </div>
      )}

      {error && (
        <span
          id={errorId}
          role="alert"
          style={{
            display: 'block',
            marginTop: 4,
            fontFamily: FONT,
            fontSize: 12,
            color: '#D32F2F',
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
});

export default Select;
