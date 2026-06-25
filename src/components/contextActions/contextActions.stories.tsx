import type { Meta, StoryObj } from '@storybook/react';
import ContextActions from './contextActions';

const meta: Meta<typeof ContextActions> = {
  title: 'Components/ContextActions',
  component: ContextActions,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContextActions>;

export const Default: Story = {
  args: {
    actions: [
      { label: 'View Details', onClick: () => {} },
      { label: 'Edit Order', onClick: () => {} },
      { label: 'Duplicate', onClick: () => {} },
      { label: 'Cancel Order', onClick: () => {}, disabled: true },
    ],
  },
};

export const ServiceActions: Story = {
  args: {
    actions: [
      { label: 'Create Service Request', onClick: () => {} },
      { label: 'View Service History', onClick: () => {} },
      { label: 'Download Report', onClick: () => {} },
      { label: 'Archive', onClick: () => {} },
    ],
  },
};
