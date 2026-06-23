import React, { useState } from 'react';

const FONT = "'Source Sans 3', -apple-system, sans-serif";

export interface ToggleProps {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: (v: boolean) => void;
  id?: string;
  className?: string;
}

/**
 * Toggle (Switch) — PS Design System 2.0
 * Figma spec: 40×22px track, #CCCCCC OFF, #005BA6 ON, 18×18px thumb
 */
export const Toggle: React.FC<ToggleProps> = ({ checked = false, disabled = false, label, onChange, id, className = '' }) => {
  const [focused, setFocused] = useState(false);
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, fontFamily: FONT }} className={className}>
      <div role="switch" aria-checked={checked} tabIndex={disabled ? -1 : 0} id={id} onClick={() => !disabled && onChange?.(!checked)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={{ position: 'relative', width: 40, height: 22, borderRadius: 11, background: disabled ? '#DCDCDC' : checked ? '#005BA6' : '#CCCCCC', transition: 'background 200ms ease', outline: 'none', boxShadow: focused ? '0 0 0 3px rgba(0,91,166,0.35)' : 'none' }}>
        <div style={{ position: 'absolute', top: '50%', left: checked ? 'calc(100% - 20px)' : 2, transform: 'translateY(-50%)', width: 18, height: 18, borderRadius: '50%', background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,47,72,0.25)', transition: 'left 200ms ease' }} />
      </div>
      {label && <span style={{ fontSize: 14, color: disabled ? '#949494' : '#4A4A4A' }}>{label}</span>}
    </label>
  );
};
export default Toggle;
