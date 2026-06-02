import type{Meta,StoryObj}from'@storybook/react';
import{Stepper}from'./stepper';
const meta:Meta<typeof Stepper>={title:'Components/Stepper',component:Stepper,tags:['autodocs'],
  parameters:{docs:{description:{component:'`currentStep` (0-based) drives step states. `current`=Orange ADA-FAIL | `future`=Blue ADA-PASS'}}}};
export default meta;type Story=StoryObj<typeof Stepper>;
const STEPS=[{label:'Request'},{label:'Approval'},{label:'Order'},{label:'Delivery'}];
const B=({s}:{s:'current'|'future'})=>s==='future'
  ?<div style={{padding:'8px 12px',background:'#E2F5EE',borderRadius:4,fontSize:12,color:'#0E7C55',marginBottom:8}}>✅ ADA COMPLIANT — PS Blue #005BA6 — 4.8:1</div>
  :<div style={{padding:'8px 12px',background:'#FACBCB',borderRadius:4,fontSize:12,color:'#C00',marginBottom:8}}>⚠️ LEGACY — Orange #FF9505 — 2.9:1 — DO NOT USE IN PRODUCTION</div>;
export const Future_Step2:Story={name:'✅ Future · Step 2 Active (PS Blue)',render:()=><div style={{padding:24}}><B s="future"/><Stepper colorScheme="future" steps={STEPS} currentStep={1}/></div>};
export const Future_Step3:Story={name:'✅ Future · Step 3 Active',render:()=><div style={{padding:24}}><Stepper colorScheme="future" steps={STEPS} currentStep={2}/></div>};
export const Current_Step2:Story={name:'⚠️ Current · Step 2 Active (Legacy Orange)',render:()=><div style={{padding:24}}><B s="current"/><Stepper colorScheme="current" steps={STEPS} currentStep={1}/></div>};
export const SideBySide:Story={name:'🔄 Side-by-Side: Current vs Future',render:()=>(
  <div style={{display:'flex',flexDirection:'column',gap:32,padding:24,fontFamily:"'Source Sans Pro',sans-serif"}}>
    <div><div style={{fontSize:11,fontWeight:700,color:'#C00',marginBottom:8}}>⚠️ CURRENT — Orange #FF9505 · 2.9:1 · FAILS WCAG AA</div><Stepper colorScheme="current" steps={STEPS} currentStep={1}/></div>
    <div style={{height:1,background:'#DCDCDC'}}/>
    <div><div style={{fontSize:11,fontWeight:700,color:'#0E7C55',marginBottom:8}}>✅ FUTURE — PS Blue #005BA6 · 4.8:1 · PASSES WCAG AA</div><Stepper colorScheme="future" steps={STEPS} currentStep={1}/></div>
  </div>)};
