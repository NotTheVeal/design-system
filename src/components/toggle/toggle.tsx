import React from 'react';

interface ToggleProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
  id?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  label,
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  size = 'md',
  className = '',
  id,
}) => {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const controlled = checked !== undefined;
  const isChecked = controlled ? checked : internalChecked;
  const inputId = id ?? `toggle-${Math.random().toString(36).slice(2)}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!controlled) setInternalChecked(e.target.checked);
    onChange?.(e.target.checked);
  };

  const trackW = size === 'sm' ? 'w-[40px]' : 'w-[48px]';
  const trackH = size === 'sm' ? 'h-[22px]' : 'h-[26px]';
  const thumbSize = size === 'sm' ? 'w-[16px] h-[16px]' : 'w-[20px] h-[20px]';
  const thumbTranslate = isChecked
    ? (size === 'sm' ? 'translate-x-[20px]' : 'translate-x-[24px]')
    : 'translate-x-[3px]';

  return (
    <label
      htmlFor={inputId}
      className={`inline-flex items-center gap-3 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <div
        className={`relative ${trackW} ${trackH} rounded-full transition-all duration-200 focus-within:shadow-[0_0_0_3px_rgba(0,147,244,0.3)]
          ${isChecked ? 'bg-[#005BA6]' : 'bg-[#DCDCDC]'}
          ${disabled ? 'cursor-not-allowed' : ''}`}
      >
        <input
          id={inputId}
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
        />
        <div
          className={`absolute top-1/2 -translate-y-1/2 ${thumbSize} rounded-full bg-white shadow-sm transition-transform duration-200 ${thumbTranslate}`}
        />
      </div>
      {label && <span className="text-[16px] text-[#4A4A4A]">{label}</span>}
    </label>
  );
};

export default Toggle;
