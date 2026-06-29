import React from 'react';

export interface SliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  showValue?: boolean;
  label?: string;
  className?: string;
}

// PS Design System Slider:
// Track: 4px, #E0E0E0 bg, #005BA6 fill
// Thumb: 20×20px circle, white, 2px #005BA6 border
// Focus: 0 0 0 3px rgba(0,91,166,0.25) glow

export const Slider: React.FC<SliderProps> = ({
  value, defaultValue = 0, min = 0, max = 100, step = 1,
  onChange, disabled = false, showValue = true, label, className = '',
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const pct = ((currentValue - min) / (max - min)) * 100;

  return (
    <div className={className} style={{ width:'100%', fontFamily:font }}>
      {(label || showValue) && (
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
          {label && <span style={{ fontSize:14, color:'#4A4A4A' }}>{label}</span>}
          {showValue && <span style={{ fontSize:12, fontWeight:600, color:'#005BA6' }}>{currentValue}</span>}
        </div>
      )}
      <div style={{ position:'relative', height:20, display:'flex', alignItems:'center' }}>
        {/* Track */}
        <div style={{ position:'absolute', left:0, right:0, height:4, borderRadius:2, background:'#E0E0E0', overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${pct}%`, background: disabled ? '#CCCCCC' : '#005BA6', transition:'width 100ms' }}/>
        </div>
        {/* Native range input */}
        <input
          type="range"
          min={min} max={max} step={step}
          value={currentValue}
          disabled={disabled}
          onChange={e => {
            const v = Number(e.target.value);
            if (!isControlled) setInternalValue(v);
            onChange?.(v);
          }}
          style={{
            position:'absolute', left:0, right:0, width:'100%', height:20,
            opacity:0, cursor: disabled ? 'not-allowed' : 'pointer', zIndex:2,
          }}
        />
        {/* Custom thumb */}
        <div style={{
          position:'absolute',
          left:`calc(${pct}% - 10px)`,
          width:20, height:20, borderRadius:'50%',
          background:'#FFFFFF', border:`2px solid ${disabled ? '#CCCCCC' : '#005BA6'}`,
          boxShadow: disabled ? 'none' : '0 1px 3px rgba(0,0,0,0.15)',
          transition:'left 100ms',
          pointerEvents:'none', zIndex:1,
        }}/>
      </div>
    </div>
  );
};

export default Slider;
