import type {Meta,StoryObj} from '@storybook/react';
import React, {useState} from 'react';
import {FilterChip} from './filterChip';
const meta:Meta<typeof FilterChip>={title:'Components/FilterChip',component:FilterChip,parameters:{layout:'padded'},argTypes:{disabled:{control:'boolean'}}};
export default meta;
type Story=StoryObj<typeof FilterChip>;
export const Default:Story={args:{label:'Imaging',onToggle:()=>{}}};
export const Selected:Story={args:{label:'Surgical',selected:true,onToggle:()=>{}}};
export const WithCount:Story={args:{label:'In Stock',count:142,selected:true,onToggle:()=>{}}};
export const WithRemove:Story={args:{label:'GE Healthcare',selected:true,onRemove:()=>{}}};
export const Disabled:Story={args:{label:'Unavailable',disabled:true}};
export const FilterBar:Story={
  render:()=>{
    const cats=['Imaging','Surgical','Monitoring','Infusion','Lab','Respiratory'];
    const [sel,setSel]=useState(['Imaging','Surgical']);
    const [mfr,setMfr]=useState(['GE Healthcare']);
    const toggle=(arr:string[],setArr:(v:string[])=>void,v:string)=>setArr(arr.includes(v)?arr.filter(x=>x!==v):[...arr,v]);
    return(<div style={{display:'flex',flexDirection:'column',gap:12,fontFamily:'Source Sans Pro, sans-serif'}}>
      <div><p style={{margin:'0 0 8px',fontSize:12,color:'#777',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.5px'}}>Category</p>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{cats.map(c=><FilterChip key={c} label={c} selected={sel.includes(c)} onToggle={()=>toggle(sel,setSel,c)} count={sel.includes(c)?Math.floor(Math.random()*200)+10:undefined}/>)}</div>
      </div>
      <div><p style={{margin:'0 0 8px',fontSize:12,color:'#777',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.5px'}}>Manufacturer</p>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{['GE Healthcare','Siemens','Philips','Stryker','Medtronic'].map(m=><FilterChip key={m} label={m} selected={mfr.includes(m)} onToggle={()=>toggle(mfr,setMfr,m)}/>)}</div>
      </div>
      {(sel.length>0||mfr.length>0)&&<div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
        <span style={{fontSize:12,color:'#777'}}>Active filters:</span>
        {[...sel,...mfr].map(f=><FilterChip key={f} label={f} selected onRemove={()=>{setSel(p=>p.filter(x=>x!==f));setMfr(p=>p.filter(x=>x!==f));}}/>)}
        <button onClick={()=>{setSel([]);setMfr([]);}} style={{fontSize:12,color:'#D32F2F',background:'none',border:'none',cursor:'pointer',fontFamily:'inherit'}}>Clear all</button>
      </div>}
    </div>);
  },
};
