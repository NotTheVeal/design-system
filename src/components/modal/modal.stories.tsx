import type{Meta,StoryObj}from'@storybook/react';
import React,{useState}from'react';
import{Modal}from'./modal';
const meta:Meta<typeof Modal>={title:'Components/Modal',component:Modal,tags:['autodocs'],parameters:{layout:'fullscreen',docs:{description:{component:'`current`=Orange#FF9505 CTA ADA-FAIL | `future`=Blue#005BA6 CTA ADA-PASS. Has focus-trap, Escape key, aria-modal.'}}}};
export default meta;type Story=StoryObj<typeof Modal>;
const Demo=({s}:{s:'current'|'future'})=>{const[o,setO]=useState(false);const iF=s==='future';return(<div style={{padding:24}}>
  <div style={{padding:'8px 12px',borderRadius:4,fontSize:12,marginBottom:16,background:iF?'#E2F5EE':'#FACBCB',color:iF?'#0E7C55':'#C00'}}>
    {iF?'✅ ADA COMPLIANT — PS Blue #005BA6 — 4.8:1':'⚠️ LEGACY — Orange #FF9505 — 2.9:1 — DO NOT USE IN PRODUCTION'}</div>
  <button onClick={()=>setO(true)} style={{background:'#005BA6',color:'white',border:'none',borderRadius:4,padding:'10px 20px',fontSize:14,fontWeight:600,cursor:'pointer'}}>Open Modal</button>
  <Modal colorScheme={s} isOpen={o} onClose={()=>setO(false)} title="Your Session Has Timed Out" primaryLabel="Contact Rep" secondaryLabel="Continue to Home Page" onPrimary={()=>setO(false)}/>
</div>);};
export const Future_Modal:Story={name:'✅ Future · Modal (PS Blue CTA)',render:()=><Demo s="future"/>};
export const Future_Static:Story={name:'✅ Future · Open (static)',args:{colorScheme:'future',isOpen:true,title:'Session Timed Out',primaryLabel:'Contact Rep',secondaryLabel:'Go to Home'}};
export const Current_Modal:Story={name:'⚠️ Current · Modal (Legacy Orange CTA)',render:()=><Demo s="current"/>};
export const Current_Static:Story={name:'⚠️ Current · Open (static legacy)',args:{colorScheme:'current',isOpen:true,title:'Session Timed Out',primaryLabel:'Contact Rep',secondaryLabel:'Go to Home'}};
export const SideBySide:Story={name:'🔄 Side-by-Side: Current vs Future',parameters:{layout:'padded'},render:()=>(
  <div style={{display:'flex',gap:32}}>
    <div style={{flex:1}}><div style={{fontSize:11,fontWeight:700,color:'#C00',marginBottom:8}}>⚠️ CURRENT</div><Demo s="current"/></div>
    <div style={{flex:1}}><div style={{fontSize:11,fontWeight:700,color:'#0E7C55',marginBottom:8}}>✅ FUTURE</div><Demo s="future"/></div>
  </div>)};
