import React from 'react';

const Radio: React.FC<RadioProps> = ({ options, selectedValue, onChange, className }) => {
  return (
    <div className={`radio-group ${className}`}>
      {options.map(option => (
        <label key={option.value} className="radio-label">
          <input
            type="radio"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={onChange}
            aria-label={option.label}
            className="radio-input"
          />
          <span className="radio-control">
            <span className="radio-inner-dot" />
          </span>
          <span className="radio-text">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

interface RadioOption {
  value: string;
  label: string;
}

interface RadioProps {
  options: RadioOption[];
  selectedValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default Radio;
