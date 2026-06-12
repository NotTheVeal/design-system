import React,{useState}from'react';
export type StepperColorScheme='current'|'future';
export type StepStatus='not-started'|'in-progress'|'completed';
export interface Step{label:string;description?:string;}

// Step Indicator (progress wizard: Step 1 -> 2 -> 3)
export interface StepperProps{colorScheme?:StepperColorScheme;steps:Step[];currentStep?:number;orientation?:'horizontal'|'vertical';className?:string;}
const C={current:{active:'#FF9505',activeBg:'#FFF8EC'},future:{active:'#005BA6',activeBg:'#DCEAED'}};
export const Stepper:React.FC<StepperProps>=({colorScheme='future',steps,currentStep=0,orientation='horizontal',className=''})=>{
  const c=C[colorScheme];
  const getStatus=(i:number):StepStatus=>i<currentStep?'completed':i===currentStep?'in-progress':'not-started';
  const getCircle=(s:StepStatus):React.CSSProperties=>s==='completed'?{background:'#17AB78',border:'2px solid #17AB78',color:'#fff'}:s==='in-progress'?{background:c.activeBg,border:`2px solid ${c.active}`,color:c.active}:{background:'#FFF',border:'2px solid #DCDCDC',color:'#949494'};
  const isH=orientation==='horizontal';
  return(<div className={className} style={{display:'flex',flexDirection:isH?'row':'column',alignItems:isH?'flex-start':'stretch',fontFamily:"'Source Sans Pro',sans-serif"}}>
    {steps.map((step,i)=>{const s=getStatus(i);const cs=getCircle(s);const isLast=i===steps.length-1;return(
      <div key={i} style={{display:'flex',flexDirection:isH?'column':'row',alignItems:isH?'center':'flex-start',flex:isH&&!isLast?1:undefined,gap:isH?8:0}}>
        <div style={{display:'flex',flexDirection:isH?'row':'column',alignItems:'center',width:isH?'100%':undefined}}>
          <div style={{width:32,height:32,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:700,flexShrink:0,...cs}}>
            {s==='completed'?<svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 6L6 11L15 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>:<span>{i+1}</span>}
          </div>
          {!isLast&&<div style={{flex:isH?1:undefined,height:isH?2:32,width:isH?undefined:2,background:s==='completed'?'#17AB78':'#DCDCDC',minWidth:isH?24:undefined}}/>}
        </div>
        <div style={{textAlign:isH?'center':'left',paddingLeft:isH?0:12,maxWidth:isH?100:undefined}}>
          <div style={{fontSize:12,fontWeight:s==='in-progress'?700:400,color:s==='in-progress'?c.active:s==='completed'?'#17AB78':'#949494'}}>{step.label}</div>
          {step.description&&<div style={{fontSize:11,color:'#949494',marginTop:2}}>{step.description}</div>}
        </div>
      </div>);})}
  </div>);
};

// Quantity Stepper (PDP +/- input matching Figma PDP Equivalents)
export interface QuantityStepperProps{colorScheme?:StepperColorScheme;value?:number;min?:number;max?:number;disabled?:boolean;label?:string;onChange?:(v:number)=>void;className?:string;}
export const QuantityStepper:React.FC<QuantityStepperProps>=({colorScheme='future',value:valueProp,min=1,max=99,disabled=false,label='Qty',onChange,className=''})=>{
  const[internal,setInternal]=useState(valueProp??1);
  const value=valueProp!==undefined?valueProp:internal;
  const set=(v:number)=>{const clamped=Math.max(min,Math.min(max,v));setInternal(clamped);onChange?.(clamped);};
  return(<div className={className} style={{display:'inline-flex',flexDirection:'column',gap:4,fontFamily:"'Source Sans Pro',sans-serif"}}>
    {label&&<span style={{fontSize:12,fontWeight:600,color:disabled?'#949494':'#4A4A4A',textTransform:'uppercase',letterSpacing:'0.04em'}}>{label}</span>}
    <div style={{display:'flex',alignItems:'center',border:'1px solid #DCDCDC',borderRadius:4,overflow:'hidden',width:'fit-content',opacity:disabled?.6:1}}>
      <button aria-label="Decrease quantity" disabled={disabled||value<=min} onClick={()=>set(value-1)}
        style={{width:36,height:36,borderRadius:0,border:'none',borderRight:'1px solid #DCDCDC',background:'#FFF',color:disabled||value<=min?'#DCDCDC':'#4A4A4A',cursor:disabled||value<=min?'not-allowed':'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'background 150ms ease'}}
        onMouseEnter={e=>{if(!disabled&&value>min)(e.currentTarget as HTMLButtonElement).style.background='#F1F1F1';}}
        onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background='#FFF';}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
      <span style={{minWidth:44,textAlign:'center',fontSize:14,fontWeight:700,color:disabled?'#949494':'#002F48',padding:'0 8px',userSelect:'none'}}>{value}</span>
      <button aria-label="Increase quantity" disabled={disabled||value>=max} onClick={()=>set(value+1)}
        style={{width:36,height:36,borderRadius:0,border:'none',borderLeft:'1px solid #DCDCDC',background:'#FFF',color:disabled||value>=max?'#DCDCDC':'#4A4A4A',cursor:disabled||value>=max?'not-allowed':'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'background 150ms ease'}}
        onMouseEnter={e=>{if(!disabled&&value<max)(e.currentTarget as HTMLButtonElement).style.background='#F1F1F1';}}
        onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background='#FFF';}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
    </div>
  </div>);
};

export default Stepper;
