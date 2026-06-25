import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tooltip } from './tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    placement: 'top',
  },
  render: (args) => (
    <Tooltip {...args}>
      <button style={{ padding: '8px 16px', borderRadius: 4, border: '1px solid #DCDCDC', cursor: 'pointer' }}>
        Hover me
      </button>
    </Tooltip>
  ),
};

export const Bottom: Story = {
  args: { content: 'Opens below', placement: 'bottom' },
  render: (args) => (
    <Tooltip {...args}>
      <button style={{ padding: '8px 16px', borderRadius: 4, border: '1px solid #DCDCDC', cursor: 'pointer' }}>
        Hover me
      </button>
    </Tooltip>
  ),
};

export const Left: Story = {
  args: { content: 'Opens to the left', placement: 'left' },
  render: (args) => (
    <Tooltip {...args}>
      <button style={{ padding: '8px 16px', borderRadius: 4, border: '1px solid #DCDCDC', cursor: 'pointer' }}>
        Hover me
      </button>
    </Tooltip>
  ),
};

export const Right: Story = {
  args: { content: 'Opens to the right', placement: 'right' },
  render: (args) => (
    <Tooltip {...args}>
      <button style={{ padding: '8px 16px', borderRadius: 4, border: '1px solid #DCDCDC', cursor: 'pointer' }}>
        Hover me
      </button>
    </Tooltip>
  ),
};

export const LongContent: Story = {
  args: { content: 'This tooltip contains a longer description that spans more than a few words to test wrapping behavior.', placement: 'top' },
  render: (args) => (
    <Tooltip {...args}>
      <button style={{ padding: '8px 16px', borderRadius: 4, border: '1px solid #DCDCDC', cursor: 'pointer' }}>
        Long tooltip
      </button>
    </Tooltip>
  ),
};

export const AllPlacements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, padding: 48, alignItems: 'center', justifyContent: 'center' }}>
      {(['top', 'bottom', 'left', 'right'] as const).map(p => (
        <Tooltip key={p} content={`${p} tooltip`} placement={p}>
          <button style={{ padding: '8px 12px', borderRadius: 4, border: '1px solid #DCDCDC', cursor: 'pointer', textTransform: 'capitalize' }}>
            {p}
          </button>
        </Tooltip>
      ))}
    </div>
  ),
};
