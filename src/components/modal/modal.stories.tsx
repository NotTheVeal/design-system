import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Modal } from './modal';

const font = "'Source Sans Pro', sans-serif";

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof Modal>;

const PrimaryBtn = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
  <button onClick={onClick} style={{ height:52, padding:'0 32px', background:'#005BA6', border:'none', borderRadius:4, color:'#fff', fontSize:14, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.5px', cursor:'pointer', fontFamily:font }}>
    {children}
  </button>
);
const SecBtn = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
  <button onClick={onClick} style={{ height:50, padding:'0 32px', background:'#FFFFFF', border:'2px solid #005BA6', borderRadius:4, color:'#005BA6', fontSize:14, fontWeight:600, textTransform:'uppercase', cursor:'pointer', fontFamily:font }}>
    {children}
  </button>
);

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding:24 }}>
        <PrimaryBtn onClick={() => setOpen(true)}>OPEN MODAL</PrimaryBtn>
        <Modal isOpen={open} onClose={() => setOpen(false)} title="Confirm Order" subtitle="PO #PO-12847 — GE Healthcare"
          footer={<><SecBtn onClick={() => setOpen(false)}>CANCEL</SecBtn><PrimaryBtn onClick={() => setOpen(false)}>CONFIRM ORDER</PrimaryBtn></>}
        >
          <p style={{ fontFamily:font, fontSize:14, color:'#4A4A4A', lineHeight:1.6 }}>
            Are you sure you want to submit PO #PO-12847 for $1,249.00? This will be sent directly to GE Healthcare for fulfillment.
          </p>
        </Modal>
      </div>
    );
  },
};

export const InformationalModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding:24 }}>
        <SecBtn onClick={() => setOpen(true)}>VIEW PART DETAILS</SecBtn>
        <Modal isOpen={open} onClose={() => setOpen(false)} title="Part Details"
          footer={<PrimaryBtn onClick={() => setOpen(false)}>CLOSE</PrimaryBtn>}
        >
          <div style={{ fontFamily:font, fontSize:14, color:'#4A4A4A', display:'flex', flexDirection:'column', gap:12 }}>
            <div style={{ display:'flex', gap:24 }}><span style={{ color:'#777777', minWidth:120 }}>Part Number</span><span>OEM-4432-B</span></div>
            <div style={{ display:'flex', gap:24 }}><span style={{ color:'#777777', minWidth:120 }}>Manufacturer</span><span>Philips Healthcare</span></div>
            <div style={{ display:'flex', gap:24 }}><span style={{ color:'#777777', minWidth:120 }}>Unit Cost</span><span style={{ fontWeight:700 }}>$1,248.00</span></div>
            <div style={{ display:'flex', gap:24 }}><span style={{ color:'#777777', minWidth:120 }}>In Stock</span><span>142 units</span></div>
            <div style={{ display:'flex', gap:24 }}><span style={{ color:'#777777', minWidth:120 }}>Lead Time</span><span>2–3 business days</span></div>
          </div>
        </Modal>
      </div>
    );
  },
};
