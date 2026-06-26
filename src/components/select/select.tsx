import React from 'react';

export interface SelectOption { value: string; label: string; disabled?: boolean; }
export interface SelectProps {
  label: string; options: SelectOption[]; value?: string; defaultValue?: string;
  onChange?: (value: string) => void; helperText?: string; errorText?: string;
  disabled?: boolean; placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  label, options, value, defaultValue='', onChange, helperText, errorText, disabled, placeholder='Select an option',
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [focused, setFocused] = React.useState(false);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const hasValue = Boolean(currentValue);
  const isFloated = focused || hasValue;
  const hasError = Boolean(errorText);
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const borderColor = hasError ? '#D32F2F' : focused ? '#005BA6' : '#DCDCDC';

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:4, width:'100%', fontFamily:font }}>
      <div style={{
        position:'relative', height:48,
        border:`1px solid ${borderColor}`, borderRadius:4,
        background: disabled ? '#F1F1F1' : '#FFFFFF',
        transition:'border-color 150ms ease',
        boxShadow: focused ? '0 0 0 3px rgba(0,91,166,0.15)' : 'none',
      }}>
        <label style={{
          position:'absolute', left:12,
          top: isFloated ? 6 : '50%',
          transform: isFloated ? 'none' : 'translateY(-50%)',
          fontSize: isFloated ? 11 : 14,
          fontWeight: isFloated ? 700 : 400,
          color: hasError ? '#D32F2F' : isFloated ? '#005BA6' : '#777777',
          transition:'all 150ms ease', pointerEvents:'none',
          lineHeight:1, fontFamily:font, zIndex:1,
        }}>{label}</label>
        <select
          value={currentValue} disabled={disabled}
          onChange={e => { if(!isControlled) setInternalValue(e.target.value); onChange?.(e.target.value); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            position:'absolute', inset:0, width:'100%', height:'100%',
            padding: isFloated ? '22px 36px 6px 12px' : '0 36px 0 12px',
            border:'none', outline:'none', background:'transparent',
            fontSize:14, color: hasValue ? '#4A4A4A' : 'transparent',
            fontFamily:font, cursor: disabled ? 'not-allowed' : 'pointer',
            appearance:'none', WebkitAppearance:'none',
          }}
        >
          <option value="" disabled hidden>{placeholder}</option>
          {options.map(o => <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>)}
        </select>
        <span style={{
          position:'absolute', right:12, top:'50%',
          transform: `translateY(-50%) ${focused ? 'rotate(180deg)' : 'rotate(0deg)'}`,
          transition:'transform 200ms ease', pointerEvents:'none',
          color: disabled ? '#DCDCDC' : '#777777', display:'flex', alignItems:'center',
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
      {(helperText||errorText) && (
        <span style={{ fontSize:12, color:hasError?'#D32F2F':'#777777', paddingLeft:2, fontFamily:font }}>
          {errorText||helperText}
        </span>
      )}
    </div>
  );
};

export default Select;
