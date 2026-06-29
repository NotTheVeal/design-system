import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tooltip } from './tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

const TriggerBtn = ({ label = 'Hover me' }: { label?: string }) => (
  <button style={{ padding:'8px 16px', background:'#FFFFFF', border:'1px solid #DCDCDC', borderRadius:4, cursor:'pointer', fontFamily:"'Source Sans Pro',sans-serif", fontSize:14 }}>
    {label}
  </button>
);

export const Default: Story = { render: () => <Tooltip content="This is a tooltip" trigger={<TriggerBtn />} /> };
export const Top: Story = { render: () => <Tooltip content="Tooltip on top" placement="top" trigger={<TriggerBtn label="Top" />} /> };
export const Bottom: Story = { render: () => <Tooltip content="Tooltip on bottom" placement="bottom" trigger={<TriggerBtn label="Bottom" />} /> };
export const Left: Story = { render: () => <Tooltip content="Tooltip on left" placement="left" trigger={<TriggerBtn label="Left" />} /> };
export const Right: Story = { render: () => <Tooltip content="Tooltip on right" placement="right" trigger={<TriggerBtn label="Right" />} /> };
export const LongContent: Story = {
  render: () => (
    <Tooltip content="Tooltips wrap automatically when the text exceeds the maximum width of approximately 200px." trigger={<TriggerBtn label="Long content" />} />
  ),
};
