import React from 'react';

export interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
  id?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked: ctrl,
  defaultChecked = false,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
  className = '',
  id,
}) => {
  const [internal, setInternal] = React.useState(defaultChecked);
  const isOn = ctrl !== undefined ? ctrl : internal;
  const font = "'Source Sans Pro', -apple-system, sans-serif";

  const handleChange = () => {
    if (disabled) return;
    const next = !isOn;
    if (ctrl === undefined) setInternal(next);
    onChange?.(next);
  };

  const W = size === 'sm' ? 36 : 44;
  const H = size === 'sm' ? 20 : 24;
  const D = size === 'sm' ? 14 : 18;
  const offset = size === 'sm' ? 3 : 3;

  return (
    <div className={className} style={{ display:'inline-flex', alignItems:'flex-start', gap:10, cursor:disabled?'not-allowed':'pointer', fontFamily:font, opacity:disabled?0.5:1 }} onClick={handleChange}>
      {/* Track */}
      <div style={{
        position:'relative', width:W, height:H, borderRadius:H/2,
        background: isOn ? (disabled ? '#949494' : '#005BA6') : '#CCCCCC',
        transition:'background 200ms ease',
        flexShrink:0,
        marginTop:1,
      }}>
        {/* Thumb */}
        <div style={{
          position:'absolute',
          top: offset,
          left: isOn ? W - D - offset : offset,
          width:D, height:D, borderRadius:'50%',
          background:'#FFFFFF',
          boxShadow:'0 1px 3px rgba(0,0,0,0.2)',
          transition:'left 200ms ease',
        }}/>
      </div>
      {(label || description) && (
        <span style={{ display:'flex', flexDirection:'column', gap:2 }}>
          {label && <span style={{ fontSize:14, color:disabled?'#949494':'#4A4A4A', lineHeight:'20px' }}>{label}</span>}
          {description && <span style={{ fontSize:12, color:'#777', lineHeight:'18px' }}>{description}</span>}
        </span>
      )}
    </div>
  );
};

export default Toggle;
