import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from './card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader title="GE Healthcare Ultrasound Probe" subtitle="High-frequency transducer for ultrasound imaging" />
      <CardBody>
        <div style={{ fontSize: 13, color: '#777777', lineHeight: 1.5, fontFamily: "'Source Sans Pro', sans-serif" }}>
          Part #: 4542-0012 · OEM: GE Healthcare
        </div>
      </CardBody>
      <CardFooter align="between">
        <span style={{ fontSize: 18, fontWeight: 700, color: '#2B2B2B', fontFamily: "'Source Sans Pro', sans-serif" }}>$1,249.00</span>
        <span style={{ fontSize: 11, fontWeight: 600, background: '#E2F5EE', color: '#0E7C55', padding: '3px 8px', borderRadius: 4, border: '1px solid rgba(14,124,85,0.2)', fontFamily: "'Source Sans Pro', sans-serif" }}>IN STOCK</span>
      </CardFooter>
    </Card>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated">
      <CardHeader title="Siemens CT Filter" subtitle="CT scanner maintenance filter" />
      <CardBody>
        <div style={{ fontSize: 13, color: '#777777', lineHeight: 1.5, fontFamily: "'Source Sans Pro', sans-serif" }}>
          Part #: CT-7821 · OEM: Siemens Healthineers
        </div>
      </CardBody>
      <CardFooter align="between">
        <span style={{ fontSize: 18, fontWeight: 700, color: '#2B2B2B', fontFamily: "'Source Sans Pro', sans-serif" }}>$89.50</span>
        <span style={{ fontSize: 11, fontWeight: 600, background: '#FFF4E5', color: '#B45309', padding: '3px 8px', borderRadius: 4, border: '1px solid rgba(180,83,9,0.2)', fontFamily: "'Source Sans Pro', sans-serif" }}>LOW STOCK</span>
      </CardFooter>
    </Card>
  ),
};

export const Clickable: Story = {
  render: () => (
    <Card onClick={() => alert('Card clicked')}>
      <CardHeader title="Philips Monitor Lead" subtitle="Click to view product details" />
      <CardBody>
        <div style={{ fontSize: 13, color: '#777777', fontFamily: "'Source Sans Pro', sans-serif" }}>Hover to see the interactive state with blue border and shadow.</div>
      </CardBody>
      <CardFooter>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#2B2B2B', fontFamily: "'Source Sans Pro', sans-serif" }}>$34.99</span>
      </CardFooter>
    </Card>
  ),
};

export const Outlined: Story = {
  render: () => (
    <Card variant="outlined">
      <CardHeader title="Outlined Card" subtitle="1px #DCDCDC border, no shadow" />
      <CardBody>
        <div style={{ fontSize: 13, color: '#4A4A4A', fontFamily: "'Source Sans Pro', sans-serif" }}>
          Used for lower-emphasis content blocks or secondary panels.
        </div>
      </CardBody>
    </Card>
  ),
};

export const CardGrid: Story = {
  parameters: { layout: 'padded' },
  decorators: [],
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 300px)', gap: 16, padding: 24, fontFamily: "'Source Sans Pro', sans-serif" }}>
      {[
        { title: 'GE Ultrasound Probe',     price: '$1,249.00', status: 'In Stock',     bg: '#E2F5EE', tc: '#0E7C55' },
        { title: 'Siemens CT Filter',       price: '$89.50',    status: 'Low Stock',    bg: '#FFF4E5', tc: '#B45309' },
        { title: 'Philips Monitor Lead',    price: '$34.99',    status: 'In Stock',     bg: '#E2F5EE', tc: '#0E7C55' },
        { title: 'Stryker Drill Bit Set',   price: '$3,450.00', status: 'In Stock',     bg: '#E2F5EE', tc: '#0E7C55' },
        { title: 'Medtronic Infusion Tube', price: '$24.99',    status: 'Out of Stock', bg: '#F1F1F1', tc: '#777777' },
        { title: 'BD Vacutainer Set',       price: '$12.75',    status: 'Low Stock',    bg: '#FFF4E5', tc: '#B45309' },
      ].map(item => (
        <Card key={item.title} onClick={() => {}}>
          <CardHeader title={item.title} subtitle="PartsSource Medical" />
          <CardFooter align="between">
            <span style={{ fontSize: 16, fontWeight: 700, color: '#2B2B2B' }}>{item.price}</span>
            <span style={{ fontSize: 11, fontWeight: 600, background: item.bg, color: item.tc, padding: '3px 8px', borderRadius: 4 }}>
              {item.status.toUpperCase()}
            </span>
          </CardFooter>
        </Card>
      ))}
    </div>
  ),
};
