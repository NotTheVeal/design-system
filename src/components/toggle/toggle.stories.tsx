import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Toggle } from './toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: { layout: 'padded' },
  argTypes: { size: { control: 'select', options: ['sm','md'] }, disabled: { control: 'boolean' } },
};
export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = { args: { label: 'Email notifications' } };
export const On: Story = { args: { label: 'Auto-approve orders under $500', defaultChecked: true } };
export const WithDescription: Story = { args: { label: 'Real-time inventory sync', description: 'Automatically sync inventory levels every 5 minutes', defaultChecked: true } };
export const Small: Story = { args: { label: 'Compact view', size: 'sm' } };
export const Disabled: Story = { args: { label: 'Locked setting', disabled: true, defaultChecked: true } };

export const SettingsPanel: Story = {
  render: () => {
    const [s, setS] = useState({email:true,sms:false,slack:true,autoApprove:false,sync:true});
    return (
      <div style={{ maxWidth:400, display:'flex', flexDirection:'column', gap:0, border:'1px solid #DCDCDC', borderRadius:4, overflow:'hidden', fontFamily:'Source Sans Pro, sans-serif' }}>
        <div style={{ padding:'12px 16px', background:'#005BA6', color:'white', fontSize:14, fontWeight:600 }}>Notification Settings</div>
        {[
          ['email','Email Notifications','Receive order confirmations and alerts by email'],
          ['sms','SMS Alerts','Get text messages for critical stock alerts'],
          ['slack','Slack Integration','Post updates to your team Slack channel'],
          ['autoApprove','Auto-approve Orders','Automatically approve POs under $500'],
          ['sync','Real-time Sync','Sync inventory every 5 minutes'],
        ].map(([k,l,d],i)=>(
          <div key={k} style={{ padding:'14px 16px', borderTop:i>0?'1px solid #F1F1F1':'none', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div><div style={{fontSize:14,color:'#002F48',fontWeight:600}}>{l}</div><div style={{fontSize:12,color:'#777'}}>{d}</div></div>
            <Toggle checked={s[k as keyof typeof s]} onChange={v=>setS(p=>({...p,[k]:v}))} size="sm"/>
          </div>
        ))}
      </div>
    );
  },
};
