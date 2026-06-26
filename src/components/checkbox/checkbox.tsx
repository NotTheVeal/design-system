import React from 'react';

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  id?: string;
  name?: string;
  value?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked: ctrl,
  defaultChecked = false,
  indeterminate = false,
  onChange,
  label,
  description,
  disabled = false,
  error = false,
  className = '',
  id,
  name,
  value,
}) => {
  const [internal, setInternal] = React.useState(defaultChecked);
  const isChecked = ctrl !== undefined ? ctrl : internal;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const font = "'Source Sans Pro', -apple-system, sans-serif";

  React.useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (ctrl === undefined) setInternal(e.target.checked);
    onChange?.(e.target.checked);
  };

  const borderColor = error ? '#D32F2F' : disabled ? '#DCDCDC' : isChecked || indeterminate ? '#005BA6' : '#DCDCDC';
  const bgColor = isChecked || indeterminate ? (disabled ? '#949494' : '#005BA6') : '#FFFFFF';

  return (
    <label className={className} style={{ display:'inline-flex', alignItems:'flex-start', gap:10, cursor:disabled?'not-allowed':'pointer', fontFamily:font, opacity:disabled?0.5:1 }}>
      <span style={{ position:'relative', flexShrink:0, marginTop:1 }}>
        <input
          ref={inputRef}
          type="checkbox"
          id={id}
          name={name}
          value={value}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          style={{ position:'absolute', opacity:0, width:0, height:0 }}
        />
        {/* Visual checkbox */}
        <span style={{
          display:'inline-flex', alignItems:'center', justifyContent:'center',
          width:20, height:20, borderRadius:2,
          border:'1.5px solid ' + borderColor,
          background:bgColor,
          transition:'all 150ms ease',
          boxSizing:'border-box',
        }}>
          {isChecked && !indeterminate && (
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
              <path d="M1 4.5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {indeterminate && (
            <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
              <rect width="10" height="2" rx="1" fill="white"/>
            </svg>
          )}
        </span>
      </span>
      {(label || description) && (
        <span style={{ display:'flex', flexDirection:'column', gap:2 }}>
          {label && <span style={{ fontSize:14, fontWeight:400, color:disabled?'#949494':'#4A4A4A', lineHeight:'20px' }}>{label}</span>}
          {description && <span style={{ fontSize:12, color:'#777777', lineHeight:'18px' }}>{description}</span>}
        </span>
      )}
      {error && !label && <span style={{ fontSize:12, color:'#D32F2F' }}>Required</span>}
    </label>
  );
};

export default Checkbox;
