import React from 'react';

export interface RadioProps {
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  name?: string;
  className?: string;
}

export interface RadioGroupProps {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: Array<{ value: string; label: string; description?: string; disabled?: boolean }>;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

export const Radio: React.FC<RadioProps> = ({
  value,
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
  name,
  className = '',
}) => {
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const borderColor = disabled ? '#DCDCDC' : checked ? '#005BA6' : '#949494';

  return (
    <label className={className} style={{ display:'inline-flex', alignItems:'flex-start', gap:10, cursor:disabled?'not-allowed':'pointer', fontFamily:font, opacity:disabled?0.5:1 }}>
      <span style={{ position:'relative', flexShrink:0, marginTop:2 }}>
        <input type="radio" name={name} value={value} checked={checked} disabled={disabled}
          onChange={()=>onChange?.(value)}
          style={{ position:'absolute', opacity:0, width:0, height:0 }}
        />
        {/* Visual radio */}
        <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:20, height:20, borderRadius:'50%', border:'1.5px solid '+borderColor, background:'#FFFFFF', boxSizing:'border-box', transition:'all 150ms ease' }}>
          {checked && (
            <span style={{ width:10, height:10, borderRadius:'50%', background:disabled?'#949494':'#005BA6', transition:'all 150ms ease' }}/>
          )}
        </span>
      </span>
      {(label || description) && (
        <span style={{ display:'flex', flexDirection:'column', gap:2 }}>
          {label && <span style={{ fontSize:14, color:disabled?'#949494':'#4A4A4A', lineHeight:'20px' }}>{label}</span>}
          {description && <span style={{ fontSize:12, color:'#777777', lineHeight:'18px' }}>{description}</span>}
        </span>
      )}
    </label>
  );
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value: controlled,
  defaultValue = '',
  onChange,
  options,
  orientation = 'vertical',
  className = '',
}) => {
  const [internal, setInternal] = React.useState(defaultValue);
  const selected = controlled !== undefined ? controlled : internal;

  const handleChange = (v: string) => {
    if (controlled === undefined) setInternal(v);
    onChange?.(v);
  };

  return (
    <div className={className} style={{ display:'flex', flexDirection:orientation==='horizontal'?'row':'column', gap:orientation==='horizontal'?20:12, flexWrap:'wrap' }}>
      {options.map(opt => (
        <Radio
          key={opt.value}
          name={name}
          value={opt.value}
          label={opt.label}
          description={opt.description}
          disabled={opt.disabled}
          checked={selected === opt.value}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};

export default Radio;
