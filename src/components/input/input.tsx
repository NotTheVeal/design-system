import React, { useState, useId } from 'react';
const FONT = "'Source Sans 3', -apple-system, sans-serif";
export type InputSize = 'lg' | 'standard' | 'sm';
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string; helperText?: string; error?: string; size?: InputSize;
  leadingIcon?: React.ReactNode; trailingIcon?: React.ReactNode; className?: string;
}
const SIZE_MAP = { lg: { height: 80, fontSize: 16, labelFloat: 12 }, standard: { height: 48, fontSize: 15, labelFloat: 12 }, sm: { height: 36, fontSize: 13, labelFloat: 11 } };
export const Input: React.FC<InputProps> = ({ label, helperText, error, size = 'standard', leadingIcon, trailingIcon, disabled = false, className = '', id, value, defaultValue, style, onFocus, onBlur, onChange, ...rest }) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const hasValue = Boolean(currentValue) && String(currentValue).length > 0;
  const labelFloated = focused || hasValue;
  const { height, fontSize, labelFloat } = SIZE_MAP[size];
  const getBorder = () => {
    if (disabled) return '1px solid #DCDCDC';
    if (error) return '1px solid #FF0000';
    if (focused) return '1px solid #005BA6';
    if (hovered) return '1px solid #000000';
    return '1px solid #949494';
  };
  const getBoxShadow = () => {
    if (disabled || !focused) return 'none';
    if (error) return '0 0 0 3px rgba(211,47,47,0.15)';
    return '0 0 0 3px rgba(0,147,244,0.3)';
  };
  const floatedLabelStyle = labelFloated ? { top: size === 'lg' ? 12 : 8, fontSize: labelFloat, fontWeight: 600, color: error ? '#D32F2F' : '#005BA6' } : { top: '50%', transform: 'translateY(-50%)', fontSize, fontWeight: 400, color: disabled ? '#DCDCDC' : '#777777' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: FONT, width: '100%' }} className={className}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', height, borderRadius: 4, border: getBorder(), boxShadow: getBoxShadow(), background: disabled ? '#FAFAFA' : '#FFFFFF', transition: 'border 150ms ease, box-shadow 150ms ease', cursor: disabled ? 'not-allowed' : 'text', opacity: disabled ? 0.65 : 1, boxSizing: 'border-box', ...style }} onMouseEnter={() => !disabled && setHovered(true)} onMouseLeave={() => !disabled && setHovered(false)}>
        {leadingIcon && <span style={{ paddingLeft: 12, color: '#777777', display: 'flex', alignItems: 'center', flexShrink: 0 }}>{leadingIcon}</span>}
        {label && <label htmlFor={inputId} style={{ position: 'absolute', left: leadingIcon ? 40 : 12, pointerEvents: 'none', fontFamily: FONT, lineHeight: 1, transition: 'top 120ms ease, font-size 120ms ease, color 120ms ease, font-weight 120ms ease', ...floatedLabelStyle, zIndex: 1 }}>{label}</label>}
        <input id={inputId} {...rest} disabled={disabled} value={isControlled ? value : internalValue} onFocus={(e) => { setFocused(true); onFocus?.(e); }} onBlur={(e) => { setFocused(false); onBlur?.(e); }} onChange={(e) => { if (!isControlled) setInternalValue(e.target.value); onChange?.(e); }} style={{ flex: 1, height: '100%', border: 'none', outline: 'none', background: 'transparent', fontFamily: FONT, fontSize, color: '#4A4A4A', paddingTop: label ? (size === 'lg' ? 28 : 18) : 0, paddingLeft: leadingIcon ? 8 : 12, paddingRight: trailingIcon ? 8 : 12, cursor: disabled ? 'not-allowed' : 'text' }} />
        {trailingIcon && <span style={{ paddingRight: 12, color: '#777777', display: 'flex', alignItems: 'center', flexShrink: 0 }}>{trailingIcon}</span>}
      </div>
      {(helperText || error) && <span style={{ fontSize: 12, color: error ? '#D32F2F' : '#777777', fontFamily: FONT }}>{error ?? helperText}</span>}
    </div>
  );
};
export default Input;
