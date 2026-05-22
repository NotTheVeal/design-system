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

const styles = `
:root {
  --ps-font: 'Source Sans Pro', sans-serif;
  --ps-primary-color: #005BA6;
  --ps-midnight: #002F48;
  --ps-border-color-default: #4A4A4A;
  --ps-border-color-hover: #EC8000;
  --ps-border-color-focus: #EC8000;
  --ps-border-color-pressed: #D27200;
  --ps-border-color-disabled: #CCCCCC;
  --ps-border-color-error: #D32F2F;
  --ps-fill-selected: #FF9505;
  --ps-fill-selected-new: #005BA6;
  --ps-fill-hover: #EC8000;
  --ps-fill-disabled: #CCCCCC;
  --ps-border-width: 1.5px;
  --ps-border-radius: 50%;
  --ps-label-gap: 8px;
  --ps-group-gap: 16px;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--ps-group-gap);
}

.radio-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: var(--ps-font);
}

.radio-input {
  display: none;
}

.radio-control {
  width: 24px;
  height: 24px;
  border: var(--ps-border-width) solid var(--ps-border-color-default);
  border-radius: var(--ps-border-radius);
  position: relative;
  margin-right: var(--ps-label-gap);
  transition: border-color 0.3s;
}

.radio-control:hover {
  border-color: var(--ps-border-color-hover);
}

.radio-input:focus + .radio-control {
  border-color: var(--ps-border-color-focus);
  box-shadow: var(--ps-shadow-focus);
}

.radio-input:checked + .radio-control {
  border-color: var(--ps-fill-selected-new);
  background-color: var(--ps-fill-selected-new);
}

.radio-inner-dot {
  width: 10px;
  height: 10px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 4px;
  left: 4px;
  display: none;
}

.radio-input:checked + .radio-control .radio-inner-dot {
  display: block;
}

.radio-text {
  font-family: var(--ps-font);
  color: var(--ps-border-color-default);
}
`;
