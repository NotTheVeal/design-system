import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ContextActions from './contextActions';

const meta: Meta<typeof ContextActions> = {
  title: 'Components/ContextActions',
  component: ContextActions,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof ContextActions>;

export const Default: Story = {
  args: {
    actions: [
      { label: 'Edit', onClick: () => {} },
      { label: 'Delete', onClick: () => {}, variant: 'danger' },
    ],
  },
};

export const PartActions: Story = {
  args: {
    actions: [
      { label: 'Add to Cart', onClick: () => {} },
      { label: 'View Details', onClick: () => {} },
      { label: 'Compare', onClick: () => {} },
    ],
  },
};

export const WithDivider: Story = {
  args: {
    actions: [
      { label: 'Edit Item', onClick: () => {} },
      { label: 'Duplicate', onClick: () => {} },
      { label: 'Archive', onClick: () => {} },
      { label: 'Delete', onClick: () => {}, variant: 'danger' },
    ],
  },
};
