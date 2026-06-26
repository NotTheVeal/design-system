import type {Meta,StoryObj} from '@storybook/react';
import React,{useState} from 'react';
import {Popover} from './popover';
const meta:Meta<typeof Popover>={title:'Components/Popover',component:Popover,parameters:{layout:'centered'}};
export default meta;
type Story=StoryObj<typeof Popover>;
export const Default:Story={render:()=>{
  const [open,setOpen]=useState(false);
  return(<div style={{position:'relative',display:'inline-block'}}>
    <button onClick={()=>setOpen(p=>!p)} style={{padding:'8px 16px',background:'#005BA6',color:'white',border:'none',borderRadius:4,cursor:'pointer',fontFamily:'Source Sans Pro,sans-serif',fontSize:13,fontWeight:600}}>
      More Info
    </button>
    <Popover open={open} onClose={()=>setOpen(false)} title="Part Information">
      <div style={{fontFamily:'Source Sans Pro,sans-serif',fontSize:14}}>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          <div style={{display:'flex',gap:8}}><span style={{color:'#777',minWidth:80}}>SKU:</span><span style={{fontWeight:600}}>4542-0012</span></div>
          <div style={{display:'flex',gap:8}}><span style={{color:'#777',minWidth:80}}>In Stock:</span><span style={{color:'#0E7C55',fontWeight:600}}>Yes (47 units)</span></div>
          <div style={{display:'flex',gap:8}}><span style={{color:'#777',minWidth:80}}>Lead Time:</span><span style={{fontWeight:600}}>2-5 days</span></div>
        </div>
      </div>
    </Popover>
  </div>);
}};
export const WithButton:Story={render:()=>{
  const [open,setOpen]=useState(false);
  return(<div style={{position:'relative',display:'inline-block'}}>
    <button onClick={()=>setOpen(p=>!p)} style={{padding:'8px 16px',border:'1px solid #DCDCDC',background:'white',borderRadius:4,cursor:'pointer',fontFamily:'Source Sans Pro,sans-serif',fontSize:13}}>
      ⋯ Actions
    </button>
    <Popover open={open} onClose={()=>setOpen(false)}>
      <div style={{display:'flex',flexDirection:'column',gap:2}}>
        {['View Details','Add to Cart','Compare','Add to Watchlist'].map(a=><button key={a} onClick={()=>setOpen(false)} style={{padding:'8px 14px',textAlign:'left',border:'none',background:'none',cursor:'pointer',fontFamily:'Source Sans Pro,sans-serif',fontSize:13,color:'#4A4A4A',borderRadius:2}} onMouseEnter={e=>((e.currentTarget as HTMLElement).style.background='#EFF9FE')} onMouseLeave={e=>((e.currentTarget as HTMLElement).style.background='none')}>{a}</button>)}
      </div>
    </Popover>
  </div>);
}};
