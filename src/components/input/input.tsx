import React from 'react';

interface InputProps {
  className?: string;
  label: string;
  error?: string;
  disabled?: boolean;
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({ 
  className, 
  label, 
  error, 
  disabled, 
  value, 
  placeholder, 
  onChange, 
  onFocus, 
  onBlur 
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus && onFocus(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur && onBlur(event);
  };

  return (
    <div className={`input-container ${className}`}>
      <label 
        className={`input-label ${isFocused || value ? 'floating' : ''} ${error ? 'error' : ''}`} 
        htmlFor="input-element"
      >
        {label}
      </label>
      <input
        id="input-element"
        className={`input-element ${isFocused ? 'focused' : ''} ${error ? 'error' : ''}`} 
        type="text" 
        value={value} 
        placeholder={placeholder} 
        onChange={onChange} 
        onFocus={handleFocus} 
        onBlur={handleBlur} 
        disabled={disabled} 
        aria-label={label}
      />
      {error && <span className="helper-text error">{error}</span>}
      <style jsx>{`
        :root {
          --ps-font: 'Source Sans Pro', sans-serif;
          --ps-blue: #005BA6;
          --ps-midnight: #002F48;
          --ps-input-height: 48px;
          --ps-input-padding-h: 16px;
          --ps-input-padding-v: 12px;
          --ps-input-border-color: #DCDCDC;
          --ps-input-focused-border-color: #005BA6;
          --ps-input-error-border-color: #FF4D4F;
          --ps-shadow-focus: 0 0 0 3px rgba(0,147,244,0.3);
          --ps-spacing-16: 16px;
        }
        .input-container {
          margin-bottom: var(--ps-spacing-16);
          position: relative;
          font-family: var(--ps-font);
        }
        .input-label {
          position: absolute;
          left: var(--ps-input-padding-h);
          top: 12px;
          font-size: 16px;
          color: var(--ps-blue);
          transition: transform 0.2s ease, font-size 0.2s ease;
        }
        .input-label.floating {
          transform: translateY(-20px);
          font-size: 12px;
          font-weight: 600;
          color: var(--ps-blue);
        }
        .input-element {
          height: var(--ps-input-height);
          padding: var(--ps-input-padding-v) var(--ps-input-padding-h);
          border: 1px solid var(--ps-input-border-color);
          border-radius: 4px;
          width: 100%;
          box-shadow: 0 0 0 transparent;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .input-element:focus {
          border-color: var(--ps-input-focused-border-color);
          box-shadow: var(--ps-shadow-focus);
        }
        .input-element.error {
          border-color: var(--ps-input-error-border-color);
        }
        .helper-text {
          font-size: 12px;
          color: var(--ps-input-error-border-color);
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
};

export default Input;
