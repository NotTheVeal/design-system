import type {Meta,StoryObj} from '@storybook/react';
import React from 'react';
import {Skeleton} from './skeleton';
const meta:Meta<typeof Skeleton>={title:'Components/Skeleton',component:Skeleton,parameters:{layout:'padded'}};
export default meta;
type Story=StoryObj<typeof Skeleton>;
export const TextLine:Story={args:{width:'100%',height:16}};
export const Circle:Story={args:{width:48,height:48,shape:'circle'}};
export const Rectangle:Story={args:{width:200,height:120}};
export const CardSkeleton:Story={render:()=>(<div style={{display:'flex',flexDirection:'column',gap:12,padding:16,border:'1px solid #DCDCDC',borderRadius:4,maxWidth:320}}>
  <Skeleton width="100%" height={160}/>
  <Skeleton width="70%" height={20}/>
  <Skeleton width="100%" height={14}/>
  <Skeleton width="90%" height={14}/>
  <div style={{display:'flex',justifyContent:'space-between'}}><Skeleton width={80} height={28}/><Skeleton width={100} height={36}/></div>
</div>)};
export const TableSkeleton:Story={render:()=>(<div style={{display:'flex',flexDirection:'column',gap:1}}>
  <div style={{background:'#F1F1F1',padding:'10px 16px'}}><Skeleton width="100%" height={16}/></div>
  {[1,2,3,4,5].map(i=><div key={i} style={{display:'flex',gap:16,padding:'12px 16px',borderBottom:'1px solid #DCDCDC'}}><Skeleton width="30%" height={14}/><Skeleton width="20%" height={14}/><Skeleton width="15%" height={14}/><Skeleton width="15%" height={24}/></div>)}
</div>)};
