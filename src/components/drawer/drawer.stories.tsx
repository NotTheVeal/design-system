import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Drawer } from './drawer';

const font = "'Source Sans Pro', sans-serif";

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding:24, fontFamily:font }}>
        <button onClick={() => setOpen(true)} style={{ padding:'12px 24px', background:'#005BA6', color:'#fff', border:'none', borderRadius:4, cursor:'pointer', fontSize:14, fontWeight:600, textTransform:'uppercase', fontFamily:font }}>
          OPEN DRAWER
        </button>
        <Drawer isOpen={open} onClose={() => setOpen(false)} title="Create Bundle"
          footer={
            <div style={{ display:'flex', gap:12, justifyContent:'flex-end' }}>
              <button onClick={() => setOpen(false)} style={{ height:32, padding:'0 16px', background:'#FFF', border:'1px solid #DCDCDC', borderRadius:4, cursor:'pointer', fontSize:13, fontWeight:600, fontFamily:font }}>Cancel</button>
              <button onClick={() => setOpen(false)} style={{ height:52, padding:'0 24px', background:'#005BA6', border:'none', borderRadius:4, cursor:'pointer', color:'#fff', fontSize:14, fontWeight:600, textTransform:'uppercase', fontFamily:font }}>CREATE BUNDLE</button>
            </div>
          }
        >
          <div style={{ display:'flex', flexDirection:'column', gap:16, fontFamily:font }}>
            <div><label style={{ fontSize:12, color:'#777777', display:'block', marginBottom:4 }}>List Name</label><div style={{ fontSize:16, color:'#4A4A4A' }}>Bundle A</div></div>
            <div><label style={{ fontSize:12, color:'#777777', display:'block', marginBottom:4 }}>Group</label><div style={{ fontSize:16, color:'#4A4A4A' }}>General</div></div>
            <div><label style={{ fontSize:12, color:'#777777', display:'block', marginBottom:4 }}>Notes</label><div style={{ fontSize:16, color:'#949494' }}>Optional notes...</div></div>
          </div>
        </Drawer>
      </div>
    );
  },
};

export const Wide: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding:24 }}>
        <button onClick={() => setOpen(true)} style={{ padding:'12px 24px', background:'#005BA6', color:'#fff', border:'none', borderRadius:4, cursor:'pointer', fontSize:14, fontWeight:600, fontFamily:font }}>Open Wide Drawer</button>
        <Drawer isOpen={open} onClose={() => setOpen(false)} title="Create Assessment" width="wide"
          footer={<button onClick={() => setOpen(false)} style={{ height:52, padding:'0 24px', background:'#005BA6', border:'none', borderRadius:4, cursor:'pointer', color:'#fff', fontSize:14, fontWeight:600, textTransform:'uppercase', fontFamily:font }}>SAVE</button>}
        >
          <p style={{ color:'#4A4A4A', fontFamily:font }}>Wide drawer (600px) for complex forms and multi-step flows.</p>
        </Drawer>
      </div>
    );
  },
};

export const Narrow: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding:24 }}>
        <button onClick={() => setOpen(true)} style={{ padding:'12px 24px', background:'#FFFFFF', border:'2px solid #005BA6', color:'#005BA6', borderRadius:4, cursor:'pointer', fontSize:14, fontWeight:600, fontFamily:font }}>Open Narrow Drawer</button>
        <Drawer isOpen={open} onClose={() => setOpen(false)} title="Confirm Action" width="narrow"
          footer={
            <div style={{ display:'flex', gap:10, justifyContent:'flex-end' }}>
              <button onClick={() => setOpen(false)} style={{ height:32, padding:'0 16px', background:'#FFF', border:'1px solid #DCDCDC', borderRadius:4, cursor:'pointer', fontFamily:font, fontSize:13, fontWeight:600 }}>Cancel</button>
              <button onClick={() => setOpen(false)} style={{ height:32, padding:'0 16px', background:'#D32F2F', border:'none', borderRadius:4, cursor:'pointer', color:'#fff', fontFamily:font, fontSize:13, fontWeight:600 }}>Delete</button>
            </div>
          }
        >
          <p style={{ color:'#4A4A4A', fontFamily:font }}>This action cannot be undone. All associated data will be permanently removed.</p>
        </Drawer>
      </div>
    );
  },
};
