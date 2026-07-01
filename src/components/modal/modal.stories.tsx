import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Modal } from './modal';

const font = "'Source Sans Pro', 'Source Sans 3', sans-serif";

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    showClose: { control: 'boolean' },
    title: { control: 'text' },
  },
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

const Footer = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display:'flex', gap:12, justifyContent:'flex-end', paddingTop:16, borderTop:'1px solid #DCDCDC', marginTop:16 }}>
    {children}
  </div>
);

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding:24 }}>
        <PrimaryBtn onClick={() => setOpen(true)}>OPEN MODAL</PrimaryBtn>
        <Modal isOpen={open} onClose={() => setOpen(false)} title="Confirm Order">
          <div style={{ fontFamily:font }}>
            <p style={{ margin:'0 0 12px', fontSize:13, color:'#777777' }}>PO #PO-12847 — GE Healthcare</p>
            <p style={{ margin:'0 0 0', fontSize:14, color:'#4A4A4A', lineHeight:1.6 }}>
              Are you sure you want to submit PO #PO-12847 for $1,249.00? This will be sent directly to GE Healthcare for fulfillment.
            </p>
            <Footer>
              <SecBtn onClick={() => setOpen(false)}>CANCEL</SecBtn>
              <PrimaryBtn onClick={() => setOpen(false)}>CONFIRM ORDER</PrimaryBtn>
            </Footer>
          </div>
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
        <Modal isOpen={open} onClose={() => setOpen(false)} title="Part Details">
          <div style={{ fontFamily:font, fontSize:14, color:'#4A4A4A', display:'flex', flexDirection:'column', gap:12 }}>
            <div style={{ display:'flex', gap:24 }}><span style={{ color:'#777777', minWidth:120 }}>Part Number</span><span>OEM-4432-B</span></div>
            <div style={{ display:'flex', gap:24 }}><span style={{ color:'#777777', minWidth:120 }}>Manufacturer</span><span>Philips Healthcare</span></div>
            <div style={{ display:'flex', gap:24 }}><span style={{ color:'#777777', minWidth:120 }}>Unit Cost</span><span style={{ fontWeight:700 }}>$1,248.00</span></div>
            <div style={{ display:'flex', gap:24 }}><span style={{ color:'#777777', minWidth:120 }}>In Stock</span><span>142 units</span></div>
            <div style={{ display:'flex', gap:24 }}><span style={{ color:'#777777', minWidth:120 }}>Lead Time</span><span>2–3 business days</span></div>
            <Footer><PrimaryBtn onClick={() => setOpen(false)}>CLOSE</PrimaryBtn></Footer>
          </div>
        </Modal>
      </div>
    );
  },
};

export const SmallModal: Story = {
  name: 'Small Modal',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding:24 }}>
        <PrimaryBtn onClick={() => setOpen(true)}>OPEN SMALL MODAL</PrimaryBtn>
        <Modal isOpen={open} onClose={() => setOpen(false)} title="Delete Item" size="sm">
          <div style={{ fontFamily:font }}>
            <p style={{ margin:'0 0 0', fontSize:14, color:'#4A4A4A', lineHeight:1.6 }}>
              Are you sure you want to remove this item from your cart? This action cannot be undone.
            </p>
            <Footer>
              <SecBtn onClick={() => setOpen(false)}>CANCEL</SecBtn>
              <button onClick={() => setOpen(false)} style={{ height:52, padding:'0 32px', background:'#E00000', border:'none', borderRadius:4, color:'#fff', fontSize:14, fontWeight:600, textTransform:'uppercase', cursor:'pointer', fontFamily:font }}>DELETE</button>
            </Footer>
          </div>
        </Modal>
      </div>
    );
  },
};

export const LargeModal: Story = {
  name: 'Large Modal',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding:24 }}>
        <PrimaryBtn onClick={() => setOpen(true)}>OPEN LARGE MODAL</PrimaryBtn>
        <Modal isOpen={open} onClose={() => setOpen(false)} title="Supplier Contract — Medline Industries" size="lg">
          <div style={{ fontFamily:font, fontSize:14, color:'#4A4A4A', lineHeight:1.6 }}>
            <p><strong>Contract Period:</strong> Jan 1, 2025 – Dec 31, 2025</p>
            <p><strong>Annual Value:</strong> $2,450,000</p>
            <p><strong>Payment Terms:</strong> Net 30</p>
            <p><strong>Rebate Tier:</strong> 3.5% at $2M spend threshold</p>
            <p style={{ color:'#777', fontSize:13, marginTop:16 }}>
              Contract includes pricing for surgical consumables, OR supplies, and sterilization equipment across all 12 facilities.
            </p>
            <Footer>
              <SecBtn onClick={() => setOpen(false)}>CANCEL</SecBtn>
              <SecBtn onClick={() => setOpen(false)}>SAVE DRAFT</SecBtn>
              <PrimaryBtn onClick={() => setOpen(false)}>SUBMIT FOR APPROVAL</PrimaryBtn>
            </Footer>
          </div>
        </Modal>
      </div>
    );
  },
};

export const NoCloseButton: Story = {
  name: 'No Close Button',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding:24 }}>
        <PrimaryBtn onClick={() => setOpen(true)}>OPEN REQUIRED MODAL</PrimaryBtn>
        <Modal isOpen={open} onClose={() => setOpen(false)} title="Required Action" showClose={false}>
          <div style={{ fontFamily:font }}>
            <p style={{ margin:'0 0 0', fontSize:14, color:'#4A4A4A', lineHeight:1.5 }}>
              Your account requires immediate attention. Please review and acknowledge the updated procurement policy before continuing.
            </p>
            <Footer><PrimaryBtn onClick={() => setOpen(false)}>I UNDERSTAND</PrimaryBtn></Footer>
          </div>
        </Modal>
      </div>
    );
  },
};
