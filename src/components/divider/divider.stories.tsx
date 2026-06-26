import type{Meta,StoryObj}from'@storybook/react';
import React from'react';
import{Divider}from'./divider';
const meta:Meta<typeof Divider>={title:'Components/Divider',component:Divider,parameters:{layout:'padded'}};
export default meta;
type Story=StoryObj<typeof Divider>;
export const Horizontal:Story={render:()=><div style={{padding:24,maxWidth:400}}><p style={{margin:'0 0 16px',fontFamily:'Source Sans Pro,sans-serif',color:'#4A4A4A'}}>First section content</p><Divider/><p style={{margin:'16px 0 0',fontFamily:'Source Sans Pro,sans-serif',color:'#4A4A4A'}}>Second section content</p></div>};
export const WithLabel:Story={render:()=><div style={{padding:24,maxWidth:400}}><Divider label="Or continue with"/></div>};
export const Vertical:Story={render:()=><div style={{display:'flex',height:40,alignItems:'center',gap:16,padding:24}}><span style={{fontFamily:'Source Sans Pro,sans-serif',fontSize:13}}>Edit</span><Divider orientation="vertical"/><span style={{fontFamily:'Source Sans Pro,sans-serif',fontSize:13}}>Delete</span><Divider orientation="vertical"/><span style={{fontFamily:'Source Sans Pro,sans-serif',fontSize:13}}>Archive</span></div>};
export const InForm:Story={render:()=>(<div style={{display:'flex',flexDirection:'column',gap:16,maxWidth:400,fontFamily:'Source Sans Pro,sans-serif'}}>
  <div><p style={{margin:'0 0 8px',fontWeight:600,color:'#002F48',fontSize:14}}>Shipping Information</p><Divider/></div>
  <div><p style={{margin:'0 0 8px',fontWeight:600,color:'#002F48',fontSize:14}}>Billing Information</p><Divider/></div>
  <div><p style={{margin:'0 0 8px',fontWeight:600,color:'#002F48',fontSize:14}}>Payment</p><Divider/></div>
</div>)};
