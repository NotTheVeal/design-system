import React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>,'size'> {
  label: string;
  helperText?: string;
  errorText?: string;
  size?: 'default' | 'large';
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

// Figma spec (node 1581:89):
// 48px height, 3px border-radius
// Idle border: 1px solid #949494
// Focus border: 1px solid #005BA6 + glow rgba(0,91,166,0.5)
// Label floated: 12px Bold #005BA6
// Label centered: 16px Regular #4A4A4A
// Disabled: border #DCDCDC, label #DCDCDC

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

  // Figma exact border colors
  const borderColor = hasError
    ? '#D32F2F'
    : focused
      ? '#005BA6'
      : disabled
        ? '#DCDCDC'
        : '#949494';  // #949494 for idle (not #DCDCDC)

  const boxShadow = hasError
    ? '0 0 6px rgba(211,47,47,0.3)'
    : focused
      ? '0 0 10px rgba(0,91,166,0.5)'  // Figma exact glow
      : 'none';

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:4, width:'100%', fontFamily:font }}>
      <div style={{
        position:'relative',
        height,
        border:`1px solid ${borderColor}`,
        borderRadius: 3,   // Figma: rounded-[3px]
        background: disabled ? '#FAFAFA' : '#FFFFFF',
        transition: 'border-color 150ms ease, box-shadow 150ms ease',
        boxShadow,
        display:'flex',
        alignItems:'center',
      }}>
        {leadingIcon && (
          <span style={{ position:'absolute', left:10, color:'#949494', display:'flex', alignItems:'center', pointerEvents:'none' }}>
            {leadingIcon}
          </span>
        )}

        {/* Floating label — Figma: 16px Regular #4A4A4A when idle, 12px Bold #005BA6 when floated */}
        <label style={{
          position:'absolute',
          left: leadingIcon ? 38 : 10,
          top: isFloated ? (size==='large' ? 10 : 5) : '50%',
          transform: isFloated ? 'none' : 'translateY(-50%)',
          fontSize: isFloated ? 12 : 16,
          fontWeight: isFloated ? 700 : 400,  // Bold when floated per Figma
          color: hasError
            ? '#D32F2F'
            : disabled
              ? '#DCDCDC'   // Figma: disabled label is #DCDCDC
              : isFloated
                ? '#005BA6'  // Figma: #005DA6 ≈ #005BA6
                : '#4A4A4A', // Figma: #4A4A4A when idle
          transition: 'all 150ms ease',
          pointerEvents: 'none',
          lineHeight: 1,
          fontFamily: font,
          zIndex: 1,
        }}>
          {label}
        </label>

        <input
          {...rest}
          value={currentValue}
          disabled={disabled}
          onChange={e => { if(!isControlled) setInternalValue(e.target.value); onChange?.(e); }}
          onFocus={e => { setFocused(true); onFocus?.(e); }}
          onBlur={e => { setFocused(false); onBlur?.(e); }}
          style={{
            position:'absolute',
            inset:0,
            width:'100%',
            height:'100%',
            padding: isFloated
              ? `${size==='large'?32:24}px ${trailingIcon?38:10}px 6px ${leadingIcon?38:10}px`
              : `0 ${trailingIcon?38:10}px 0 ${leadingIcon?38:10}px`,
            border:'none',
            outline:'none',
            background:'transparent',
            fontSize: 16,
            color: disabled ? '#DCDCDC' : '#000000',
            fontFamily: font,
            cursor: disabled ? 'not-allowed' : 'text',
          }}
        />

        {trailingIcon && (
          <span style={{ position:'absolute', right:10, color:'#949494', display:'flex', alignItems:'center', pointerEvents:'none' }}>
            {trailingIcon}
          </span>
        )}
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
