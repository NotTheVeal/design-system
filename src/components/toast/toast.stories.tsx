import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Toast } from './toast';
import type { ToastMessage } from './toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof Toast>;

const STATIC: ToastMessage[] = [
  {id:'1',type:'success',title:'Part Added to Cart',message:'GE Healthcare Probe added.',duration:0},
  {id:'2',type:'error',title:'Order Failed',message:'Unable to process. Please retry.',duration:0},
  {id:'3',type:'warning',title:'Low Stock Alert',message:'Only 2 units left for SKU CT-7821.',duration:0},
  {id:'4',type:'info',title:'Quote Ready',message:'Quote #Q-2847 is available.',duration:0},
];

const TOP_POSITIONS = [20, 90, 160, 230];

export const AllTypes: Story = {
  render: () => (
    <div style={{position:'relative',height:310,maxWidth:420}}>
      {STATIC.map((t, i) => (
        <div key={t.id} style={{position:'absolute',top:TOP_POSITIONS[i],right:0,left:0}}>
          <Toast toasts={[t]} position="top-right" onDismiss={()=>{}}/>
        </div>
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [toasts,setToasts] = useState<ToastMessage[]>([]);
    const add = (type:ToastMessage['type'],title:string,message:string) => { const id=Date.now().toString(); setToasts(p=>[...p,{id,type,title,message,duration:4000}]); };
    const dismiss = (id:string) => setToasts(p=>p.filter(t=>t.id!==id));
    return (
      <div style={{fontFamily:'Source Sans Pro,sans-serif',display:'flex',flexDirection:'column',gap:16,minHeight:200}}>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <button onClick={()=>add('success','Order Submitted','PO #12847 processing')} style={{padding:'8px 16px',background:'#17AB78',color:'white',border:'none',borderRadius:4,cursor:'pointer',fontFamily:'inherit',fontSize:13,fontWeight:600}}>Success</button>
          <button onClick={()=>add('error','Payment Failed','Card was declined')} style={{padding:'8px 16px',background:'#D32F2F',color:'white',border:'none',borderRadius:4,cursor:'pointer',fontFamily:'inherit',fontSize:13,fontWeight:600}}>Error</button>
          <button onClick={()=>add('warning','Stock Warning','Only 3 units left')} style={{padding:'8px 16px',background:'#E3A92D',color:'white',border:'none',borderRadius:4,cursor:'pointer',fontFamily:'inherit',fontSize:13,fontWeight:600}}>Warning</button>
          <button onClick={()=>add('info','System Update','Maintenance at 2am')} style={{padding:'8px 16px',background:'#005BA6',color:'white',border:'none',borderRadius:4,cursor:'pointer',fontFamily:'inherit',fontSize:13,fontWeight:600}}>Info</button>
        </div>
        <Toast toasts={toasts} position="bottom-right" onDismiss={dismiss}/>
      </div>
    );
  },
};
