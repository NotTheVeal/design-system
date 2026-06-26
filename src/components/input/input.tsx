import React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>,'size'> {
  label: string;
  helperText?: string;
  errorText?: string;
  size?: 'default' | 'large';
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label, helperText, errorText, size='default',
  leadingIcon, trailingIcon, value, defaultValue, onChange, onFocus, onBlur, disabled, ...rest
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '');
  const [focused, setFocused] = React.useState(false);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const hasValue = String(currentValue ?? '').length > 0;
  const isFloated = focused || hasValue;
  const hasError = Boolean(errorText);
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const height = size === 'large' ? 80 : 48;
  const borderColor = hasError ? '#D32F2F' : focused ? '#005BA6' : '#DCDCDC';

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:4, width:'100%', fontFamily:font }}>
      <div style={{
        position:'relative', height,
        border:`1px solid ${borderColor}`, borderRadius:4,
        background: disabled ? '#F1F1F1' : '#FFFFFF',
        transition:'border-color 150ms ease',
        boxShadow: focused ? '0 0 0 3px rgba(0,91,166,0.15)' : 'none',
        display:'flex', alignItems:'center',
      }}>
        {leadingIcon && <span style={{ position:'absolute', left:12, color:'#777777', display:'flex', alignItems:'center' }}>{leadingIcon}</span>}
        <label style={{
          position:'absolute', left: leadingIcon ? 40 : 12,
          top: isFloated ? (size==='large' ? 12 : 6) : '50%',
          transform: isFloated ? 'none' : 'translateY(-50%)',
          fontSize: isFloated ? 11 : 14,
          fontWeight: isFloated ? 700 : 400,
          color: hasError ? '#D32F2F' : isFloated ? '#005BA6' : '#777777',
          transition:'all 150ms ease', pointerEvents:'none',
          lineHeight:1, fontFamily:font, zIndex:1,
        }}>{label}</label>
        <input
          {...rest} value={currentValue} disabled={disabled}
          onChange={e => { if(!isControlled) setInternalValue(e.target.value); onChange?.(e); }}
          onFocus={e => { setFocused(true); onFocus?.(e); }}
          onBlur={e => { setFocused(false); onBlur?.(e); }}
          style={{
            position:'absolute', inset:0, width:'100%', height:'100%',
            padding: isFloated
              ? `${size==='large'?30:22}px ${trailingIcon?40:12}px 8px ${leadingIcon?40:12}px`
              : `0 ${trailingIcon?40:12}px 0 ${leadingIcon?40:12}px`,
            border:'none', outline:'none', background:'transparent',
            fontSize:14, color:'#4A4A4A', fontFamily:font,
            cursor: disabled ? 'not-allowed' : 'text',
          }}
        />
        {trailingIcon && <span style={{ position:'absolute', right:12, color:'#777777', display:'flex', alignItems:'center' }}>{trailingIcon}</span>}
      </div>
      {(helperText||errorText) && (
        <span style={{ fontSize:12, color:hasError?'#D32F2F':'#777777', paddingLeft:2, fontFamily:font }}>
          {errorText||helperText}
        </span>
      )}
    </div>
  );
};

export default Input;
