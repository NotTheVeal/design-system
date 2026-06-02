import type{Meta,StoryObj}from'@storybook/react';
import{Cart}from'./cart';
const meta:Meta<typeof Cart>={title:'Components/Cart',component:Cart,tags:['autodocs'],parameters:{docs:{description:{component:'`current`=Orange#FF9505 CTAs ADA-FAIL | `future`=Blue#005BA6 CTAs ADA-PASS'}}}};
export default meta;type Story=StoryObj<typeof Cart>;
const B=({s}:{s:'current'|'future'})=>s==='future'
  ?<div style={{padding:'8px 12px',background:'#E2F5EE',borderRadius:4,fontSize:12,color:'#0E7C55',marginBottom:8}}>✅ ADA COMPLIANT — PS Blue #005BA6 — 4.8:1</div>
  :<div style={{padding:'8px 12px',background:'#FACBCB',borderRadius:4,fontSize:12,color:'#C00',marginBottom:8}}>⚠️ LEGACY — Orange #FF9505 — 2.9:1 — DO NOT USE IN PRODUCTION</div>;
export const Future_Default:Story={name:'✅ Future · Cart (PS Blue CTAs)',render:()=><div style={{padding:24}}><B s="future"/><Cart colorScheme="future"/></div>};
export const Current_Default:Story={name:'⚠️ Current · Cart (Legacy Orange CTAs)',render:()=><div style={{padding:24}}><B s="current"/><Cart colorScheme="current"/></div>};
export const SideBySide:Story={name:'🔄 Side-by-Side: Current vs Future',render:()=>(
  <div style={{display:'flex',gap:32,padding:24,flexWrap:'wrap',fontFamily:"'Source Sans Pro',sans-serif"}}>
    <div><div style={{fontSize:11,fontWeight:700,color:'#C00',marginBottom:8}}>⚠️ CURRENT — Orange #FF9505</div><Cart colorScheme="current"/></div>
    <div><div style={{fontSize:11,fontWeight:700,color:'#0E7C55',marginBottom:8}}>✅ FUTURE — PS Blue #005BA6</div><Cart colorScheme="future"/></div>
  </div>)};
