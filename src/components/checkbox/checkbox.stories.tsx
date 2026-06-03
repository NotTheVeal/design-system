import type{Meta,StoryObj}from'@storybook/react';
import{Checkbox}from'./checkbox';
const meta:Meta<typeof Checkbox>={title:'Components/Checkbox',component:Checkbox,tags:['autodocs'],
  parameters:{docs:{description:{component:'`current`=Orange#005BA6 ADA-FAIL(2.9:1) legacy-only | `future`=Blue#005BA6 ADA-PASS(4.8:1) approved'}}},
  argTypes:{colorScheme:{control:'radio',options:['current','future']}}};
export default meta;type Story=StoryObj<typeof Checkbox>;
const Banner=({s}:{s:'current'|'future'})=>s==='future'
  ?<div style={{padding:'8px 12px',background:'#E2F5EE',borderRadius:4,fontSize:12,color:'#0E7C55',fontFamily:'sans-serif',marginBottom:8}}>✅ ADA COMPLIANT — PS Blue #005BA6 — 4.8:1 — Production approved</div>
  :<div style={{padding:'8px 12px',background:'#FACBCB',borderRadius:4,fontSize:12,color:'#C00',fontFamily:'sans-serif',marginBottom:8}}>⚠️ LEGACY — Orange #005BA6 — 2.9:1 — ADA NON-COMPLIANT — DO NOT USE IN PRODUCTION</div>;
export const Future_AllStates:Story={name:'✅ Future · All States (PS Blue)',render:()=><div style={{display:'flex',flexDirection:'column',gap:12}}><Banner s="future"/><Checkbox colorScheme="future" label="Unchecked"/><Checkbox colorScheme="future" checked label="Checked"/><Checkbox colorScheme="future" indeterminate label="Indeterminate"/><Checkbox colorScheme="future" disabled label="Disabled"/><Checkbox colorScheme="future" checked disabled label="Disabled Checked"/></div>};
export const Current_AllStates:Story={name:'⚠️ Current · All States (Legacy Orange)',render:()=><div style={{display:'flex',flexDirection:'column',gap:12}}><Banner s="current"/><Checkbox colorScheme="future" label="Unchecked"/><Checkbox colorScheme="future" checked label="Checked"/><Checkbox colorScheme="future" indeterminate label="Indeterminate"/><Checkbox colorScheme="future" disabled label="Disabled"/><Checkbox colorScheme="future" checked disabled label="Disabled Checked"/></div>};
export const SideBySide:Story={name:'🔄 Side-by-Side: Current vs Future',render:()=>(
  <div style={{display:'flex',gap:40,fontFamily:"'Source Sans Pro',sans-serif"}}>
    <div><div style={{fontSize:11,fontWeight:700,color:'#C00',marginBottom:8}}>⚠️ CURRENT (LEGACY)</div><Banner s="current"/><Checkbox colorScheme="future" label="Unchecked"/><div style={{marginTop:8}}/><Checkbox colorScheme="future" checked label="Checked"/><div style={{marginTop:8}}/><Checkbox colorScheme="future" indeterminate label="Indeterminate"/></div>
    <div style={{width:1,background:'#DCDCDC'}}/>
    <div><div style={{fontSize:11,fontWeight:700,color:'#0E7C55',marginBottom:8}}>✅ FUTURE (APPROVED)</div><Banner s="future"/><Checkbox colorScheme="future" label="Unchecked"/><div style={{marginTop:8}}/><Checkbox colorScheme="future" checked label="Checked"/><div style={{marginTop:8}}/><Checkbox colorScheme="future" indeterminate label="Indeterminate"/></div>
  </div>)};
