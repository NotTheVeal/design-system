import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Alert } from './alert';
const meta: Meta<typeof Alert> = {
  title:'Components/Alert', component:Alert,
  parameters:{ layout:'padded' },
  decorators:[(Story)=><div style={{maxWidth:600,width:'100%',margin:'0 auto'}}><Story/></div>],
  argTypes:{ type:{ control:'select', options:['success','error','warning','info'] } },
};
export default meta;
type Story = StoryObj<typeof Alert>;
export const Default: Story = { args:{ type:'info', title:'Scheduled Maintenance', message:'PartsSource will be undergoing maintenance on Sunday, Jun 29 from 2–4am EST.' } };
export const Success: Story = { args:{ type:'success', title:'Order Submitted', message:'PO #PO-12847 has been submitted successfully and is being processed.' } };
export const Error: Story = { args:{ type:'error', title:'Payment Failed', message:'Your payment could not be processed. Please check your billing information.' } };
export const Warning: Story = { args:{ type:'warning', title:'Low Stock Alert', message:'SKU CT-7821 (Catheter Kit) has only 3 units remaining in inventory.' } };
export const Info: Story = { args:{ type:'info', title:'New Catalog Available', message:'New vendor catalog updates are available. Review before your next order.' } };
export const WithClose: Story = {
  render:()=>{ const [o,setO]=React.useState(true); return o?<Alert type="success" title="Changes Saved" message="Your profile changes have been saved." onClose={()=>setO(false)}/>:<button onClick={()=>setO(true)} style={{padding:'8px 16px',fontFamily:"'Source Sans Pro',sans-serif"}}>Show alert</button>; },
};
export const WithAction: Story = { args:{ type:'warning', title:'Quote Expiring', message:'Quote #Q-2847 expires in 48h. Review to keep your pricing.', action:{label:'View Quote',onClick:()=>{}} } };
export const AllTypes: Story = {
  render:()=>(
    <div style={{display:'flex',flexDirection:'column',gap:12}}>
      <Alert type="success" title="Order Confirmed" message="Your order has been placed and is being prepared for shipment."/>
      <Alert type="error" title="Connection Error" message="Unable to connect to the API. Please check your network."/>
      <Alert type="warning" title="Budget Alert" message="You are approaching 90% of your monthly purchasing budget."/>
      <Alert type="info" title="Catalog Update" message="New vendor catalog updates are available for review."/>
    </div>
  ),
};
