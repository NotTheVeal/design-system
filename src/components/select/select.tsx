import React from 'react';

export interface SelectOption { value: string; label: string; disabled?: boolean; }
export interface SelectProps {
  label: string; options: SelectOption[]; value?: string; defaultValue?: string;
  onChange?: (value: string) => void; helperText?: string; errorText?: string;
  disabled?: boolean; placeholder?: string;
}

// Figma: 48px, border-radius 4px, idle #949494, hover black, focus #005BA6 + glow

export const Select: React.FC<SelectProps> = ({
  label, options, value, defaultValue='', onChange, helperText, errorText, disabled, placeholder,
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [focused, setFocused] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const hasValue = Boolean(currentValue);
  const isFloated = focused || hasValue;
  const hasError = Boolean(errorText);
  const font = "'Source Sans Pro', -apple-system, sans-serif";

  const borderColor = hasError ? '#D32F2F' : disabled ? '#DCDCDC' : focused ? '#005BA6' : hovered ? '#000000' : '#949494';
  const boxShadow = focused && !hasError ? '0 0 10px rgba(0,91,166,0.5)' : 'none';

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:4, width:'100%', fontFamily:font }}>
      <div
        style={{ position:'relative', height:48, border:`1px solid ${borderColor}`, borderRadius:4,
          background: disabled ? '#FAFAFA' : '#FFFFFF', transition:'border-color 150ms ease, box-shadow 150ms ease',
          boxShadow, cursor: disabled ? 'not-allowed' : 'pointer' }}
        onMouseEnter={() => !disabled && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <label style={{
          position:'absolute', left:10, top: isFloated ? 5 : '50%',
          transform: isFloated ? 'none' : 'translateY(-50%)',
          fontSize: isFloated ? 12 : 16, fontWeight: isFloated ? 700 : 400,
          color: hasError ? '#D32F2F' : disabled ? '#DCDCDC' : isFloated ? '#005BA6' : '#4A4A4A',
          transition:'all 150ms ease', pointerEvents:'none', lineHeight:1, fontFamily:font, zIndex:1,
        }}>{label}</label>
        <select
          value={currentValue} disabled={disabled}
          onChange={e => { if(!isControlled) setInternalValue(e.target.value); onChange?.(e.target.value); }}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            position:'absolute', inset:0, width:'100%', height:'100%',
            padding: isFloated ? '22px 32px 4px 10px' : '0 32px 0 10px',
            border:'none', outline:'none', background:'transparent',
            fontSize:16, color: hasValue ? '#000000' : 'transparent',
            fontFamily:font, cursor: disabled ? 'not-allowed' : 'pointer',
            appearance:'none', WebkitAppearance:'none',
          }}
        >
          <option value="" disabled hidden>{placeholder||''}</option>
          {options.map(o => <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>)}
        </select>
        <span style={{
          position:'absolute', right:10, top:'50%',
          transform:`translateY(-50%) ${focused?'rotate(180deg)':'rotate(0deg)'}`,
          transition:'transform 200ms ease', pointerEvents:'none',
          color: disabled ? '#DCDCDC' : '#4A4A4A', display:'flex', alignItems:'center',
        }}>
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
            <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
      {(helperText||errorText) && (
        <span style={{ fontSize:12, color:hasError?'#D32F2F':'#777777', paddingLeft:2, fontFamily:font }}>{errorText||helperText}</span>
      )}
    </div>
  );
};

export default Select;
