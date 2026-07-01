import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card } from './card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'elevated', 'outlined', 'clickable'] },
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
  },
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: { variant: 'default', padding: 'md', children: 'Card content goes here.' },
};

export const Elevated: Story = {
  args: { variant: 'elevated', padding: 'md', children: 'Elevated card with shadow.' },
};

export const Outlined: Story = {
  args: { variant: 'outlined', padding: 'md', children: 'Outlined card.' },
};

export const Clickable: Story = {
  args: { variant: 'clickable', padding: 'md', children: 'Click me!' },
};

export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 400 }}>
      {(['default', 'elevated', 'outlined', 'clickable'] as const).map(v => (
        <Card key={v} variant={v} padding="md">
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: '#2B2B2B', fontWeight: 600 }}>{v}</div>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: '#777', marginTop: 4 }}>Card variant: {v}</div>
        </Card>
      ))}
    </div>
  ),
};

export const PartCard: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <Card variant="clickable" padding="md" style={{ width: 380 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontFamily: "'Source Sans 3', sans-serif" }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#002F48' }}>GE Healthcare Ultrasound Probe</div>
          <div style={{ fontSize: 12, color: '#777', marginTop: 4 }}>SKU: GE-4542-0012</div>
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#005BA6' }}>$1,249.00</div>
      </div>
    </Card>
  ),
};
—
