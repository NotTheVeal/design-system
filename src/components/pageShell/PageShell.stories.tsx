import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import PageShell from './pageShell';

const meta: Meta<typeof PageShell> = {
  title: 'Components/PageShell',
  component: PageShell,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof PageShell>;

const ff = "'Source Sans Pro', sans-serif";

export const Default: Story = {
  render: () => (
    <PageShell>
      <h1 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 300, color: '#002F48', fontFamily: ff }}>Dashboard</h1>
      <p style={{ margin: '0 0 32px', color: '#777', fontSize: 14, fontFamily: ff }}>Welcome back, Rachael. Here's your overview for today.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { label: 'Open Orders', value: '12', color: '#005BA6' },
          { label: 'Pending Approval', value: '4', color: '#E3A92D' },
          { label: 'Active Contracts', value: '28', color: '#17AB78' },
          { label: 'Low Stock Alerts', value: '3', color: '#FF0000' },
        ].map(card => (
          <div key={card.label} style={{ background: '#fff', border: '1px solid #DCDCDC', borderRadius: 4, padding: 20, boxShadow: '0 1px 4px rgba(0,47,72,0.08)' }}>
            <div style={{ fontSize: 13, color: '#777', fontFamily: ff, marginBottom: 8 }}>{card.label}</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: card.color, fontFamily: ff }}>{card.value}</div>
          </div>
        ))}
      </div>
    </PageShell>
  ),
};

export const OrdersPage: Story = {
  render: () => (
    <PageShell>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600, color: '#002F48', fontFamily: ff }}>Purchase Orders</h1>
        <button style={{ padding: '10px 20px', background: '#005BA6', color: '#fff', border: 'none', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: ff }}>
          + New Order
        </button>
      </div>
      <div style={{ background: '#fff', border: '1px solid #DCDCDC', borderRadius: 4, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, fontFamily: ff }}>
          <thead style={{ background: '#F1F1F1' }}>
            <tr>
              {['PO Number', 'Supplier', 'Date', 'Amount', 'Status'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#4A4A4A', borderBottom: '1px solid #DCDCDC' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['PO-2025-0841', 'GE Healthcare', 'Jun 3, 2025', '$4,200', 'Delivered'],
              ['PO-2025-0790', 'Philips Healthcare', 'May 22, 2025', '$890', 'Delivered'],
              ['PO-2025-0755', 'Siemens Healthineers', 'May 10, 2025', '$12,400', 'In Transit'],
            ].map(row => (
              <tr key={row[0]} style={{ borderBottom: '1px solid #F1F1F1' }}>
                {row.map((cell, i) => (
                  <td key={i} style={{ padding: '12px 16px', color: i === 0 ? '#005BA6' : '#4A4A4A' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageShell>
  ),
};

export const BlankPage: Story = {
  render: () => (
    <PageShell>
      <p style={{ fontFamily: ff, color: '#777', fontSize: 14 }}>This page is empty — content will render inside the PageShell wrapper.</p>
    </PageShell>
  ),
};
