import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Drawer from './drawer';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

function DefaultStory() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: 24 }}>
      <button
        onClick={() => setOpen(true)}
        style={{ padding: '10px 20px', background: '#005BA6', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 14, fontFamily: "'Source Sans Pro', sans-serif" }}
      >
        Open Equipment Details
      </button>
      <Drawer isOpen={open} onClose={() => setOpen(false)} title="Equipment Details">
        <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 14, color: '#4A4A4A' }}>
          <p style={{ margin: '0 0 16px' }}><strong>Item:</strong> Philips MRI Ingenia 3.0T</p>
          <p style={{ margin: '0 0 16px' }}><strong>Serial:</strong> SN-2024-MRI-0042</p>
          <p style={{ margin: '0 0 16px' }}><strong>Status:</strong> Active</p>
          <p style={{ margin: '0 0 16px' }}><strong>Last Service:</strong> March 15, 2025</p>
          <p style={{ margin: '0 0 16px' }}><strong>Location:</strong> Radiology — Room 4B</p>
          <p style={{ margin: '0 0 16px' }}><strong>Contract:</strong> Full Service Agreement</p>
        </div>
      </Drawer>
    </div>
  );
}

function WithFooterStory() {
  const [open, setOpen] = useState(false);
  const btnStyle = (primary: boolean): React.CSSProperties => ({
    padding: '8px 16px',
    border: primary ? 'none' : '1px solid #DCDCDC',
    borderRadius: 4,
    background: primary ? '#005BA6' : '#fff',
    color: primary ? '#fff' : '#4A4A4A',
    cursor: 'pointer',
    fontSize: 14,
    fontFamily: "'Source Sans Pro', sans-serif",
  });
  return (
    <div style={{ padding: 24 }}>
      <button
        onClick={() => setOpen(true)}
        style={{ padding: '10px 20px', background: '#005BA6', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 14, fontFamily: "'Source Sans Pro', sans-serif" }}
      >
        Create Purchase Order
      </button>
      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        title="New Purchase Order"
        footer={
          <>
            <button onClick={() => setOpen(false)} style={btnStyle(false)}>Cancel</button>
            <button onClick={() => setOpen(false)} style={btnStyle(true)}>Submit Order</button>
          </>
        }
      >
        <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 14, color: '#4A4A4A' }}>
          <label htmlFor="po-supplier" style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Supplier</label>
          <select id="po-supplier" style={{ width: '100%', padding: '8px 12px', border: '1px solid #DCDCDC', borderRadius: 4, marginBottom: 16, fontSize: 14 }}>
            <option>GE Healthcare</option>
            <option>Philips Healthcare</option>
            <option>Siemens Healthineers</option>
          </select>
          <label htmlFor="po-part-number" style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Part Number</label>
          <input
            id="po-part-number"
            type="text"
            placeholder="e.g. 5183754-2"
            style={{ width: '100%', padding: '8px 12px', border: '1px solid #DCDCDC', borderRadius: 4, fontSize: 14, boxSizing: 'border-box' }}
          />
        </div>
      </Drawer>
    </div>
  );
}

function LeftPositionStory() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: 24 }}>
      <button
        onClick={() => setOpen(true)}
        style={{ padding: '10px 20px', background: '#005BA6', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 14, fontFamily: "'Source Sans Pro', sans-serif" }}
      >
        Open Navigation Menu
      </button>
      <Drawer isOpen={open} onClose={() => setOpen(false)} title="Navigation" position="left" width="280px">
        <nav style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
          {['Dashboard', 'Orders', 'Equipment', 'Contracts', 'Suppliers', 'Reports'].map(item => (
            <div key={item} style={{ padding: '12px 0', borderBottom: '1px solid #F1F1F1', fontSize: 14, color: '#4A4A4A', cursor: 'pointer' }}>
              {item}
            </div>
          ))}
        </nav>
      </Drawer>
    </div>
  );
}

function WideDrawerStory() {
  const [open, setOpen] = useState(false);
  const rows = [
    { po: 'PO-2025-0841', date: 'Jun 3, 2025', amount: '$4,200', status: 'Delivered' },
    { po: 'PO-2025-0790', date: 'May 22, 2025', amount: '$890', status: 'Delivered' },
    { po: 'PO-2025-0755', date: 'May 10, 2025', amount: '$12,400', status: 'In Transit' },
    { po: 'PO-2025-0722', date: 'Apr 28, 2025', amount: '$3,100', status: 'Delivered' },
  ];
  return (
    <div style={{ padding: 24 }}>
      <button
        onClick={() => setOpen(true)}
        style={{ padding: '10px 20px', background: '#005BA6', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 14, fontFamily: "'Source Sans Pro', sans-serif" }}
      >
        View Order History
      </button>
      <Drawer isOpen={open} onClose={() => setOpen(false)} title="Order History — GE Healthcare" width="640px">
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, fontFamily: "'Source Sans Pro', sans-serif" }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #DCDCDC' }}>
              {['PO #', 'Date', 'Amount', 'Status'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: '#777' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.po} style={{ borderBottom: '1px solid #F1F1F1' }}>
                <td style={{ padding: '10px 12px', color: '#005BA6' }}>{row.po}</td>
                <td style={{ padding: '10px 12px', color: '#4A4A4A' }}>{row.date}</td>
                <td style={{ padding: '10px 12px', color: '#4A4A4A' }}>{row.amount}</td>
                <td style={{ padding: '10px 12px', color: row.status === 'In Transit' ? '#E3A92D' : '#17AB78' }}>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Drawer>
    </div>
  );
}

function OpenByDefaultStory() {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ padding: 24, minHeight: 300 }}>
      <button
        onClick={() => setOpen(true)}
        style={{ padding: '10px 20px', background: '#005BA6', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 14, fontFamily: "'Source Sans Pro', sans-serif" }}
      >
        Reopen Drawer
      </button>
      <Drawer isOpen={open} onClose={() => setOpen(false)} title="Contract Summary">
        <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 14, color: '#4A4A4A' }}>
          <p style={{ margin: '0 0 12px' }}><strong>Contract #:</strong> CON-2025-0142</p>
          <p style={{ margin: '0 0 12px' }}><strong>Vendor:</strong> Siemens Healthineers</p>
          <p style={{ margin: '0 0 12px' }}><strong>Type:</strong> Comprehensive Service Agreement</p>
          <p style={{ margin: '0 0 12px' }}><strong>Effective:</strong> Jan 1, 2025 – Dec 31, 2025</p>
          <p style={{ margin: '0 0 12px' }}><strong>Value:</strong> $186,000</p>
          <p style={{ margin: '0 0 12px' }}><strong>Status:</strong> Active</p>
        </div>
      </Drawer>
    </div>
  );
}

export const Default: Story = { render: () => <DefaultStory /> };
export const WithFooter: Story = { render: () => <WithFooterStory /> };
export const LeftPosition: Story = { render: () => <LeftPositionStory /> };
export const WideDrawer: Story = { render: () => <WideDrawerStory /> };
export const OpenByDefault: Story = { render: () => <OpenByDefaultStory /> };
