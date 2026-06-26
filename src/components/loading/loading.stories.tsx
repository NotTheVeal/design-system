import type {Meta,StoryObj} from '@storybook/react';
import React from 'react';
import {Loading} from './loading';
const meta:Meta<typeof Loading>={title:'Components/Loading',component:Loading,parameters:{layout:'centered'},argTypes:{size:{control:'select',options:['sm','md','lg','xl']}}};
export default meta;
type Story=StoryObj<typeof Loading>;
export const Default:Story={args:{size:'md'}};
export const Small:Story={args:{size:'sm'}};
export const Large:Story={args:{size:'lg'}};
export const WithLabel:Story={args:{size:'md',label:'Loading parts catalog...'}};
export const AllSizes:Story={render:()=>(<div style={{display:'flex',alignItems:'center',gap:24,fontFamily:'Source Sans Pro, sans-serif'}}>
  {(['sm','md','lg','xl'] as const).map(s=><div key={s} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8}}><Loading size={s}/><span style={{fontSize:12,color:'#777'}}>{s}</span></div>)}
</div>)};
export const FullPageOverlay:Story={render:()=>(<div style={{position:'relative',width:400,height:200,border:'1px solid #DCDCDC',borderRadius:4,overflow:'hidden'}}>
  <div style={{padding:16,fontFamily:'Source Sans Pro, sans-serif'}}><h3 style={{margin:0,color:'#002F48'}}>Parts Search Results</h3><p style={{margin:'8px 0 0',color:'#777',fontSize:14}}>Searching catalog...</p></div>
  <div style={{position:'absolute',inset:0,background:'rgba(255,255,255,0.85)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:12}}>
    <Loading size="lg"/><span style={{fontSize:14,color:'#005BA6',fontFamily:'Source Sans Pro, sans-serif',fontWeight:600}}>Searching 2M+ parts...</span>
  </div>
</div>)};
