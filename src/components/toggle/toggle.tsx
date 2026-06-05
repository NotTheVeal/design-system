import React from 'react';

export type ToggleColorScheme = 'current' | 'future';

export interface ToggleProps {
  colorScheme?: ToggleColorScheme;
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  labelPosition?: 'left' | 'right';
  id?: string;
  onChange?: (v: boolean) => void;
  className?: string;
}

const C = {
  current: { on: '#FF9505', focus: 'rgba(255,149,5,0.35)' },
  future:  { on: '#005BA6', focus: 'rgba(0,91,166,0.5)' },
};

export const Toggle: React.FC<ToggleProps> = ({
  colorScheme = 'future',
  checked = false,
  disabled = false,
  label,
  labelPosition = 'right',
  id,
  onChange,
  className = '',
}) => {
  const c = C[colorScheme];
  // OFF = #DCDCDC (grey per Figma), ON = brand color
  const track = disabled ? '#DCDCDC' : checked ? c.on : '#DCDCDC';
  const opacity = disabled ? 0.6 : 1;

  const onKD = (e: React.KeyboardEvent) => {
    if (e.key === ' ' && !disabled) {
      e.preventDefault();
      onChange?.(!checked);
    }
  };

  const lbl = label && (
    <span
      style={{
        fontSize: 14,
        color: disabled ? '#949494' : '#4A4A4A',
        userSelect: 'none',
        fontFamily: "'Source Sans Pro', 'Source Sans 3', sans-serif",
      }}
    >
      {label}
    </span>
  );

  return (
    <div
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: disabled ? 'not-allowed' : 'pointer', opacity }}
      className={className}
    >
      {labelPosition === 'left' && lbl}
      <div
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        aria-label={label}
        tabIndex={disabled ? -1 : 0}
        id={id}
        onClick={() => !disabled && onChange?.(!checked)}
        onKeyDown={onKD}
        onFocus={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 3px ${c.focus}`; }}
        onBlur={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
        style={{
          width: 44,
          height: 24,
          borderRadius: 100,
          background: track,
          position: 'relative',
          transition: 'background 200ms ease',
          outline: 'none',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: '#FFF',
            position: 'absolute',
            top: 3,
            left: checked ? 23 : 3,
            transition: 'left 200ms ease',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}
        />
      </div>
      {labelPosition === 'right' && lbl}
    </div>
  );
};

export default Toggle;
