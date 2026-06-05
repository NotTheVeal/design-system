import React, { useState } from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

interface InputProps {
  label: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  type?: string;
  size?: 'default' | 'large';
  className?: string;
  required?: boolean;
  id?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  defaultValue,
  onChange,
  placeholder = '',
  disabled = false,
  error,
  helperText,
  type = 'text',
  size = 'default',
  className = '',
  required = false,
  id,
}) => {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const [hovered, setHovered] = useState(false);

  const controlled = value !== undefined;
  const currentValue = controlled ? value : internalValue;
  const hasValue = currentValue !== '' && currentValue !== undefined;
  const floated = focused || hasValue;

  const inputId = id ?? `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const height = size === 'large' ? 80 : 48;

  const borderColor = error
    ? '#D32F2F'
    : focused
    ? '#005BA6'
    : hovered && !disabled
    ? '#949494'
    : '#DCDCDC';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!controlled) setInternalValue(e.target.value);
    onChange?.(e);
  };

  return (
    <div className={className} style={{ position: 'relative', width: '100%', fontFamily }}>
      <div
        style={{
          position: 'relative',
          height,
          border: `1px solid ${borderColor}`,
          borderRadius: 4,
          background: disabled ? '#F1F1F1' : '#FFFFFF',
          transition: 'border-color 150ms ease',
          boxShadow: focused ? '0 0 0 3px rgba(0,147,244,0.3)' : 'none',
          cursor: disabled ? 'not-allowed' : undefined,
        }}
        onMouseEnter={() => !disabled && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <label
          htmlFor={inputId}
          style={{
            position: 'absolute',
            left: 12,
            top: floated ? 6 : '50%',
            transform: floated ? 'none' : 'translateY(-50%)',
            fontSize: floated ? 12 : 16,
            fontWeight: floated ? 600 : 400,
            color: error ? '#D32F2F' : floated ? '#005BA6' : '#777777',
            transition: 'all 150ms ease',
            pointerEvents: 'none',
            userSelect: 'none',
            fontFamily,
          }}
        >
          {label}{required && ' *'}
        </label>
        <input
          id={inputId}
          type={type}
          value={currentValue}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          placeholder={floated ? placeholder : ''}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            paddingLeft: 12,
            paddingRight: 12,
            paddingBottom: 8,
            paddingTop: floated ? 22 : 8,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: 16,
            color: disabled ? '#777777' : '#2B2B2B',
            width: '100%',
            boxSizing: 'border-box',
            cursor: disabled ? 'not-allowed' : undefined,
            fontFamily,
          }}
        />
      </div>
      {error && (
        <p style={{ margin: '4px 0 0', fontSize: 12, color: '#D32F2F', fontFamily }}>
          {error}
        </p>
      )}
      {!error && helperText && (
        <p style={{ margin: '4px 0 0', fontSize: 12, color: '#777777', fontFamily }}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
