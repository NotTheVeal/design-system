import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import IconLineArt from './iconLineArt';

const meta: Meta<typeof IconLineArt> = {
  title: 'Components/IconLineArt',
  component: IconLineArt,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    color: { control: 'select', options: ['default', 'brand', 'onDark', 'subtle'] },
  },
};

export default meta;
type Story = StoryObj<typeof IconLineArt>;

export const Default: Story = {
  args: {
    size: 'md',
    color: 'default',
    ariaLabel: 'Line art icon',
  },
};

export const Brand: Story = {
  args: {
    size: 'md',
    color: 'brand',
    ariaLabel: 'Brand line art icon',
  },
};

export const Subtle: Story = {
  args: {
    size: 'md',
    color: 'subtle',
    ariaLabel: 'Subtle line art icon',
  },
};

export const OnDark: Story = {
  args: {
    size: 'md',
    color: 'onDark',
    ariaLabel: 'On-dark line art icon',
  },
  decorators: [(Story) => (
    <div style={{ background: '#002F48', padding: 24, display: 'inline-block', borderRadius: 8 }}>
      <Story />
    </div>
  )],
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
      {(['sm', 'md', 'lg', 'xl'] as const).map(size => (
        <div key={size} style={{ textAlign: 'center' }}>
          <IconLineArt size={size} color="brand" ariaLabel={`${size} icon`} />
          <div style={{ marginTop: 8, fontSize: 12, color: '#777', fontFamily: "'Source Sans Pro', sans-serif" }}>{size}</div>
        </div>
      ))}
    </div>
  ),
};
