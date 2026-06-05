import React from 'react';

export type RadioColorScheme = 'current' | 'future';

export interface RadioProps {
  colorScheme?: RadioColorScheme;
  selected?: boolean;
  disabled?: boolean;
  label?: string;
  value?: string;
  name?: string;
  id?: string;
  onChange?: (v: string) => void;
  className?: string;
}

const C = {
  current: { fill: '#FF9505', focus: 'rgba(255,149,5,0.35)' },
  future:  { fill: '#005BA6', focus: 'rgba(0,91,166,0.5)' },
};

export const Radio: React.FC<RadioProps> = ({
  colorScheme = 'future',
  selected = false,
  disabled = false,
  label,
  value = '',
  name,
  id,
  onChange,
  className = '',
}) => {
  const c = C[colorScheme];
  const bc = disabled ? '#DCDCDC' : selected ? c.fill : '#949494';

  const onKD = (e: React.KeyboardEvent) => {
    if ((e.key === ' ' || e.key === 'Enter') && !disabled) {
      e.preventDefault();
      onChange?.(value);
    }
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        fontFamily: "'Source Sans Pro', 'Source Sans 3', sans-serif",
      }}
      className={className}
    >
      <div
        role="radio"
        aria-checked={selected}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        id={id}
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          border: `1.5px solid ${bc}`,
          background: disabled ? '#F1F1F1' : '#FFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'all 150ms ease',
          outline: 'none',
        }}
        onClick={() => !disabled && onChange?.(value)}
        onKeyDown={onKD}
        onFocus={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 3px ${c.focus}`; }}
        onBlur={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
      >
        {selected && (
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: disabled ? '#949494' : c.fill,
              transition: 'all 150ms ease',
            }}
          />
        )}
      </div>
      {label && (
        <span style={{ fontSize: 14, color: disabled ? '#949494' : '#4A4A4A', userSelect: 'none' }}>
          {label}
        </span>
      )}
    </div>
  );
};

export interface RadioGroupProps {
  colorScheme?: RadioColorScheme;
  options: Array<{ label: string; value: string; disabled?: boolean }>;
  value?: string;
  name?: string;
  onChange?: (v: string) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  colorScheme = 'future',
  options,
  value,
  name,
  onChange,
}) => (
  <div role="radiogroup" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    {options.map(o => (
      <Radio
        key={o.value}
        colorScheme={colorScheme}
        label={o.label}
        value={o.value}
        name={name}
        selected={value === o.value}
        disabled={o.disabled}
        onChange={onChange}
      />
    ))}
  </div>
);

export default Radio;
