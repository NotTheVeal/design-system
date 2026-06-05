import React from 'react';

interface SliderProps {
  label?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  showValue?: boolean;
  valueSuffix?: string;
  className?: string;
}

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

const STYLE_ID = 'ps-slider-styles';
const injectSliderStyles = () => {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .ps-slider {
      -webkit-appearance: none; appearance: none;
      width: 100%; height: 4px; border-radius: 100px;
      outline: none; cursor: pointer; transition: box-shadow 150ms ease;
    }
    .ps-slider:focus-visible { box-shadow: 0 0 0 3px rgba(0,147,244,0.3); }
    .ps-slider:disabled { cursor: not-allowed; opacity: 0.5; }
    .ps-slider::-webkit-slider-thumb {
      -webkit-appearance: none; appearance: none;
      width: 20px; height: 20px; border-radius: 50%;
      background: #FFFFFF; border: 2px solid #005BA6;
      cursor: pointer; box-shadow: 0 1px 4px rgba(0,47,72,0.15);
      transition: box-shadow 150ms ease;
    }
    .ps-slider::-webkit-slider-thumb:hover { box-shadow: 0 0 0 6px rgba(0,91,166,0.15); }
    .ps-slider:disabled::-webkit-slider-thumb { border-color: #DCDCDC; cursor: not-allowed; }
    .ps-slider::-moz-range-thumb {
      width: 20px; height: 20px; border-radius: 50%;
      background: #FFFFFF; border: 2px solid #005BA6;
      cursor: pointer; box-shadow: 0 1px 4px rgba(0,47,72,0.15);
    }
    .ps-slider:disabled::-moz-range-thumb { border-color: #DCDCDC; cursor: not-allowed; }
    .ps-slider::-moz-range-track { height: 4px; border-radius: 100px; background: transparent; }
  `;
  document.head.appendChild(style);
};

const Slider: React.FC<SliderProps> = ({
  label, value, min = 0, max = 100, step = 1,
  onChange, disabled = false, showValue = true, valueSuffix = '', className = '',
}) => {
  if (typeof document !== 'undefined') injectSliderStyles();

  const percent = Math.round(((value - min) / (max - min)) * 100);
  const trackBg = disabled
    ? 'linear-gradient(to right, #DCDCDC 0%, #DCDCDC 100%)'
    : `linear-gradient(to right, #005BA6 0%, #005BA6 ${percent}%, #DCDCDC ${percent}%, #DCDCDC 100%)`;

  return (
    <div className={className} style={{ width: '100%', fontFamily }}>
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          {label && <span style={{ fontSize: 14, color: '#4A4A4A', fontWeight: 600, fontFamily }}>{label}</span>}
          {showValue && <span style={{ fontSize: 14, color: '#4A4A4A', fontFamily, marginLeft: 'auto' }}>{value}{valueSuffix}</span>}
        </div>
      )}
      <input
        type="range"
        className="ps-slider"
        min={min} max={max} step={step} value={value}
        disabled={disabled}
        onChange={e => onChange(Number(e.target.value))}
        aria-valuemin={min} aria-valuemax={max} aria-valuenow={value} aria-label={label}
        style={{ background: trackBg }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontSize: 12, color: '#949494', fontFamily }}>{min}{valueSuffix}</span>
        <span style={{ fontSize: 12, color: '#949494', fontFamily }}>{max}{valueSuffix}</span>
      </div>
    </div>
  );
};

export default Slider;
