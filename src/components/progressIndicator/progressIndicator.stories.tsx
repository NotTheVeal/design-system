import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProgressIndicator } from './progressIndicator';

const meta: Meta<typeof ProgressIndicator> = {
  title: 'Components/ProgressIndicator',
  component: ProgressIndicator,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ maxWidth:400, width:'100%', margin:'40px auto' }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof ProgressIndicator>;

export const Default: Story = { args: { value: 0, label: 'Not started' } };
export const InProgress: Story = { args: { value: 33, label: 'Uploading file' } };
export const HalfWay: Story = { args: { value: 66, label: 'Processing data' } };
export const Complete: Story = { args: { value: 100, label: 'Complete' } };
export const NoLabel: Story = { args: { value: 45 } };
export const AllStates: Story = {
  render: () => (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <ProgressIndicator value={0} label="Not started" />
      <ProgressIndicator value={33} label="Uploading file" />
      <ProgressIndicator value={66} label="Processing data" />
      <ProgressIndicator value={100} label="Complete" />
    </div>
  ),
};
