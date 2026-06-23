import React from'react';
const FONT="'Source Sans 3',-apple-system,sans-serif";
export interface StepperStep{id:string;label:string;description?:string;status?:'pending'|'active'|'complete'|'error';}
export interface StepperProps{steps:StepperStep[];orientation?:'horizontal'|'vertical';className?:string;}
export const Stepper:React.FC<StepperProps>=({steps,orientation='horizontal',className=''})=>{
  const isHorz=orientation==='horizontal';
  return(
    <div className={className}style={{display:'flex',flexDirection:isHorz?'row':'column',gap:0,fontFamily:FONT,width:'100%'}}>
      {steps.map((step,idx)=>{
        const isLast=idx===steps.length-1;
        const st=step.status||'pending';
        const circleColor=st==='complete'?'#17AB78':st==='active'?'#005BA6':st==='error'?'#FF0000':'#DCDCDC';
        const textColor=st==='active'?'#005BA6':st==='complete'?'#17AB78':st==='error'?'#FF0000':'#777777';
        return(
          <div key={step.id}style={{display:'flex',flexDirection:isHorz?'column':'row',alignItems:isHorz?'center':'flex-start',flex:isHorz?1:undefined,gap:isHorz?8:12}}>
            <div style={{display:'flex',flexDirection:isHorz?'row':'column',alignItems:'center',width:isHorz?'100%':undefined}}>
              {/* Circle */}
              <div style={{width:32,height:32,borderRadius:'50%',background:circleColor,color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:700,flexShrink:0,zIndex:1}}>
                {st==='complete'?
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  :st==='error'?'!':idx+1
                }
              </div>
              {/* Connector */}
              {!isLast&&<div style={{flex:isHorz?1:undefined,height:isHorz?undefined:undefined,[isHorz?'height':'width']:isHorz?2:2,[isHorz?'minWidth':'minHeight']:isHorz?24:24,background:st==='complete'?'#17AB78':'#DCDCDC',margin:isHorz?'0 4px':'4px 15px'}}/>}
            </div>
            {/* Label */}
            <div style={{textAlign:isHorz?'center':'left',paddingBottom:isHorz?0:isLast?0:24}}>
              <div style={{fontSize:13,fontWeight:st==='active'?700:500,color:textColor,lineHeight:1.3}}>{step.label}</div>
              {step.description&&<div style={{fontSize:12,color:'#777777',marginTop:2,lineHeight:1.4}}>{step.description}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Stepper;
