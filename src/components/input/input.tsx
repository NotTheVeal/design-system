import React, { useState } from 'react';

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

  const controlled = value !== undefined;
  const currentValue = controlled ? value : internalValue;
  const hasValue = currentValue !== '' && currentValue !== undefined;
  const floated = focused || hasValue;

  const inputId = id ?? `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const height = size === 'large' ? 'h-[80px]' : 'h-[48px]';

  const borderColor = error
    ? 'border-[color:var(--ps-border-error)]'
    : focused
    ? 'border-[color:var(--ps-brand-primary)]'
    : disabled
    ? 'border-[color:var(--ps-border-default)]'
    : 'border-[color:var(--ps-border-default)] hover:border-[#949494]';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!controlled) setInternalValue(e.target.value);
    onChange?.(e);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className={`relative ${height} border ${borderColor} rounded-[4px] bg-white transition-all duration-150 ${disabled ? 'bg-[#F1F1F1] cursor-not-allowed' : ''}`}>
        <label
          htmlFor={inputId}
          className={`absolute left-3 transition-all duration-150 pointer-events-none select-none ${
            floated
              ? 'top-2 text-[12px] font-semibold text-[color:var(--ps-brand-primary)]'
              : 'top-1/2 -translate-y-1/2 text-[16px] text-[#777777]'
          } ${error ? '!text-[color:var(--ps-border-error)]' : ''}`}
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
          className={`absolute bottom-0 left-0 right-0 px-3 pb-2 bg-transparent border-none outline-none text-[16px] text-[color:var(--ps-fg-primary)] w-full ${floated ? 'pt-6' : 'pt-2'} ${disabled ? 'cursor-not-allowed text-[#777777]' : ''}`}
          style={{ fontFamily: "'Source Sans Pro', sans-serif" }}
        />
      </div>
      {error && <p className="mt-1 text-[12px] text-[color:var(--ps-border-error)]">{error}</p>}
      {!error && helperText && <p className="mt-1 text-[12px] text-[#777777]">{helperText}</p>}
    </div>
  );
};

export default Input;
