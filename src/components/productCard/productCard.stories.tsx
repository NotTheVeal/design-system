import type{Meta,StoryObj}from'@storybook/react';
import{ProductCard}from'./productCard';
const meta:Meta<typeof ProductCard>={title:'Components/ProductCard',component:ProductCard,tags:['autodocs'],parameters:{docs:{description:{component:'`current`=Orange#005BA6 CTAs ADA-FAIL | `future`=Blue#005BA6 CTAs ADA-PASS'}}}};
export default meta;type Story=StoryObj<typeof ProductCard>;
const B=({s}:{s:'current'|'future'})=>s==='future'
  ?<div style={{padding:'8px 12px',background:'#E2F5EE',borderRadius:4,fontSize:12,color:'#0E7C55',marginBottom:8}}>✅ ADA COMPLIANT — PS Blue #005BA6 — 4.8:1</div>
  :<div style={{padding:'8px 12px',background:'#FACBCB',borderRadius:4,fontSize:12,color:'#C00',marginBottom:8}}>⚠️ LEGACY — Orange #005BA6 — 2.9:1 — DO NOT USE IN PRODUCTION</div>;
export const Future_Default:Story={name:'✅ Future · Product Card (PS Blue CTAs)',render:()=><div style={{padding:24}}><B s="future"/><ProductCard colorScheme="future"/></div>};
export const Current_Default:Story={name:'⚠️ Current · Product Card (Legacy Orange CTAs)',render:()=><div style={{padding:24}}><B s="current"/><ProductCard colorScheme="future"/></div>};
export const SideBySide:Story={name:'🔄 Side-by-Side: Current vs Future',render:()=>(
  <div style={{display:'flex',gap:32,padding:24,flexWrap:'wrap',fontFamily:"'Source Sans Pro',sans-serif"}}>
    <div><div style={{fontSize:11,fontWeight:700,color:'#C00',marginBottom:8}}>⚠️ CURRENT — Orange #005BA6</div><ProductCard colorScheme="future"/></div>
    <div><div style={{fontSize:11,fontWeight:700,color:'#0E7C55',marginBottom:8}}>✅ FUTURE — PS Blue #005BA6</div><ProductCard colorScheme="future"/></div>
  </div>)};
