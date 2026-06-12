import type{Meta,StoryObj}from'@storybook/react';
import React,{useState}from'react';
import{Stepper,QuantityStepper}from'./stepper';

const meta:Meta<typeof Stepper>={title:'Components/Stepper',component:Stepper,tags:['autodocs'],
  parameters:{docs:{description:{component:'Step Indicator: multi-step progress wizard (Step 1->2->3). For PDP quantity +/- control see QuantityStepper stories. current=Orange ADA-FAIL | future=Blue ADA-PASS'}}}};
export default meta;type Story=StoryObj<typeof Stepper>;
const STEPS=[{label:'Request'},{label:'Approval'},{label:'Order'},{label:'Delivery'}];
const B=({s}:{s:'current'|'future'})=>s==='future'
  ?<div style={{padding:'8px 12px',background:'#E2F5EE',borderRadius:4,fontSize:12,color:'#0E7C55',marginBottom:8}}>ADA COMPLIANT - PS Blue #005BA6 - 4.8:1</div>
  :<div style={{padding:'8px 12px',background:'#FACBCB',borderRadius:4,fontSize:12,color:'#C00',marginBottom:8}}>LEGACY - Orange #FF9505 - 2.9:1 - DO NOT USE IN PRODUCTION</div>;
export const Future_Step2:Story={name:'Future Step 2 Active (PS Blue)',render:()=><div style={{padding:24}}><B s="future"/><Stepper colorScheme="future" steps={STEPS} currentStep={1}/></div>};
export const Future_Step3:Story={name:'Future Step 3 Active',render:()=><div style={{padding:24}}><Stepper colorScheme="future" steps={STEPS} currentStep={2}/></div>};
export const Current_Step2:Story={name:'Current Step 2 Active (Legacy Orange)',render:()=><div style={{padding:24}}><B s="current"/><Stepper colorScheme="current" steps={STEPS} currentStep={1}/></div>};
export const SideBySide:Story={name:'Step Indicator: Current vs Future',render:()=>(
  <div style={{display:'flex',flexDirection:'column',gap:32,padding:24,fontFamily:"'Source Sans Pro',sans-serif"}}>
    <div><div style={{fontSize:11,fontWeight:700,color:'#C00',marginBottom:8}}>CURRENT - Orange #FF9505 - 2.9:1 - FAILS WCAG AA</div><Stepper colorScheme="current" steps={STEPS} currentStep={1}/></div>
    <div style={{height:1,background:'#DCDCDC'}}/>
    <div><div style={{fontSize:11,fontWeight:700,color:'#0E7C55',marginBottom:8}}>FUTURE - PS Blue #005BA6 - 4.8:1 - PASSES WCAG AA</div><Stepper colorScheme="future" steps={STEPS} currentStep={1}/></div>
  </div>)};

const QtyInteractive=({colorScheme}:{colorScheme:'current'|'future'})=>{
  const[v,setV]=useState(1);
  return<QuantityStepper colorScheme={colorScheme} value={v} onChange={setV} min={1} max={10}/>;
};
export const Qty_Future:StoryObj<typeof QuantityStepper>={name:'Future Quantity Stepper (PS Blue)',render:()=><div style={{padding:24}}><B s="future"/><QtyInteractive colorScheme="future"/></div>};
export const Qty_Current:StoryObj<typeof QuantityStepper>={name:'Current Quantity Stepper (Legacy Orange)',render:()=><div style={{padding:24}}><B s="current"/><QtyInteractive colorScheme="current"/></div>};
export const Qty_Disabled:StoryObj<typeof QuantityStepper>={name:'Quantity Stepper - Disabled',render:()=><div style={{padding:24}}><QuantityStepper colorScheme="future" value={3} disabled/></div>};
export const Qty_PDPContext:StoryObj<typeof QuantityStepper>={name:'Quantity Stepper - PDP Context (Figma reference)',render:()=>{
  const[qty,setQty]=useState(1);
  return(<div style={{padding:24,fontFamily:"'Source Sans Pro',sans-serif",maxWidth:400}}>
    <div style={{background:'#FFF',border:'1px solid #DCDCDC',borderRadius:4,padding:20,display:'flex',flexDirection:'column',gap:16}}>
      <div style={{fontSize:14,fontWeight:700,color:'#002F48'}}>Patient Cable, SpO2 Spot Check</div>
      <div style={{fontSize:22,fontWeight:700,color:'#002F48'}}>$42.50</div>
      <div style={{display:'flex',alignItems:'center',gap:16}}>
        <QuantityStepper colorScheme="future" value={qty} onChange={setQty} min={1} max={99}/>
        <button style={{flex:1,background:'#005BA6',border:'2px solid #005BA6',borderRadius:4,padding:'10px 16px',color:'#FFF',fontSize:13,fontWeight:700,letterSpacing:0.5,textTransform:'uppercase',cursor:'pointer',fontFamily:'inherit'}}>Add to Cart</button>
      </div>
    </div>
  </div>);}};
