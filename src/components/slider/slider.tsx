import React, { useState } from 'react';

interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  className?: string;
  disabled?: boolean;
}

const Slider: React.FC<SliderProps> = ({ value, min = 0, max = 100, onChange, className, disabled = false }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  const handleMouseEnter = () => {
    setIsFocused(true);
  };

  const handleMouseLeave = () => {
    setIsFocused(false);
  };

  return (
    <div className={`slider-container ${className}`} role="slider" aria-valuemin={min} aria-valuemax={max} aria-valuenow={value} tabIndex={0} aria-label="Slider" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <style>
        {`
          :root {
            --ps-primary-color: #005BA6;
            --ps-midnight: #002F48;
            --ps-slider-track-height: 4px;
            --ps-slider-track-radius: 100px;
            --ps-slider-thumb-size: 20px;
            --ps-slider-thumb-radius: 50%;
            --ps-slider-label-color: #6B6B6B;
            --ps-slider-tooltip-background: #003366;
            --ps-slider-tooltip-text: #FFFFFF;
            --ps-slider-disabled-track: #E0E0E0;
            --ps-slider-disabled-fill: #C0C0C0;
            --ps-slider-disabled-thumb: #C0C0C0;
          }

          .slider-container {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .slider {
            appearance: none;
            width: 100%;
            height: var(--ps-slider-track-height);
            border-radius: var(--ps-slider-track-radius);
            background: var(--ps-primary-color);
            outline: none;
            margin: 0;
          }

          .slider:focus {
            box-shadow: 0 0 0 3px rgba(0,147,244,0.3);
          }

          .slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: var(--ps-slider-thumb-size);
            height: var(--ps-slider-thumb-size);
            border-radius: var(--ps-slider-thumb-radius);
            background: var(--ps-slider-thumb-background);
            border: 2px solid var(--ps-slider-thumb-border);
            cursor: pointer;
            transition: background 0.3s;
          }

          .slider-thumb:hover {
            background: var(--ps-slider-thumb-backgroundHover);
          }

          .slider:disabled {
            background: var(--ps-slider-disabled-track);
          }

          .slider:disabled .slider-thumb {
            background: var(--ps-slider-disabled-thumb);
            cursor: not-allowed;
          }
        `}
      </style>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className={`slider ${disabled ? 'disabled' : ''}`}
        disabled={disabled}
        style={{ position: 'relative', cursor: disabled ? 'not-allowed' : 'pointer' }}
      />
      <label style={{ color: 'var(--ps-slider-label-color)', fontSize: '13px', marginBottom: '8px' }}>
        Value: {value}
      </label>
    </div>
  );
};

export default Slider;
