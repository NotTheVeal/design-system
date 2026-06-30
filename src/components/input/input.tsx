import React, { useState, useId, forwardRef } from 'react';

// Fix: updated to 'Source Sans 3' (Source Sans Pro is deprecated)
const FONT = "'Source Sans 3', -apple-system, sans-serif";

// ── Types ──────────────────────────────────────────────────────────────────────

export type InputSize = 'lg' | 'standard' | 'sm';  // lg=80px, standard=48px (Figma), sm=legacy 36px

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  size?: InputSize;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  className?: string;
}

// ── Size Map ───────────────────────────────────────────────────────────────────
// Figma Inputs page:
//   Large Input Field: 80px
//   Standard Input Field: 48px
//   Dropdown/DatePicker: 48px (same)

const SIZE_MAP: Record<InputSize, { height: number; fontSize: number; labelFloat: number }> = {
  lg:       { height: 80, fontSize: 16, labelFloat: 12 }, // Large Input
  standard: { height: 48, fontSize: 15, labelFloat: 12 }, // Standard Input (Figma default)
  sm:       { height: 36, fontSize: 13, labelFloat: 11 }, // Small / compact
};

// ── Floating Label Input ───────────────────────────────────────────────────────

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    helperText,
    error,
    size = 'standard',
    leadingIcon,
    trailingIcon,
    disabled = false,
    className = '',
    id,
    value,
    defaultValue,
    style,
    onFocus,
    onBlur,
    onChange,
    ...rest
  },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const hasValue = Boolean(currentValue) && String(currentValue).length > 0;

  // Floating label is active when focused OR has value
  const labelFloated = focused || hasValue;

  const { height, fontSize, labelFloat } = SIZE_MAP[size];

  // Build aria-describedby: point to error span when in error state,
  // otherwise point to helper span when helper text is present.
  const describedBy = error ? errorId : helperText ? helperId : undefined;

  // ── Border logic
  // Idle:  1px solid #DCDCDC (spec: Border default)
  // Hover: 1px solid #4A4A4A
  // Focus: 1px solid #005BA6 + glow
  // Error: 1px solid #D32F2F (spec: Error border)
  const getBorder = () => {
    if (disabled) return '1px solid #DCDCDC';
    if (error) return '1px solid #D32F2F';
    if (focused) return '1px solid #005BA6';
    if (hovered) return '1px solid #4A4A4A';
    return '1px solid #DCDCDC';
  };

  const getBoxShadow = () => {
    if (disabled) return 'none';
    if (error && focused) return '0 0 0 3px rgba(211,47,47,0.15)';
    if (focused) return '0 0 0 3px rgba(0,91,166,0.15)';
    return 'none';
  };

  // ── Floating label styles
  const floatedLabelStyle: React.CSSProperties = labelFloated ? {
    top: size === 'lg' ? 12 : 8,
    fontSize: labelFloat,
    fontWeight: 600,
    color: error ? '#D32F2F' : focused ? '#005BA6' : '#005BA6',
  } : {
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: fontSize,
    fontWeight: 400,
    color: disabled ? '#DCDCDC' : '#777777',
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e);
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: FONT, width: '100%' }}
      className={className}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          height,
          borderRadius: 4,
          border: getBorder(),
          boxShadow: getBoxShadow(),
          background: disabled ? '#FAFAFA' : '#FFFFFF',
          transition: 'border 150ms ease, box-shadow 150ms ease',
          cursor: disabled ? 'not-allowed' : 'text',
          opacity: disabled ? 0.65 : 1,
          boxSizing: 'border-box',
          ...style,
        }}
        onMouseEnter={() => !disabled && setHovered(true)}
        onMouseLeave={() => !disabled && setHovered(false)}
      >
        {leadingIcon && (
          <span style={{ paddingLeft: 12, color: '#777777', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            {leadingIcon}
          </span>
        )}

        {/* Floating label — htmlFor links it to the input via inputId (WCAG 1.3.1) */}
        {label && (
          <label
            htmlFor={inputId}
            style={{
              position: 'absolute',
              left: leadingIcon ? 40 : 12,
              pointerEvents: 'none',
              fontFamily: FONT,
              lineHeight: 1,
              transition: 'top 120ms ease, font-size 120ms ease, color 120ms ease, font-weight 120ms ease',
              ...floatedLabelStyle,
              transform: labelFloated ? undefined : 'translateY(-50%)',
              top: labelFloated ? (size === 'lg' ? 12 : 8) : '50%',
              zIndex: 1,
            }}
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...rest}
          disabled={disabled}
          value={isControlled ? value : internalValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          style={{
            flex: 1,
            height: '100%',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: FONT,
            fontSize,
            color: '#4A4A4A',
            // Padding top pushes text down when label is floated
            paddingTop: label ? (size === 'lg' ? 28 : 18) : 0,
            paddingLeft: leadingIcon ? 8 : 12,
            paddingRight: trailingIcon ? 8 : 12,
            cursor: disabled ? 'not-allowed' : 'text',
          }}
        />

        {trailingIcon && (
          <span style={{ paddingRight: 12, color: '#777777', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            {trailingIcon}
          </span>
        )}
      </div>

      {error && (
        <span
          id={errorId}
          role="alert"
          style={{ fontSize: 12, color: '#D32F2F', fontFamily: FONT }}
        >
          {error}
        </span>
      )}

      {!error && helperText && (
        <span
          id={helperId}
          style={{ fontSize: 12, color: '#777777', fontFamily: FONT }}
        >
          {helperText}
        </span>
      )}
    </div>
  );
});

export default Input;
