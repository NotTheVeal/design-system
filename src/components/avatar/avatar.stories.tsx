import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Avatar } from './avatar';
const meta: Meta<typeof Avatar> = { title:'Components/Avatar', component:Avatar, parameters:{layout:'padded'}, argTypes:{size:{control:'select',options:['xs','sm','md','lg','xl']},status:{control:'select',options:['online','busy','away','offline']}} };
export default meta;
type Story = StoryObj<typeof Avatar>;
export const Default: Story = { args:{name:'Rachael Veal',size:'md'} };
export const WithStatus: Story = { args:{name:'John Smith',size:'md',status:'online'} };
export const WithImage: Story = { args:{name:'Sarah Connor',src:'https://api.dicebear.com/7.x/initials/svg?seed=SC',size:'lg'} };
export const AllSizes: Story = {
  render: () => (<div style={{display:'flex',alignItems:'center',gap:16,fontFamily:'Source Sans Pro, sans-serif'}}>
    {(['xs','sm','md','lg','xl'] as const).map(s=><Avatar key={s} name="John Smith" size={s} status="online"/>)}
  </div>),
};
export const AllStatuses: Story = {
  render: () => (<div style={{display:'flex',alignItems:'center',gap:16,fontFamily:'Source Sans Pro, sans-serif'}}>
    {([['online','Online'],['busy','Busy'],['away','Away'],['offline','Offline']] as const).map(([s,l])=>(<div key={s} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6}}><Avatar name="Jane Doe" size="lg" status={s}/><span style={{fontSize:12,color:'#777'}}>{l}</span></div>))}
  </div>),
};
export const AvatarGroup: Story = {
  render: () => (<div style={{display:'flex',fontFamily:'Source Sans Pro, sans-serif'}}>
    {['Alice','Bob','Carol','Dave','Eve'].map((n,i)=><div key={n} style={{marginLeft:i?-8:0,zIndex:5-i}}><Avatar name={n} size="md" /></div>)}
    <div style={{marginLeft:-8,zIndex:0,width:36,height:36,borderRadius:'50%',background:'#DCDCDC',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:600,color:'#4A4A4A',border:'2px solid white'}}>+3</div>
  </div>),
};
