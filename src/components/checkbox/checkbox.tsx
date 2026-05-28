import React from 'react';

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  indeterminate?: boolean;
  className?: string;
  id?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  indeterminate = false,
  className = '',
  id,
}) => {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const controlled = checked !== undefined;
  const isChecked = controlled ? checked : internalChecked;
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  const inputId = id ?? `checkbox-${Math.random().toString(36).slice(2)}`;
  
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!controlled) setInternalChecked(e.target.checked);
    onChange?.(e.target.checked);
  };
  
  const isActive = isChecked || indeterminate;
  
  return (
    <label
      htmlFor={inputId}
      className={`inline-flex items-center gap-2 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <div className={`relative flex-shrink-0 w-[24px] h-[24px] rounded-[2px] border-[1.5px] transition-all duration-150
        ${isActive
          ? 'bg-[#005BA6] border-[#005BA6]'
          : 'bg-white border-[#DCDCDC] hover:border-[#005BA6]'}
        focus-within:shadow-[0_0_10px_5px_rgba(0,91,166,0.3)]`}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
        />
        {isChecked && !indeterminate && (
          <svg className="absolute inset-0 m-auto w-[14px] h-[14px] text-white" viewBox="0 0 14 14" fill="none">
            <path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {indeterminate && (
          <svg className="absolute inset-0 m-auto w-[10px] h-[2px] text-white" viewBox="0 0 10 2" fill="none">
            <rect width="10" height="2" rx="1" fill="currentColor"/>
          </svg>
        )}
      </div>
      {label && (
        <span className="text-[16px] text-[#4A4A4A]">{label}</span>
      )}
    </label>
  );
};

export default Checkbox;
