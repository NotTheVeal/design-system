import React, { useState } from 'react';
export interface SliderProps { min?: number; max?: number; step?: number; value?: number; defaultValue?: number; onChange?: (v:number)=>void; label?: string; showValue?: boolean; showMinMax?: boolean; disabled?: boolean; className?: string; }
export const Slider: React.FC<SliderProps> = ({min=0,max=100,step=1,value:ctrl,defaultValue=0,onChange,label,showValue=true,showMinMax=false,disabled=false,className=''}) => {
  const [internal,setInternal]=useState(defaultValue);
  const cur=ctrl!==undefined?ctrl:internal;
  const pct=((cur-min)/(max-min))*100;
  const font="'Source Sans Pro',-apple-system,sans-serif";
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{const v=Number(e.target.value);if(ctrl===undefined)setInternal(v);onChange?.(v);};
  return (<div className={className} style={{display:'flex',flexDirection:'column',gap:8,fontFamily:font}}>
    {(label||showValue)&&<div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      {label&&<label style={{fontSize:13,fontWeight:600,color:'#4A4A4A'}}>{label}</label>}
      {showValue&&<span style={{fontSize:13,fontWeight:600,color:'#005BA6'}}>{cur}</span>}
    </div>}
    <div style={{position:'relative',display:'flex',alignItems:'center',height:24}}>
      <div style={{position:'absolute',left:0,right:0,height:4,background:'#DCDCDC',borderRadius:2}}>
        <div style={{position:'absolute',left:0,width:pct+'%',height:'100%',background:disabled?'#DCDCDC':'#005BA6',borderRadius:2}}/>
      </div>
      <input type="range" min={min} max={max} step={step} value={cur} onChange={handleChange} disabled={disabled}
        style={{position:'relative',width:'100%',height:4,appearance:'none',WebkitAppearance:'none' as never,background:'transparent',cursor:disabled?'not-allowed':'pointer',outline:'none'}}/>
    </div>
    {showMinMax&&<div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'#949494'}}><span>{min}</span><span>{max}</span></div>}
    <style>{"input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:" + (disabled?'#DCDCDC':'#005BA6') + ";border:2px solid white;box-shadow:0 1px 4px rgba(0,91,166,.3);cursor:" + (disabled?'not-allowed':'pointer') + ";transition:transform 150ms,box-shadow 150ms}input[type=range]::-webkit-slider-thumb:hover{transform:scale(1.15);box-shadow:0 2px 8px rgba(0,91,166,.4)}input[type=range]::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:" + (disabled?'#DCDCDC':'#005BA6') + ";border:2px solid white}"}</style>
  </div>);
};
export default Slider;