import React, { useState, useRef } from 'react';

export interface SearchProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onSubmit?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'autocomplete' | 'filter';
  disabled?: boolean;
  className?: string;
  autoFocus?: boolean;
  id?: string;
  name?: string;
}

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ClearIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const heightMap = { sm: 36, md: 48, lg: 56 };
const fontSizeMap = { sm: 13, md: 14, lg: 15 };

export const Search: React.FC<SearchProps> = ({
  value,
  defaultValue = '',
  onChange,
  onFocus,
  onBlur,
  onSubmit,
  onClear,
  placeholder = 'Search...',
  size = 'md',
  variant = 'default',
  disabled = false,
  className = '',
  autoFocus,
  id,
  name,
}) => {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const font = "'Source Sans Pro', -apple-system, sans-serif";

  const currentValue = value !== undefined ? value : internalValue;
  const height = heightMap[size];
  const fontSize = fontSizeMap[size];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) setInternalValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSubmit?.(currentValue);
    if (e.key === 'Escape') { handleClear(); }
  };

  const handleClear = () => {
    if (value === undefined) setInternalValue('');
    onChange?.('');
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        width: '100%',
        height,
        border: `1px solid ${focused ? '#005BA6' : '#DCDCDC'}`,
        borderRadius: 4,
        background: disabled ? '#F1F1F1' : '#FFFFFF',
        transition: 'border-color 150ms ease',
        fontFamily: font,
        boxSizing: 'border-box',
      }}
    >
      {/* Search icon */}
      <span style={{ position: 'absolute', left: 10, color: focused ? '#005BA6' : '#949494', display: 'flex', alignItems: 'center', pointerEvents: 'none', transition: 'color 150ms ease' }}>
        <SearchIcon />
      </span>

      <input
        ref={inputRef}
        id={id}
        name={name}
        type="search"
        value={currentValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          outline: 'none',
          background: 'transparent',
          padding: `0 ${currentValue ? 36 : 12}px 0 36px`,
          fontSize,
          color: '#4A4A4A',
          fontFamily: font,
          cursor: disabled ? 'not-allowed' : 'text',
        }}
      />

      {/* Clear button */}
      {currentValue && !disabled && (
        <button
          onClick={handleClear}
          type="button"
          style={{ position: 'absolute', right: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#949494', display: 'flex', alignItems: 'center', padding: 4, borderRadius: 2 }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#4A4A4A')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#949494')}
        >
          <ClearIcon />
        </button>
      )}
    </div>
  );
};

export default Search;
