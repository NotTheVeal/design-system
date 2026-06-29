import React from 'react';

export interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  id?: string;
  className?: string;
}

// Figma spec (node 4393:45184):
// Track: 44×24px pill
// Off: #DCDCDC (grey), thumb left
// On: #FF9505 (orange, same as checkbox), thumb right
// Thumb: 20×20px white circle, 2px margin
// Disabled: muted/50% opacity

export const Toggle: React.FC<ToggleProps> = ({
  checked, defaultChecked = false, disabled = false, onChange, label, id, className = '',
}) => {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const [focused, setFocused] = React.useState(false);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const uid = id || Math.random().toString(36).slice(2);

  const handleChange = () => {
    if (disabled) return;
    const next = !isChecked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  };

  return (
    <label
      className={className}
      htmlFor={uid}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        opacity: disabled ? 0.5 : 1,
        fontFamily: font,
      }}
    >
      {/* Hidden native checkbox */}
      <input
        type="checkbox"
        id={uid}
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
        aria-checked={isChecked}
      />

      {/* Track — 44×24px pill */}
      <span
        style={{
          position: 'relative',
          width: 44,
          height: 24,
          borderRadius: 12,   // 100px pill
          // Off: #DCDCDC | On: #FF9505 (Figma orange, same as checkbox)
          background: isChecked ? '#FF9505' : '#DCDCDC',
          transition: 'background 200ms ease',
          display: 'inline-block',
          flexShrink: 0,
          boxShadow: focused ? '0 0 0 3px rgba(255,149,5,0.25)' : 'none',
        }}
      >
        {/* Thumb — 20×20px white circle, 2px margin */}
        <span
          style={{
            position: 'absolute',
            top: 2,
            // Off: left=2px | On: left=22px (44-20-2=22)
            left: isChecked ? 22 : 2,
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: '#FFFFFF',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            transition: 'left 200ms ease',
          }}
        />
      </span>

      {/* Label */}
      {label && (
        <span style={{ fontSize: 14, color: disabled ? '#949494' : '#4A4A4A', fontFamily: font }}>
          {label}
        </span>
      )}
    </label>
  );
};

export default Toggle;
