import React from 'react';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioButtonProps {
  name: string;
  value: string;
  label: string;
  description?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
}

export interface RadioProps {
  name: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

// Figma exact (node 4393:45185 — Radio Button):
// Circle: 20×20px, 50% radius, 1.5px border
// Default border: #949494
// Hover border: #EC8000 (orange)
// Focus: #EC8000 border + blue glow
// Selected: #FF9505 inner dot (10px), #EC8000 outer border
// Disabled: #CCCCCC border, muted label

export const RadioButton: React.FC<RadioButtonProps> = ({
  value, label, description, checked, disabled, onChange, name,
}) => {
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const font = "'Source Sans Pro', -apple-system, sans-serif";

  const borderColor = disabled
    ? '#CCCCCC'
    : checked || hovered || focused
      ? '#EC8000'
      : '#949494';

  const boxShadow = focused && !disabled ? '0 0 0 3px rgba(255,149,5,0.25)' : 'none';

  return (
    <label style={{
      display: 'inline-flex', alignItems: 'flex-start', gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      userSelect: 'none', fontFamily: font,
      opacity: disabled ? 0.5 : 1,
    }}>
      <input
        type="radio" name={name} value={value}
        checked={checked} disabled={disabled}
        onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />
      {/* Circle — 20×20px, vertically centered with label text */}
      <span
        style={{
          width: 20, height: 20, borderRadius: '50%',
          border: `1.5px solid ${borderColor}`,
          background: '#FFFFFF',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, marginTop: 2,
          transition: 'border-color 150ms ease, box-shadow 150ms ease',
          boxShadow,
        }}
        onMouseEnter={() => !disabled && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {checked && (
          <span style={{
            width: 10, height: 10, borderRadius: '50%',
            background: disabled ? '#CCCCCC' : '#FF9505',
          }} />
        )}
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 14, color: disabled ? '#CCCCCC' : '#4A4A4A', fontFamily: font, lineHeight: '21px' }}>
          {label}
        </span>
        {description && (
          <span style={{ fontSize: 13, color: disabled ? '#CCCCCC' : '#737B84', fontFamily: font, lineHeight: '18px' }}>
            {description}
          </span>
        )}
      </span>
    </label>
  );
};

export const Radio: React.FC<RadioProps> = ({
  name, options, value, defaultValue = '', onChange, orientation = 'vertical', className = '',
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  return (
    <div
      className={className}
      role="radiogroup"
      style={{ display: 'flex', flexDirection: orientation === 'horizontal' ? 'row' : 'column', gap: 12 }}
    >
      {options.map(opt => (
        <RadioButton
          key={opt.value}
          name={name}
          value={opt.value}
          label={opt.label}
          description={opt.description}
          checked={currentValue === opt.value}
          disabled={opt.disabled}
          onChange={() => {
            if (!isControlled) setInternalValue(opt.value);
            onChange?.(opt.value);
          }}
        />
      ))}
    </div>
  );
};

export { Radio as RadioGroup };
export default Radio;
