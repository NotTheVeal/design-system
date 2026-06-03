import type{Meta,StoryObj}from'@storybook/react';
import{Toggle}from'./toggle';
const meta:Meta<typeof Toggle>={title:'Components/Toggle',component:Toggle,tags:['autodocs'],
  parameters:{docs:{description:{component:'`current`=Orange#005BA6 ADA-FAIL(2.9:1) | `future`=Blue#005BA6 ADA-PASS(4.8:1)'}}}};
export default meta;type Story=StoryObj<typeof Toggle>;
const B=({s}:{s:'current'|'future'})=>s==='future'
  ?<div style={{padding:'8px 12px',background:'#E2F5EE',borderRadius:4,fontSize:12,color:'#0E7C55',marginBottom:8}}>✅ ADA COMPLIANT — PS Blue #005BA6 — 4.8:1</div>
  :<div style={{padding:'8px 12px',background:'#FACBCB',borderRadius:4,fontSize:12,color:'#C00',marginBottom:8}}>⚠️ LEGACY — Orange #005BA6 — 2.9:1 — DO NOT USE IN PRODUCTION</div>;
export const Future_AllStates:Story={name:'✅ Future · All States (PS Blue)',render:()=><div style={{display:'flex',flexDirection:'column',gap:12}}><B s="future"/><Toggle colorScheme="future" label="Off"/><Toggle colorScheme="future" checked label="On"/><Toggle colorScheme="future" disabled label="Disabled Off"/><Toggle colorScheme="future" checked disabled label="Disabled On"/></div>};
export const Current_AllStates:Story={name:'⚠️ Current · All States (Legacy Orange)',render:()=><div style={{display:'flex',flexDirection:'column',gap:12}}><B s="current"/><Toggle colorScheme="future" label="Off"/><Toggle colorScheme="future" checked label="On"/><Toggle colorScheme="future" disabled label="Disabled Off"/><Toggle colorScheme="future" checked disabled label="Disabled On"/></div>};
export const SideBySide:Story={name:'🔄 Side-by-Side: Current vs Future',render:()=>(
  <div style={{display:'flex',gap:40,fontFamily:"'Source Sans Pro',sans-serif"}}>
    <div><div style={{fontSize:11,fontWeight:700,color:'#C00',marginBottom:8}}>⚠️ CURRENT — Orange #005BA6</div><Toggle colorScheme="future" label="Off"/><div style={{marginTop:12}}/><Toggle colorScheme="future" checked label="On"/></div>
    <div style={{width:1,background:'#DCDCDC'}}/>
    <div><div style={{fontSize:11,fontWeight:700,color:'#0E7C55',marginBottom:8}}>✅ FUTURE — PS Blue #005BA6</div><Toggle colorScheme="future" label="Off"/><div style={{marginTop:12}}/><Toggle colorScheme="future" checked label="On"/></div>
  </div>)};
