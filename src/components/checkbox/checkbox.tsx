import React from 'react';

export interface CheckboxProps {
  label?: string; checked?: boolean; defaultChecked?: boolean; indeterminate?: boolean;
  disabled?: boolean; onChange?: (checked: boolean) => void;
  id?: string; name?: string; value?: string; helperText?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label, checked, defaultChecked=false, indeterminate=false, disabled=false,
  onChange, id, name, value, helperText,
}) => {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const uid = id || Math.random().toString(36).slice(2);

  React.useEffect(() => { if (inputRef.current) inputRef.current.indeterminate = indeterminate; }, [indeterminate]);

  const boxBg = disabled ? '#F1F1F1' : (isChecked || indeterminate) ? '#005BA6' : '#FFFFFF';
  const boxBorder = disabled ? '#DCDCDC' : focused ? '#005BA6' : (isChecked || indeterminate) ? '#005BA6' : '#DCDCDC';

  return (
    <div style={{ fontFamily:font }}>
      <label htmlFor={uid} style={{ display:'inline-flex', alignItems:'center', gap:10, cursor: disabled ? 'not-allowed' : 'pointer', userSelect:'none' }}>
        <input
          ref={inputRef} type="checkbox" id={uid} name={name} value={value}
          checked={isChecked} disabled={disabled}
          onChange={e => { if(!isControlled) setInternalChecked(e.target.checked); onChange?.(e.target.checked); }}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ position:'absolute', opacity:0, width:0, height:0 }}
        />
        <span style={{
          width:20, height:20, borderRadius:2, border:`1.5px solid ${boxBorder}`,
          background:boxBg, display:'inline-flex', alignItems:'center', justifyContent:'center',
          flexShrink:0, transition:'all 150ms ease',
          boxShadow: focused ? '0 0 0 3px rgba(0,91,166,0.2)' : 'none',
        }}>
          {isChecked && !indeterminate && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6l2.5 2.5 4.5-4.5" stroke="#FFFFFF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {indeterminate && (
            <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
              <path d="M1 1h8" stroke="#FFFFFF" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          )}
        </span>
        {label && <span style={{ fontSize:14, color: disabled ? '#949494' : '#4A4A4A', lineHeight:'20px' }}>{label}</span>}
      </label>
      {helperText && <div style={{ fontSize:12, color:'#777777', marginTop:4, paddingLeft:30, fontFamily:font }}>{helperText}</div>}
    </div>
  );
};

export default Checkbox;
