import React from 'react';

export interface SearchProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

// PS Design System Search:
// 48px md, 56px lg, 36px sm
// 4px radius, #949494 border, #005BA6 focus + glow
// Lucide-style search icon on left, X clear button on right when value

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

export const Search: React.FC<SearchProps> = ({
  value, defaultValue = '', onChange, onSearch, onClear, placeholder = 'Search…',
  size = 'md', disabled = false, className = '',
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [focused, setFocused] = React.useState(false);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const hasValue = Boolean(currentValue);
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const heights: Record<string, number> = { sm: 36, md: 48, lg: 56 };
  const h = heights[size] || 48;
  const borderColor = disabled ? '#DCDCDC' : focused ? '#005BA6' : '#949494';
  const boxShadow = focused ? '0 0 10px rgba(0,91,166,0.5)' : 'none';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch?.(currentValue as string);
  };
  const handleClear = () => {
    if (!isControlled) setInternalValue('');
    onChange?.('');
    onClear?.();
  };

  return (
    <div className={className} style={{ position:'relative', display:'flex', alignItems:'center', width:'100%' }}>
      <div style={{
        position:'relative', width:'100%', height:h,
        border:`1px solid ${borderColor}`, borderRadius:4,
        background: disabled ? '#FAFAFA' : '#FFFFFF',
        transition:'border-color 150ms, box-shadow 150ms',
        boxShadow, display:'flex', alignItems:'center',
      }}>
        <span style={{ position:'absolute', left:12, color:'#949494', display:'flex', alignItems:'center', pointerEvents:'none' }}>
          <SearchIcon />
        </span>
        <input
          type="search"
          value={currentValue}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            position:'absolute', inset:0, width:'100%', height:'100%',
            padding:`0 ${hasValue ? 36 : 12}px 0 40px`,
            border:'none', outline:'none', background:'transparent',
            fontSize:16, color: disabled ? '#DCDCDC' : '#4A4A4A',
            fontFamily:font,
          }}
        />
        {hasValue && !disabled && (
          <button
            onClick={handleClear}
            style={{
              position:'absolute', right:10,
              background:'none', border:'none', cursor:'pointer',
              color:'#949494', display:'flex', alignItems:'center', padding:0,
            }}
            aria-label="Clear search"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
