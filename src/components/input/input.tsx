import React, { useState, useId } from 'react';

const FF = "'Source Sans Pro', 'Source Sans 3', sans-serif";

type InputSize = 'small' | 'medium' | 'large';

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
  size?: InputSize;
  className?: string;
  required?: boolean;
  id?: string;
  name?: string;
  readOnly?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const heightMap: Record<InputSize, number> = { small: 36, medium: 48, large: 56 };

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
  size = 'medium',
  className = '',
  required = false,
  id,
  name,
  readOnly = false,
  prefix,
  suffix,
}) => {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const [hovered, setHovered] = useState(false);
  const uid = useId();

  const controlled = value !== undefined;
  const currentValue = controlled ? value : internalValue;
  const hasValue = currentValue !== '' && currentValue !== undefined && currentValue !== null;

  // Label floats when focused OR when there is a value
  const isFloated = focused || hasValue;

  const inputId = id ?? `input-${uid}`;
  const height = heightMap[size];

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

  // Vertical positions for the floating label
  const labelTop = isFloated ? 6 : '50%';
  const labelTransform = isFloated ? 'none' : 'translateY(-50%)';
  const labelFontSize = isFloated ? 12 : 14;
  const labelColor = error
    ? '#D32F2F'
    : isFloated && focused
    ? '#005BA6'
    : isFloated
    ? '#777777'
    : '#AAAAAA';

  return (
    <div className={className} style={{ position: 'relative', width: '100%', fontFamily: FF }}>
      <div
        style={{
          position: 'relative',
          height,
          border: `1px solid ${borderColor}`,
          borderRadius: 4,
          background: disabled ? '#F1F1F1' : '#FFFFFF',
          transition: 'border-color 150ms ease, box-shadow 150ms ease',
          boxShadow: focused && !error ? '0 0 0 3px rgba(0,91,166,0.2)' : 'none',
          cursor: disabled ? 'not-allowed' : undefined,
          display: 'flex',
          alignItems: 'stretch',
        }}
        onMouseEnter={() => !disabled && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {prefix && (
          <div style={{
            display: 'flex', alignItems: 'center', paddingLeft: 12,
            color: '#777777', flexShrink: 0,
          }}>
            {prefix}
          </div>
        )}

        <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
          {/* Floating label */}
          <label
            htmlFor={inputId}
            style={{
              position: 'absolute',
              left: prefix ? 8 : 12,
              top: labelTop,
              transform: labelTransform,
              fontSize: labelFontSize,
              fontWeight: isFloated ? 600 : 400,
              color: labelColor,
              transition: 'all 150ms ease',
              pointerEvents: 'none',
              userSelect: 'none',
              fontFamily: FF,
              lineHeight: '16px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              maxWidth: 'calc(100% - 24px)',
              textOverflow: 'ellipsis',
            }}
          >
            {label}{required && ' *'}
          </label>

          {/* Input field */}
          <input
            id={inputId}
            name={name}
            type={type}
            value={currentValue}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={isFloated ? placeholder : ''}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
              paddingLeft: prefix ? 8 : 12,
              paddingRight: suffix ? 8 : 12,
              paddingTop: isFloated ? (size === 'small' ? 14 : 20) : 0,
              paddingBottom: 0,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: size === 'small' ? 13 : 14,
              color: disabled ? '#777777' : '#2B2B2B',
              width: '100%',
              boxSizing: 'border-box',
              cursor: disabled ? 'not-allowed' : undefined,
              fontFamily: FF,
            }}
          />
        </div>

        {suffix && (
          <div style={{
            display: 'flex', alignItems: 'center', paddingRight: 12,
            color: '#777777', flexShrink: 0,
          }}>
            {suffix}
          </div>
        )}
      </div>

      {error && (
        <p id={`${inputId}-error`} style={{ margin: '4px 0 0', fontSize: 12, color: '#D32F2F', fontFamily: FF }}>
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={`${inputId}-helper`} style={{ margin: '4px 0 0', fontSize: 12, color: '#777777', fontFamily: FF }}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
