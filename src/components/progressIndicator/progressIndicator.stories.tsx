import type {Meta,StoryObj} from '@storybook/react';
import React,{useState,useEffect} from 'react';
import {ProgressIndicator} from './progressIndicator';
const meta:Meta<typeof ProgressIndicator>={title:'Components/ProgressIndicator',component:ProgressIndicator,parameters:{layout:'padded'},argTypes:{value:{control:{type:'range',min:0,max:100}}}};
export default meta;
type Story=StoryObj<typeof ProgressIndicator>;
export const Default:Story={args:{value:65,label:'Upload Progress'}};
export const Complete:Story={args:{value:100,label:'Processing Complete'}};
export const Error:Story={args:{value:40,label:'Failed — Retrying',variant:'error'}};
export const Thin:Story={args:{value:75,size:'sm'}};
export const WithSteps:Story={
  render:()=>{
    const steps=['Upload File','Validate Data','Process Order','Confirm'];
    const [cur,setCur]=useState(1);
    return(<div style={{maxWidth:500,fontFamily:'Source Sans Pro, sans-serif',display:'flex',flexDirection:'column',gap:20}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
        {steps.map((s,i)=><div key={s} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
          <div style={{width:28,height:28,borderRadius:'50%',background:i<cur?'#17AB78':i===cur?'#005BA6':'#DCDCDC',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700}}>{i<cur?'✓':i+1}</div>
          <span style={{fontSize:11,color:i<=cur?'#002F48':'#949494',fontWeight:i===cur?600:400}}>{s}</span>
        </div>)}
      </div>
      <ProgressIndicator value={(cur/steps.length)*100} label={`Step ${cur} of ${steps.length}: ${steps[cur-1]}`}/>
      <div style={{display:'flex',gap:8}}>
        <button disabled={cur<=1} onClick={()=>setCur(p=>p-1)} style={{padding:'8px 16px',border:'1px solid #DCDCDC',borderRadius:4,cursor:cur>1?'pointer':'not-allowed',fontFamily:'inherit',background:'white',color:'#4A4A4A',opacity:cur<=1?0.4:1}}>Back</button>
        <button disabled={cur>=steps.length} onClick={()=>setCur(p=>p+1)} style={{padding:'8px 16px',border:'none',borderRadius:4,cursor:cur<steps.length?'pointer':'not-allowed',fontFamily:'inherit',background:'#005BA6',color:'white',opacity:cur>=steps.length?0.4:1}}>Next</button>
      </div>
    </div>);
  },
};
export const Animated:Story={
  render:()=>{const [v,setV]=useState(0); useEffect(()=>{const iv=setInterval(()=>setV(p=>{if(p>=100){clearInterval(iv);return 100;}return p+2;}),80);return()=>clearInterval(iv);},[]);return(<div style={{maxWidth:400}}><ProgressIndicator value={v} label={'Syncing inventory: '+v+'%'}/></div>);},
};
