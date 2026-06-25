import type{Meta,StoryObj}from'@storybook/react';
import {Radio} from './radio';
const meta:Meta<typeof Radio>={title:'Components/Radio',component:Radio,tags:['autodocs'],
  parameters:{docs:{description:{component:'`current`=Orange#005BA6 ADA-FAIL(2.9:1) | `future`=Blue#005BA6 ADA-PASS(4.8:1)'}}}};
export default meta;type Story=StoryObj<typeof Radio>;
const B=({s}:{s:'current'|'future'})=>s==='future'
  ?<div style={{padding:'8px 12px',background:'#E2F5EE',borderRadius:4,fontSize:12,color:'#0E7C55',marginBottom:8}}>â ADA COMPLIANT â PS Blue #005BA6 â 4.8:1</div>
  :<div style={{padding:'8px 12px',background:'#FACBCB',borderRadius:4,fontSize:12,color:'#C00',marginBottom:8}}>â ï¸ LEGACY â Orange #005BA6 â 2.9:1 â DO NOT USE IN PRODUCTION</div>;
const OPTS=[{label:'Option A',value:'a'},{label:'Option B',value:'b'},{label:'Option C (disabled)',value:'c',disabled:true}];
export const Future_Group:Story={name:'â Future Â· Radio Group (PS Blue)',render:()=><div><B s="future"/></* RadioGroup not exported */ colorScheme="future" value="b" options={OPTS}/></div>};
export const Current_Group:Story={name:'â ï¸ Current Â· Radio Group (Legacy Orange)',render:()=><div><B s="current"/></* RadioGroup not exported */ colorScheme="future" value="b" options={OPTS}/></div>};
export const SideBySide:Story={name:'ð Side-by-Side: Current vs Future',render:()=>(
  <div style={{display:'flex',gap:40,fontFamily:"'Source Sans Pro',sans-serif"}}>
    <div><div style={{fontSize:11,fontWeight:700,color:'#C00',marginBottom:8}}>â ï¸ CURRENT â Orange #005BA6 Â· 2.9:1</div></* RadioGroup not exported */ colorScheme="future" value="b" options={OPTS}/></div>
    <div style={{width:1,background:'#DCDCDC'}}/>
    <div><div style={{fontSize:11,fontWeight:700,color:'#0E7C55',marginBottom:8}}>â FUTURE â PS Blue #005BA6 Â· 4.8:1</div></* RadioGroup not exported */ colorScheme="future" value="b" options={OPTS}/></div>
  </div>)};
