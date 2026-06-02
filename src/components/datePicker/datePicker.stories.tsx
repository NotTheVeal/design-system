import type{Meta,StoryObj}from'@storybook/react';
import React,{useState}from'react';
import{DatePicker}from'./datePicker';
const meta:Meta<typeof DatePicker>={title:'Components/DatePicker',component:DatePicker,tags:['autodocs'],parameters:{docs:{description:{component:'`current`=Orange#FF9505 ADA-FAIL | `future`=Blue#005BA6 ADA-PASS'}}}};
export default meta;type Story=StoryObj<typeof DatePicker>;
const B=({s}:{s:'current'|'future'})=>s==='future'
  ?<div style={{padding:'8px 12px',background:'#E2F5EE',borderRadius:4,fontSize:12,color:'#0E7C55',marginBottom:8}}>✅ ADA COMPLIANT — PS Blue #005BA6 — 4.8:1</div>
  :<div style={{padding:'8px 12px',background:'#FACBCB',borderRadius:4,fontSize:12,color:'#C00',marginBottom:8}}>⚠️ LEGACY — Orange #FF9505 — 2.9:1 — DO NOT USE IN PRODUCTION</div>;
const Demo=({s}:{s:'current'|'future'})=>{const[d,setD]=useState<Date|null>(null);return(<div style={{padding:24}}><B s={s}/><DatePicker colorScheme={s} label="Event Date" value={d} onChange={setD}/>{d&&<p style={{marginTop:12,fontSize:13,color:'#777'}}>Selected: {d.toLocaleDateString()}</p>}</div>);};
export const Future_Default:Story={name:'✅ Future · Date Picker (PS Blue)',render:()=><Demo s="future"/>};
export const Future_WithValue:Story={name:'✅ Future · With Selected Date',args:{colorScheme:'future',value:new Date(2026,5,15),label:'kervice Date'}};
export const Future_Disabled:Story={name:'✅ Future · Disabled',args:{colorScheme:'future',disabled:true,label:'Locked Date'}};
export const Current_Default:Story={name:'⚠️ Current · Date Picker (Legacy Orange)',render:()=><Demo s="current"/>};
export const Current_WithValue:Story={name:'⚠️ Current · With Selected Date (Legacy)',args:{colorScheme:'current',value:new Date(2026,5,15),label:'Service Date'}};
export const SideBySide:Story={name:'🔄 Side-by-Side: Current vs Future',render:()=>(
  <div style={{display:'flex',gap:48,padding:24,fontFamily:"'Source Sans Pro',sans-serif"}}>
    <div><div style={{fontSize:11,fontWeight:700,color:'#C00',marginBottom:8}}>⚠️ CURRENT — Orange #FF9505</div><DatePicker colorScheme="current" label="Event Date" value={new Date(2026,5,15)}/></div>
    <div><div style={{fontSize:11,fontWeight:700,color:'#0E7C55',marginBottom:8}}>✅ FUTURE — PS Blue #005BA6</div><DatePicker colorScheme="future" label="Event Date" value={new Date(2026,5,15)}/></div>
  </div>)};
