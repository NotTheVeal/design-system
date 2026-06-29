import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ContextActions } from './contextActions';

const ACTIONS = [
  { label: 'Edit', onClick: () => {} },
  { label: 'Duplicate', onClick: () => {} },
  { label: 'Archive', onClick: () => {} },
  { label: 'Delete', onClick: () => {}, variant: 'danger' as const },
];

const meta: Meta<typeof ContextActions> = {
  title: 'Components/ContextActions',
  component: ContextActions,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof ContextActions>;

export const Default: Story = { render: () => <ContextActions actions={ACTIONS} /> };
export const PartActions: Story = {
  render: () => (
    <ContextActions actions={[
      { label: 'Add to Cart', onClick: () => {} },
      { label: 'View Details', onClick: () => {} },
      { label: 'Compare', onClick: () => {} },
    ]} />
  ),
};
export const WithDivider: Story = {
  render: () => (
    <ContextActions actions={[
      { label: 'Edit Item', onClick: () => {} },
      { label: 'Duplicate', onClick: () => {} },
      { label: 'Archive', onClick: () => {} },
      { label: 'Delete', onClick: () => {}, variant: 'danger' as const },
    ]} />
  ),
};
