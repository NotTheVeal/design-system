import React, { forwardRef, InputHTMLAttributes } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

export type InputSize = 'small' | 'medium' | 'large';
export type InputState = 'default' | 'error' | 'success' | 'disabled';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Display label */
  label?: string;
  /** Helper or error text shown below the input */
  helperText?: string;
  /** Input size — controls height */
  size?: InputSize;
  /** Visual state */
  state?: InputState;
  /** Icon element to show on the left side */
  leadingIcon?: React.ReactNode;
  /** Icon element to show on the right side */
  trailingIcon?: React.ReactNode;
  /** Stretch to fill its container */
  fullWidth?: boolean;
}

// ─── Style Helpers ────────────────────────────────────────────────────────────

const HEIGHT_MAP: Record<InputSize, number> = {
  small: 32,
  medium: 48,
  large: 80,
};

const FONT_MAP: Record<InputSize, number> = {
  small: 12,
  medium: 14,
  large: 16,
};

const PADDING_X_MAP: Record<InputSize, string> = {
  small: '8px',
  medium: '12px',
  large: '16px',
};

const BORDER_COLOR: Record<InputState, string> = {
  default: '#D1D5DB',
  error: '#E00000',
  success: '#0E7C55',
  disabled: '#E5E7EB',
};

const FOCUS_COLOR: Record<InputState, string> = {
  default: '#005BA6',
  error: '#E00000',
  success: '#0E7C55',
  disabled: '#E5E7EB',
};

const HELPER_COLOR: Record<InputState, string> = {
  default: '#6B7280',
  error: '#E00000',
  success: '#0E7C55',
  disabled: '#9CA3AF',
};

// ─── Component ────────────────────────────────────────────────────────────────

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      size = 'medium',
      state = 'default',
      leadingIcon,
      trailingIcon,
      fullWidth = false,
      style,
      className,
      disabled,
      ...rest
    },
    ref
  ) => {
    const resolvedState: InputState = disabled ? 'disabled' : state;
    const height = HEIGHT_MAP[size];
    const fontSize = FONT_MAP[size];
    const paddingX = PADDING_X_MAP[size];
    const borderColor = BORDER_COLOR[resolvedState];
    const focusColor = FOCUS_COLOR[resolvedState];

    // Padding adjustments for icons
    const paddingLeft = leadingIcon ? `${height}px` : paddingX;
    const paddingRight = trailingIcon ? `${height}px` : paddingX;

    const wrapperStyle: React.CSSProperties = {
      display: 'inline-flex',
      flexDirection: 'column',
      gap: 4,
      width: fullWidth ? '100%' : undefined,
      fontFamily: "'Source Sans 3', -apple-system, sans-serif",
    };

    const fieldWrapperStyle: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      width: fullWidth ? '100%' : undefined,
    };

    const inputStyle: React.CSSProperties = {
      height,
      width: fullWidth ? '100%' : undefined,
      minWidth: 200,
      paddingLeft,
      paddingRight,
      fontSize,
      fontFamily: 'inherit',
      color: resolvedState === 'disabled' ? '#9CA3AF' : '#111827',
      backgroundColor: resolvedState === 'disabled' ? '#F9FAFB' : '#FFFFFF',
      border: `1px solid ${borderColor}`,
      borderRadius: 4,
      outline: 'none',
      boxSizing: 'border-box',
      transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
      cursor: resolvedState === 'disabled' ? 'not-allowed' : 'text',
      ...style,
    };

    const iconStyle = (side: 'left' | 'right'): React.CSSProperties => ({
      position: 'absolute',
      [side]: 0,
      top: 0,
      bottom: 0,
      width: height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: resolvedState === 'disabled' ? '#9CA3AF' : '#6B7280',
      pointerEvents: 'none',
      zIndex: 1,
    });

    const labelStyle: React.CSSProperties = {
      fontSize: 13,
      fontWeight: 600,
      color: resolvedState === 'disabled' ? '#9CA3AF' : '#374151',
      fontFamily: 'inherit',
    };

    const helperStyle: React.CSSProperties = {
      fontSize: 12,
      color: HELPER_COLOR[resolvedState],
      fontFamily: 'inherit',
    };

    return (
      <div style={wrapperStyle} className={className}>
        {label && <label style={labelStyle}>{label}</label>}

        <div style={fieldWrapperStyle}>
          {leadingIcon && <span style={iconStyle('left')}>{leadingIcon}</span>}

          <input
            ref={ref}
            style={inputStyle}
            disabled={resolvedState === 'disabled'}
            onFocus={(e) => {
              if (resolvedState !== 'disabled') {
                (e.target as HTMLInputElement).style.borderColor = focusColor;
                (e.target as HTMLInputElement).style.boxShadow = `0 0 0 3px ${focusColor}22`;
              }
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor = borderColor;
              (e.target as HTMLInputElement).style.boxShadow = 'none';
            }}
            aria-invalid={resolvedState === 'error' ? true : undefined}
            aria-describedby={helperText ? 'input-helper' : undefined}
            {...rest}
          />

          {trailingIcon && <span style={iconStyle('right')}>{trailingIcon}</span>}
        </div>

        {helperText && (
          <span id="input-helper" style={helperStyle}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
