import React from 'react';

export interface DatePickerProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  min?: string;
  max?: string;
  className?: string;
}

// PS Design System DatePicker — same field pattern as Input:
// 48px height, 4px radius, #949494 idle border, #005BA6 focus, blue glow
// Calendar icon trailing, floating label
// Format: YYYY-MM-DD (HTML date input)

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

export const DatePicker: React.FC<DatePickerProps> = ({
  label, value, onChange, helperText, errorText, disabled, min, max, className = '',
}) => {
  const [internalValue, setInternalValue] = React.useState('');
  const [focused, setFocused] = React.useState(false);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const hasValue = Boolean(currentValue);
  const isFloated = focused || hasValue;
  const hasError = Boolean(errorText);
  const font = "'Source Sans Pro', -apple-system, sans-serif";

  const borderColor = hasError ? '#D32F2F' : disabled ? '#DCDCDC' : focused ? '#005BA6' : '#949494';
  const boxShadow = focused && !hasError ? '0 0 10px rgba(0,91,166,0.5)' : 'none';

  return (
    <div className={className} style={{ display:'flex', flexDirection:'column', gap:4, width:'100%', fontFamily:font }}>
      <div style={{
        position:'relative', height:48,
        border:`1px solid ${borderColor}`, borderRadius:4,
        background: disabled ? '#FAFAFA' : '#FFFFFF',
        transition:'border-color 150ms ease, box-shadow 150ms ease',
        boxShadow, display:'flex', alignItems:'center',
      }}>
        <label style={{
          position:'absolute', left:10,
          top: isFloated ? 5 : '50%',
          transform: isFloated ? 'none' : 'translateY(-50%)',
          fontSize: isFloated ? 12 : 16,
          fontWeight: isFloated ? 700 : 400,
          color: hasError ? '#D32F2F' : disabled ? '#DCDCDC' : isFloated ? '#005BA6' : '#4A4A4A',
          transition:'all 150ms ease', pointerEvents:'none', lineHeight:1, fontFamily:font, zIndex:1,
        }}>{label}</label>
        <input
          type="date"
          value={currentValue}
          min={min} max={max}
          disabled={disabled}
          onChange={e => { if(!isControlled) setInternalValue(e.target.value); onChange?.(e.target.value); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            position:'absolute', inset:0, width:'100%', height:'100%',
            padding: isFloated ? '22px 38px 4px 10px' : '0 38px 0 10px',
            border:'none', outline:'none', background:'transparent',
            fontSize:14, color: disabled ? '#DCDCDC' : '#000000',
            fontFamily:font, cursor: disabled ? 'not-allowed' : 'text',
            colorScheme:'light',
          }}
        />
        <span style={{ position:'absolute', right:10, color: disabled ? '#DCDCDC' : '#4A4A4A', display:'flex', alignItems:'center', pointerEvents:'none' }}>
          <CalendarIcon />
        </span>
      </div>
      {(helperText||errorText) && (
        <span style={{ fontSize:12, color:hasError?'#D32F2F':'#777777', paddingLeft:2, fontFamily:font }}>{errorText||helperText}</span>
      )}
    </div>
  );
};

export default DatePicker;
