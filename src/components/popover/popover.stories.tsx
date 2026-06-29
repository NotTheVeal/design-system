import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Popover } from './popover';

const Btn = ({ label = 'Open Popover' }: { label?: string }) => (
  <button style={{ padding:'8px 20px', background:'#FFFFFF', border:'2px solid #005BA6', borderRadius:4, color:'#005BA6', cursor:'pointer', fontFamily:"'Source Sans Pro',sans-serif", fontSize:14, fontWeight:600 }}>
    {label}
  </button>
);

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => <Popover trigger={<Btn />} title="Popover Title" content="Supporting text goes here to explain this element or action." />,
};
export const TextOnly: Story = {
  render: () => <Popover trigger={<Btn label="Hover trigger" />} variant="text-only" content="Last updated 3 minutes ago by Sarah Johnson." />,
};
export const WithCTA: Story = {
  render: () => (
    <Popover trigger={<Btn label="Delete item" />} variant="cta" title="Delete Item"
      content="This will permanently remove the item from your list."
      actions={[{ label: 'Cancel', onClick: () => {} }, { label: 'Delete', onClick: () => {}, variant: 'primary' }]}
    />
  ),
};
export const PlacementBottom: Story = {
  render: () => <Popover trigger={<Btn label="Bottom" />} title="Bottom Popover" content="This popover appears below the trigger." placement="bottom" />,
};
