import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Card from './card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card style={{ width: 360 }}>
      <p style={{ margin: 0, fontFamily: 'Source Sans Pro, sans-serif', color: '#4A4A4A' }}>
        Basic card with default padding.
      </p>
    </Card>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Card
        header={
          <div style={{ fontFamily: 'Source Sans Pro, sans-serif', fontWeight: 600, fontSize: 16, color: '#2B2B2B' }}>
            Purchase Order #PO-28471
          </div>
        }
      >
        <div style={{ fontFamily: 'Source Sans Pro, sans-serif', color: '#4A4A4A', fontSize: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div><strong>Supplier:</strong> Siemens Healthineers</div>
          <div><strong>Items:</strong> 3 parts</div>
          <div><strong>Total:</strong> $14,200.00</div>
          <div><strong>Status:</strong> Pending Approval</div>
        </div>
      </Card>
    </div>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Card
        footer={
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button style={{ padding: '6px 16px', borderRadius: 4, border: '1px solid #DCDCDC', background: '#fff', cursor: 'pointer', fontFamily: 'Source Sans Pro, sans-serif', fontSize: 14 }}>Cancel</button>
            <button style={{ padding: '6px 16px', borderRadius: 4, border: '2px solid #005BA6', background: '#005BA6', color: '#fff', cursor: 'pointer', fontFamily: 'Source Sans Pro, sans-serif', fontSize: 14, fontWeight: 600 }}>Submit Order</button>
          </div>
        }
      >
        <div style={{ fontFamily: 'Source Sans Pro, sans-serif', color: '#4A4A4A', fontSize: 14 }}>
          MRI Gradient Coil Assembly — Part #MRI-7842<br />
          <span style={{ color: '#777', fontSize: 13 }}>Qty: 1 · Unit price: $12,400.00</span>
        </div>
      </Card>
    </div>
  ),
};

export const Hoverable: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {['CT Scanner', 'MRI System', 'Ultrasound'].map((name) => (
        <Card key={name} hoverable style={{ width: 180 }}>
          <div style={{ fontFamily: 'Source Sans Pro, sans-serif', fontWeight: 600, color: '#2B2B2B', marginBottom: 4 }}>{name}</div>
          <div style={{ fontFamily: 'Source Sans Pro, sans-serif', fontSize: 13, color: '#777' }}>Click to view parts</div>
        </Card>
      ))}
    </div>
  ),
};

export const Clickable: Story = {
  render: () => (
    <div style={{ width: 340 }}>
      <Card onClick={() => alert('Opening contract details')} padding="lg">
        <div style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
          <div style={{ fontWeight: 600, color: '#2B2B2B', marginBottom: 4 }}>Service Contract SC-2024-0193</div>
          <div style={{ fontSize: 13, color: '#777' }}>Expires Dec 31, 2025 · Philips Brilliance CT</div>
        </div>
      </Card>
    </div>
  ),
};

export const PaddingSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['none','sm','md','lg'] as const).map(p => (
        <Card key={p} padding={p}>
          <div style={{ fontFamily: 'Source Sans Pro, sans-serif', fontSize: 13, color: '#4A4A4A' }}>
            padding="{p}" — {p === 'none' ? '0px' : p === 'sm' ? '12px' : p === 'md' ? '16px' : '24px'}
          </div>
        </Card>
      ))}
    </div>
  ),
};
