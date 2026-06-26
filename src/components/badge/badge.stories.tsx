import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Badge } from './badge';
const meta: Meta<typeof Badge> = { title:'Components/Badge', component:Badge, parameters:{layout:'padded'} };
export default meta;
type Story = StoryObj<typeof Badge>;
export const Default: Story = { args:{label:'New',variant:'status',color:'primary'} };
export const AllVariants: Story = {
  render: () => (
    <div style={{display:'flex',flexDirection:'column',gap:20,fontFamily:'Source Sans Pro, sans-serif'}}>
      <div><p style={{margin:'0 0 8px',fontSize:12,color:'#777',fontWeight:600}}>Status</p>
        <div style={{display:'flex',gap:8}}>{[['New','primary'],['Active','success'],['Pending','warning'],['Rejected','danger']].map(([l,c])=><Badge key={l} label={l} variant="status" color={c as any}/>)}</div>
      </div>
      <div><p style={{margin:'0 0 8px',fontSize:12,color:'#777',fontWeight:600}}>List (Pill)</p>
        <div style={{display:'flex',gap:8}}>{[['OEM','primary'],['Imaging','secondary'],['In Stock','success'],['Low Stock','warning']].map(([l,c])=><Badge key={l} label={l} variant="list" color={c as any}/>)}</div>
      </div>
      <div><p style={{margin:'0 0 8px',fontSize:12,color:'#777',fontWeight:600}}>Assignment</p>
        <div style={{display:'flex',gap:8}}>{[['Q2 Budget','info'],['Priority','danger'],['Review','warning']].map(([l,c])=><Badge key={l} label={l} variant="assignment" color={c as any}/>)}</div>
      </div>
    </div>
  ),
};
