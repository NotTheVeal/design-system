import React,{useState,useId}from'react';
const FONT="'Source Sans 3',-apple-system,sans-serif";
export type RadioColorScheme='current'|'future';
const COLORS={current:{checked:'#FF9505',border:'#FF9505',focus:'rgba(255,149,5,0.35)'},future:{checked:'#005BA6',border:'#005BA6',focus:'rgba(0,147,244,0.3)'}};
export interface RadioProps{value:string;label?:string;checked?:boolean;disabled?:boolean;colorScheme?:RadioColorScheme;name?:string;onChange?:(v:string)=>void;helperText?:string;className?:string;}
export const Radio:React.FC<RadioProps>=({value,label,checked=false,disabled=false,colorScheme='current',name,onChange,helperText,className=''})=>{
  const id=useId();
  const[focused,setFocused]=useState(false);
  const c=COLORS[colorScheme];
  const border=disabled?'1.5px solid #DCDCDC':checked?`1.5px solid ${c.border}`:'1.5px solid #CCCCCC';
  const bg=disabled?'#F1F1F1':checked?c.checked:'#FFFFFF';
  return(<div style={{display:'inline-flex',flexDirection:'column',gap:4,fontFamily:FONT}}className={className}>
    <div style={{display:'inline-flex',alignItems:'center',gap:8,cursor:disabled?'not-allowed':'pointer',opacity:disabled?0.5:1}}>
      <div role="radio" aria-checked={checked} tabIndex={disabled?-1:0} id={id}
        onClick={()=>!disabled&&onChange?.(value)}
        onKeyDown={e=>{if((e.key===' '||e.key==='Enter')&&!disabled){e.preventDefault();onChange?.(value);}}}
        onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
        style={{width:24,height:24,borderRadius:'50%',border,background:bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,transition:'all 150ms ease',outline:'none',boxShadow:focused?`0 0 0 3px ${c.focus}`:'none'}}>
        {checked&&<div style={{width:8,height:8,borderRadius:'50%',background:'#FFFFFF'}}/>}
      </div>
      {label&&<span style={{fontSize:14,color:disabled?'#949494':'#4A4A4A',userSelect:'none'}}>{label}</span>}
    </div>
    {helperText&&<span style={{fontSize:12,color:'#777777',paddingLeft:32}}>{helperText}</span>}
  </div>);
};
export default Radio;
