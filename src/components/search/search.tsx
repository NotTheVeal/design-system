import React, { useState, useRef } from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="5.5" />
    <line x1="12.5" y1="12.5" x2="16" y2="16" />
  </svg>
);

const ClearIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="4" x2="12" y2="12" /><line x1="12" y1="4" x2="4" y2="12" />
  </svg>
);

interface SearchProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

const Search: React.FC<SearchProps> = ({
  value,
  defaultValue = '',
  onChange,
  onSearch,
  placeholder = 'Searchâ¦',
  disabled = false,
  className = '',
  id,
}) => {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const controlled = value !== undefined;
  const currentValue = controlled ? value : internalValue;

  const borderColor = focused
    ? '#005BA6'
    : hovered && !disabled
    ? '#949494'
    : '#DCDCDC';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!controlled) setInternalValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleClear = () => {
    if (!controlled) setInternalValue('');
    onChange?.('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch?.(currentValue);
  };

  const inputId = id ?? 'ps-search';

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        height: 48,
        border: `1px solid ${borderColor}`,
        borderRadius: 4,
        background: disabled ? '#F1F1F1' : '#FFFFFF',
        boxShadow: focused ? '0 0 0 3px rgba(0,147,244,0.3)' : 'none',
        transition: 'border-color 150ms ease, box-shadow 150ms ease',
        fontFamily,
      }}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Search icon */}
      <span style={{ paddingLeft: 12, paddingRight: 8, color: focused ? '#005BA6' : '#949494', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <SearchIcon />
      </span>

      {/* Input */}
      <input
        ref={inputRef}
        id={inputId}
        type="search"
        value={currentValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        placeholder={placeholder}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          background: 'transparent',
          fontSize: 16,
          color: disabled ? '#777777' : '#2B2B2B',
          fontFamily,
          padding: '0 8px 0 0',
          cursor: disabled ? 'not-allowed' : undefined,
        }}
      />

      {/* Clear button */}
      {currentValue && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          style={{
            background: 'none',
            border: 'none',
            padding: '0 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            color: '#949494',
            flexShrink: 0,
          }}
        >
          <ClearIcon />
        </button>
      )}
    </div>
  );
};

export default Search;
