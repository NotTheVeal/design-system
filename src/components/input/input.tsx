import React, { useState, useId } from 'react';

export interface InputProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  type?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  required?: boolean;
  id?: string;
  name?: string;
  readOnly?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  // Legacy / alias props for stories compatibility
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  state?: 'default' | 'error' | 'success' | 'disabled';
  fullWidth?: boolean;
}

const heightMap = { small: '36px', medium: '48px', large: '56px' };
const labelSizeMap = { small: '12px', medium: '13px', large: '14px' };

export const Input: React.FC<InputProps> = ({
  label,
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled,
  error,
  helperText,
  type = 'text',
  size = 'medium',
  className = '',
  required,
  id,
  name,
  readOnly,
  prefix,
  suffix,
  leadingIcon,
  trailingIcon,
  state = 'default',
  fullWidth = false,
}) => {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const generatedId = useId();
  const inputId = id || generatedId;

  const isDisabled = disabled || state === 'disabled';
  const hasError = !!error || state === 'error';
  const isSuccess = state === 'success';
  const hasValue = value !== undefined ? value !== '' : internalValue !== '';
  const isFloated = focused || hasValue || !!placeholder;

  const leadingContent = prefix || leadingIcon;
  const trailingContent = suffix || trailingIcon;

  const height = heightMap[size];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) setInternalValue(e.target.value);
    onChange?.(e);
  };

  const borderColor = hasError
    ? '#D32F2F'
    : isSuccess
    ? '#17AB78'
    : focused
    ? '#005BA6'
    : '#DCDCDC';

  const labelColor = hasError
    ? '#D32F2F'
    : isSuccess
    ? '#17AB78'
    : focused
    ? '#005BA6'
    : '#777777';

  return (
    <div
      style={{
        position: 'relative',
        width: fullWidth ? '100%' : '320px',
        fontFamily: "'Source Sans Pro', -apple-system, sans-serif",
      }}
      className={className}
    >
      <div
        style={{
          position: 'relative',
          height,
          border: `1px solid ${borderColor}`,
          borderRadius: '4px',
          background: isDisabled ? '#F1F1F1' : '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          padding: leadingContent ? '0 12px 0 40px' : '0 12px',
          paddingRight: trailingContent ? '40px' : '12px',
          boxSizing: 'border-box',
          transition: 'border-color 150ms ease',
        }}
      >
        {leadingContent && (
          <span
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#777777',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {leadingContent}
          </span>
        )}

        {label && (
          <label
            htmlFor={inputId}
            style={{
              position: 'absolute',
              left: leadingContent ? '40px' : '12px',
              top: isFloated ? '6px' : '50%',
              transform: isFloated ? 'none' : 'translateY(-50%)',
              fontSize: isFloated ? '11px' : '14px',
              fontWeight: isFloated ? 600 : 400,
              color: labelColor,
              transition: 'all 150ms ease',
              pointerEvents: 'none',
              lineHeight: 1,
            }}
          >
            {label}{required && ' *'}
          </label>
        )}

        <input
          id={inputId}
          name={name}
          type={type}
          value={value !== undefined ? value : internalValue}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={!label ? placeholder : undefined}
          disabled={isDisabled}
          readOnly={readOnly}
          required={required}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: '14px',
            color: isDisabled ? '#949494' : '#4A4A4A',
            paddingTop: label ? '14px' : '0',
            fontFamily: 'inherit',
            cursor: isDisabled ? 'not-allowed' : 'text',
          }}
        />

        {trailingContent && (
          <span
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#777777',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {trailingContent}
          </span>
        )}
      </div>

      {hasError && error && (
        <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#D32F2F' }}>
          {error}
        </p>
      )}
      {!hasError && helperText && (
        <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#777777' }}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
