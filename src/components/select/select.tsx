import React, { useState, useRef, useEffect, useId } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  id?: string;
  name?: string;
}

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const heights = { sm: 36, md: 48, lg: 56 };

export const Select: React.FC<SelectProps> = ({
  options,
  value: controlled,
  defaultValue = '',
  onChange,
  placeholder = 'Select an option',
  label,
  disabled = false,
  error,
  helperText,
  size = 'md',
  className = '',
  id,
  name,
}) => {
  const [internal, setInternal] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const generatedId = useId();
  const selectId = id || generatedId;
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const h = heights[size];

  const selected = controlled !== undefined ? controlled : internal;
  const selectedLabel = options.find(o => o.value === selected)?.label;
  const isFloated = open || !!selected;

  const handleSelect = (opt: SelectOption) => {
    if (opt.disabled) return;
    if (controlled === undefined) setInternal(opt.value);
    onChange?.(opt.value);
    setOpen(false);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const borderColor = error ? '#D32F2F' : (open || focused) ? '#005BA6' : '#DCDCDC';
  const labelColor = error ? '#D32F2F' : (open || focused) ? '#005BA6' : '#777777';

  return (
    <div className={className} ref={containerRef} style={{ position:'relative', fontFamily:font, width:'100%' }}>
      {/* Trigger */}
      <div
        onClick={() => !disabled && setOpen(v => !v)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={selectId + '-listbox'}
        aria-disabled={disabled}
        style={{
          position:'relative', height:h,
          border:'1px solid ' + borderColor,
          borderRadius:4, background:disabled?'#F1F1F1':'#FFFFFF',
          display:'flex', alignItems:'center',
          padding:'0 40px 0 12px',
          cursor:disabled?'not-allowed':'pointer',
          boxSizing:'border-box',
          transition:'border-color 150ms ease',
          outline:'none',
          userSelect:'none',
        }}
        onKeyDown={e => { if(e.key==='Enter'||e.key===' ') { e.preventDefault(); !disabled&&setOpen(v=>!v); } if(e.key==='Escape') setOpen(false); }}
      >
        {/* Floating label */}
        {label && (
          <span style={{
            position:'absolute', left:12,
            top: isFloated ? 6 : '50%',
            transform: isFloated ? 'none' : 'translateY(-50%)',
            fontSize: isFloated ? 11 : 14,
            fontWeight: isFloated ? 600 : 400,
            color: labelColor,
            transition:'all 150ms ease',
            pointerEvents:'none',
            lineHeight:1,
          }}>
            {label}
          </span>
        )}
        {/* Selected value */}
        <span style={{ fontSize:14, color:selected?'#4A4A4A':'#949494', paddingTop:label?14:0 }}>
          {selectedLabel || (label ? '' : placeholder)}
        </span>
        {/* Chevron */}
        <span style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%) rotate('+(open?'180deg':'0deg')+')', transition:'transform 200ms ease', color:focused?'#005BA6':'#949494', display:'flex' }}>
          <ChevronDown/>
        </span>
      </div>

      {/* Dropdown */}
      {open && (
        <div id={selectId+'-listbox'} role="listbox"
          style={{ position:'absolute', top:'100%', left:0, right:0, zIndex:999, background:'#FFFFFF', border:'1px solid #DCDCDC', borderRadius:4, boxShadow:'0 4px 12px rgba(0,47,72,0.12)', marginTop:4, overflow:'hidden', maxHeight:260, overflowY:'auto' }}
        >
          {options.map(opt => (
            <div key={opt.value} role="option" aria-selected={opt.value===selected} aria-disabled={opt.disabled}
              onClick={()=>handleSelect(opt)}
              style={{ padding:'10px 14px', fontSize:14, color:opt.disabled?'#CCCCCC':opt.value===selected?'#005BA6':'#4A4A4A', background:opt.value===selected?'#EFF9FE':'transparent', cursor:opt.disabled?'not-allowed':'pointer', fontWeight:opt.value===selected?600:400, transition:'background 100ms ease' }}
              onMouseEnter={e=>!opt.disabled&&opt.value!==selected&&((e.currentTarget as HTMLElement).style.background='#FAFAFA')}
              onMouseLeave={e=>!opt.disabled&&opt.value!==selected&&((e.currentTarget as HTMLElement).style.background='transparent')}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}

      {/* Helper / Error */}
      {(error || helperText) && (
        <p style={{ margin:'4px 0 0', fontSize:12, color:error?'#D32F2F':'#777777' }}>{error || helperText}</p>
      )}
    </div>
  );
};

export default Select;
