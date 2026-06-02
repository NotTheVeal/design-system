import React from 'react';
export type StepperColorScheme='current'|'future';
export type StepStatus='not-started'|'in-progress'|'completed';
export interface Step{label:string;description?:string;}
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
export default Stepper;
