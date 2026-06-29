import React from 'react';

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  id?: string;
  name?: string;
  value?: string;
  helperText?: string;
}

// Figma spec (node 3266:3225 — Check Box):
// 24×24px, border-radius: 2px, border: 1.5px solid #949494
// Selected fill: #FF9505 (orange), border: #EC8000
// Disabled: bg #CCCCCC, border #949494
// Checkmark: white SVG

export const Checkbox: React.FC<CheckboxProps> = ({
  label, checked, defaultChecked=false, indeterminate=false,
  disabled=false, onChange, id, name, value, helperText,
}) => {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const uid = id || Math.random().toString(36).slice(2);

  React.useEffect(() => { if (inputRef.current) inputRef.current.indeterminate = indeterminate; }, [indeterminate]);

  // Figma: selected = orange #FF9505 fill, border #EC8000
  const boxBg = disabled
    ? '#CCCCCC'
    : (isChecked || indeterminate)
      ? '#FF9505'   // Figma: orange selected state
      : '#FFFFFF';

  const boxBorder = disabled
    ? '#949494'
    : focused
      ? '#FF9505'
      : (isChecked || indeterminate)
        ? '#EC8000'  // Figma: orange border when checked
        : '#949494'; // Figma: #949494 grey when unchecked

  return (
    <div style={{ fontFamily: font }}>
      <label
        htmlFor={uid}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          cursor: disabled ? 'not-allowed' : 'pointer',
          userSelect: 'none',
        }}
      >
        <input
          ref={inputRef}
          type="checkbox"
          id={uid}
          name={name}
          value={value}
          checked={isChecked}
          disabled={disabled}
          onChange={e => { if(!isControlled) setInternalChecked(e.target.checked); onChange?.(e.target.checked); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ position:'absolute', opacity:0, width:0, height:0 }}
        />

        {/* Figma: 24×24px, 2px border-radius, 1.5px border */}
        <span
          style={{
            width: 24,
            height: 24,
            borderRadius: 2,
            border: `1.5px solid ${boxBorder}`,
            background: boxBg,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 150ms ease',
            boxShadow: focused ? '0 0 0 3px rgba(255,149,5,0.25)' : 'none',
          }}
        >
          {isChecked && !indeterminate && (
            // White checkmark SVG
            <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
              <path
                d="M1.5 5.5l3.5 3.5 7.5-8"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {indeterminate && (
            <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
              <path d="M1 1h8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </span>

        {label && (
          <span style={{
            fontSize: 14,
            color: disabled ? '#949494' : '#4A4A4A',
            lineHeight: '20px',
          }}>
            {label}
          </span>
        )}
      </label>

      {helperText && (
        <div style={{
          fontSize: 12,
          color: '#777777',
          marginTop: 4,
          paddingLeft: 34,
          fontFamily: font,
        }}>
          {helperText}
        </div>
      )}
    </div>
  );
};

export default Checkbox;
