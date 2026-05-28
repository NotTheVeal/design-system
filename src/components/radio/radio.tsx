import React from 'react';

interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface RadioProps {
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  className?: string;
}

const Radio: React.FC<RadioProps> = ({
  options,
  value,
  defaultValue = '',
  onChange,
  name = 'radio-group',
  disabled = false,
  className = '',
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const controlled = value !== undefined;
  const selectedValue = controlled ? value : internalValue;

  const handleChange = (optValue: string) => {
    if (!controlled) setInternalValue(optValue);
    onChange?.(optValue);
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`} role="radiogroup">
      {options.map((opt) => {
        const isSelected = selectedValue === opt.value;
        const isDisabled = disabled || opt.disabled;
        return (
          <label
            key={opt.value}
            className={`inline-flex items-center gap-2 cursor-pointer select-none ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className={`relative flex-shrink-0 w-[24px] h-[24px] rounded-full border-[1.5px] transition-all duration-150
              ${isSelected
                ? 'border-[#005BA6]'
                : 'border-[#DCDCDC] hover:border-[#005BA6]'}
              focus-within:shadow-[0_0_10px_5px_rgba(0,91,166,0.3)]`}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={isSelected}
                onChange={() => handleChange(opt.value)}
                disabled={isDisabled}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              />
              {isSelected && (
                <div className="absolute inset-0 m-auto w-[12px] h-[12px] rounded-full bg-[#005BA6]" />
              )}
            </div>
            <span className="text-[16px] text-[#4A4A4A]">{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
};

export default Radio;
