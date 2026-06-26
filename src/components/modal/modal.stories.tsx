import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Modal } from './modal';
const meta: Meta<typeof Modal> = { title:'Components/Modal', component:Modal, parameters:{layout:'padded'} };
export default meta;
type Story = StoryObj<typeof Modal>;
const font = "'Source Sans Pro', sans-serif";

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (<div style={{fontFamily:font}}>
      <button onClick={()=>setOpen(true)} style={{padding:'10px 20px',background:'#005BA6',color:'white',border:'none',borderRadius:4,cursor:'pointer',fontSize:14,fontWeight:600,fontFamily:font}}>Open Modal</button>
      <Modal open={open} onClose={()=>setOpen(false)} title="Confirm Order" size="sm">
        <p style={{margin:0,fontSize:14,color:'#4A4A4A',lineHeight:'22px'}}>Are you sure you want to submit PO #12847 for $1,249.00? This will be sent directly to GE Healthcare for fulfillment.</p>
        <div style={{display:'flex',gap:8,marginTop:20,justifyContent:'flex-end'}}>
          <button onClick={()=>setOpen(false)} style={{padding:'8px 20px',border:'2px solid #005BA6',background:'white',color:'#005BA6',borderRadius:4,cursor:'pointer',fontFamily:font,fontSize:13,fontWeight:600}}>Cancel</button>
          <button onClick={()=>setOpen(false)} style={{padding:'8px 20px',border:'none',background:'#005BA6',color:'white',borderRadius:4,cursor:'pointer',fontFamily:font,fontSize:13,fontWeight:600}}>Confirm Order</button>
        </div>
      </Modal>
    </div>);
  },
};

export const Medium: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (<div style={{fontFamily:font}}>
      <button onClick={()=>setOpen(true)} style={{padding:'10px 20px',background:'#005BA6',color:'white',border:'none',borderRadius:4,cursor:'pointer',fontSize:14,fontWeight:600,fontFamily:font}}>Open Medium Modal</button>
      <Modal open={open} onClose={()=>setOpen(false)} title="Part Details — GE Healthcare Probe" size="md">
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            {[['SKU','4542-0012'],['Manufacturer','GE Healthcare'],['Category','Ultrasound Probes'],['Lead Time','2-5 days'],['Stock','In Stock (47 units)'],['Price','$1,249.00']].map(([k,v])=>(<div key={k} style={{display:'flex',flexDirection:'column',gap:4}}><span style={{fontSize:11,fontWeight:600,color:'#777',textTransform:'uppercase',letterSpacing:'0.5px'}}>{k}</span><span style={{fontSize:14,color:'#002F48',fontWeight:600}}>{v}</span></div>))}
          </div>
          <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
            <button onClick={()=>setOpen(false)} style={{padding:'10px 20px',border:'2px solid #005BA6',background:'white',color:'#005BA6',borderRadius:4,cursor:'pointer',fontFamily:font,fontSize:14,fontWeight:600}}>Close</button>
            <button onClick={()=>setOpen(false)} style={{padding:'10px 20px',border:'none',background:'#005BA6',color:'white',borderRadius:4,cursor:'pointer',fontFamily:font,fontSize:14,fontWeight:600}}>Add to Cart</button>
          </div>
        </div>
      </Modal>
    </div>);
  },
};

export const Large: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (<div style={{fontFamily:font}}>
      <button onClick={()=>setOpen(true)} style={{padding:'10px 20px',background:'#005BA6',color:'white',border:'none',borderRadius:4,cursor:'pointer',fontSize:14,fontWeight:600,fontFamily:font}}>Open Large Modal</button>
      <Modal open={open} onClose={()=>setOpen(false)} title="Vendor Comparison" size="lg">
        <p style={{margin:'0 0 16px',fontSize:14,color:'#4A4A4A'}}>Comparing 3 vendors for CT Scanner Filters (SKU CT-7821)</p>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
          <thead><tr style={{background:'#005BA6',color:'white'}}>{['Vendor','Price','Lead Time','Rating'].map(h=><th key={h} style={{padding:'8px 12px',textAlign:'left',fontWeight:600}}>{h}</th>)}</tr></thead>
          <tbody>{[['Siemens Direct','$89.50','3-5 days','★★★★★'],['MedSource','$84.99','5-7 days','★★★★☆'],['PartsFast','$91.00','1-2 days','★★★☆☆']].map(([v,p,l,r],i)=><tr key={String(v)} style={{background:i%2?'#FAFAFA':'white'}}><td style={{padding:'10px 12px',fontWeight:600,color:'#002F48'}}>{v}</td><td style={{padding:'10px 12px',color:'#005BA6',fontWeight:600}}>{p}</td><td style={{padding:'10px 12px'}}>{l}</td><td style={{padding:'10px 12px'}}>{r}</td></tr>)}</tbody>
        </table>
        <div style={{display:'flex',justifyContent:'flex-end',marginTop:20}}>
          <button onClick={()=>setOpen(false)} style={{padding:'10px 24px',background:'#005BA6',color:'white',border:'none',borderRadius:4,cursor:'pointer',fontFamily:font,fontSize:14,fontWeight:600}}>Select Vendor</button>
        </div>
      </Modal>
    </div>);
  },
};
