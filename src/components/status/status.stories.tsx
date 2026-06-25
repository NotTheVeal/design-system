import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Status from './status';

const meta = {
  title: 'Components/Status',
  component: Status,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Small Status Chip — colored dot + label. Maps order/procurement statuses to PS color tokens.',
      },
    },
  },
} satisfies Meta<typeof Status>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Processing: Story = {
  name: 'Processing — Blue dot',
  render: () => <Status type="info" label="Processing" />,
};

export const Shipped: Story = {
  name: 'Shipped — Green dot',
  render: () => <Status type="active" label="Shipped" />,
};

export const Pending: Story = {
  name: 'Pending — Yellow dot',
  render: () => <Status type="away" label="Pending" />,
};

export const UnderContract: Story = {
  name: 'Under Contract — Blue dot',
  render: () => <Status type="info" label="Under Contract" />,
};

export const Delivered: Story = {
  name: 'Delivered — Green dot',
  render: () => <Status type="active" label="Delivered" />,
};

export const Approved: Story = {
  name: 'Approved — Green dot',
  render: () => <Status type="online" label="Approved" />,
};

export const Urgent: Story = {
  name: 'Urgent — Red dot',
  render: () => <Status type="busy" label="Urgent" />,
};

export const Critical: Story = {
  name: 'Critical — Red dot',
  render: () => <Status type="error" label="Critical" />,
};

export const AllOrderStatuses: Story = {
  name: 'All Order Statuses Grid',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: '16px 32px', padding: 24, fontFamily: "'Source Sans Pro','Source Sans 3',sans-serif" }}>
      <Status type="info" label="Processing" />
      <Status type="active" label="Shipped" />
      <Status type="away" label="Pending" />
      <Status type="info" label="Under Contract" />
      <Status type="active" label="Delivered" />
      <Status type="online" label="Approved" />
      <Status type="busy" label="Urgent" />
      <Status type="error" label="Critical" />
    </div>
  ),
};
