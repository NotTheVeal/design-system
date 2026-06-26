import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Toast, useToast } from './toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: { layout: 'padded' },
  argTypes: { position: { control: 'select', options: ['top-right','top-left','bottom-right','bottom-left'] } },
};
export default meta;
type Story = StoryObj<typeof Toast>;

export const AllTypes: Story = {
  render: () => (
    <div style={{ display:'flex', flexDirection:'column', gap:8, fontFamily:'Source Sans Pro, sans-serif' }}>
      {([
        {id:'1',type:'success' as const,title:'Part Added to Cart',message:'GE Healthcare Probe (×2) added successfully.'},
        {id:'2',type:'error' as const,title:'Order Failed',message:'Unable to process your order. Please try again.'},
        {id:'3',type:'warning' as const,title:'Low Stock Alert',message:'Only 2 units remaining for SKU CT-7821.'},
        {id:'4',type:'info' as const,title:'New Quote Available',message:'Quote #Q-2847 is ready to review.'},
      ]).map(t => (
        <div key={t.id} style={{position:'relative',height:80}}>
          <Toast toasts={[{...t,duration:0}]} position="top-right" onDismiss={()=>{}} />
        </div>
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const { toasts, dismiss, success, error, warning, info } = useToast();
    return (
      <div style={{ fontFamily:'Source Sans Pro, sans-serif', display:'flex', flexDirection:'column', gap:12 }}>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          <button onClick={() => success('Order Submitted','PO #12847 is being processed')} style={{ padding:'8px 16px', background:'#17AB78', color:'white', border:'none', borderRadius:4, cursor:'pointer', fontFamily:'inherit', fontSize:13, fontWeight:600 }}>✓ Success</button>
          <button onClick={() => error('Payment Failed','Card was declined')} style={{ padding:'8px 16px', background:'#D32F2F', color:'white', border:'none', borderRadius:4, cursor:'pointer', fontFamily:'inherit', fontSize:13, fontWeight:600 }}>✗ Error</button>
          <button onClick={() => warning('Stock Warning','Item has only 3 units left')} style={{ padding:'8px 16px', background:'#E3A92D', color:'white', border:'none', borderRadius:4, cursor:'pointer', fontFamily:'inherit', fontSize:13, fontWeight:600 }}>⚠ Warning</button>
          <button onClick={() => info('System Update','Maintenance at 2am EST')} style={{ padding:'8px 16px', background:'#005BA6', color:'white', border:'none', borderRadius:4, cursor:'pointer', fontFamily:'inherit', fontSize:13, fontWeight:600 }}>ℹ Info</button>
        </div>
        <Toast toasts={toasts} position="top-right" onDismiss={dismiss} />
      </div>
    );
  },
};
