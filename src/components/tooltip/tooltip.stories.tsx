import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tooltip } from './tooltip';

const Btn = ({ label = 'Hover me' }: { label?: string }) => (
  <button style={{ padding:'8px 16px', background:'#FFFFFF', border:'1px solid #DCDCDC', borderRadius:4, cursor:'pointer', fontFamily:"'Source Sans Pro',sans-serif", fontSize:14 }}>
    {label}
  </button>
);

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => <Tooltip content="This is a tooltip" trigger={<Btn />} />,
};
export const Top: Story = {
  render: () => <Tooltip content="Tooltip on top" placement="top" trigger={<Btn label="Top" />} />,
};
export const Bottom: Story = {
  render: () => <Tooltip content="Tooltip on bottom" placement="bottom" trigger={<Btn label="Bottom" />} />,
};
export const Left: Story = {
  render: () => <Tooltip content="Tooltip on left" placement="left" trigger={<Btn label="Left" />} />,
};
export const Right: Story = {
  render: () => <Tooltip content="Tooltip on right" placement="right" trigger={<Btn label="Right" />} />,
};
export const LongContent: Story = {
  render: () => (
    <Tooltip
      content="Tooltips wrap automatically when the text exceeds the maximum width of approximately 200 pixels."
      trigger={<Btn label="Long content" />}
    />
  ),
};
export const AllPlacements: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display:'flex', gap:24, padding:60, justifyContent:'center', flexWrap:'wrap' }}>
      <Tooltip content="Top tooltip" placement="top" trigger={<Btn label="Top" />} />
      <Tooltip content="Bottom tooltip" placement="bottom" trigger={<Btn label="Bottom" />} />
      <Tooltip content="Left tooltip" placement="left" trigger={<Btn label="Left" />} />
      <Tooltip content="Right tooltip" placement="right" trigger={<Btn label="Right" />} />
    </div>
  ),
};
