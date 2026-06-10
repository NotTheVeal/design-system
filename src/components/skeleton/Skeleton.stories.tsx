import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Skeleton from './skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const TextLine: Story = {
  args: {
    height: 16,
    width: '60%',
  },
};

export const Heading: Story = {
  args: {
    height: 28,
    width: '40%',
  },
};

export const Circle: Story = {
  args: {
    height: 48,
    circle: true,
  },
};

export const NoAnimation: Story = {
  args: {
    height: 16,
    width: '50%',
    animate: false,
  },
};

export const ProductCardSkeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16, border: '1px solid #DCDCDC', borderRadius: 4, width: 320 }}>
      <Skeleton height={160} width="100%" borderRadius={4} />
      <Skeleton height={20} width="70%" />
      <Skeleton height={16} width="50%" />
      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <Skeleton height={16} width={80} />
        <Skeleton height={16} width={60} />
      </div>
      <Skeleton height={40} width="100%" borderRadius={4} />
    </div>
  ),
};

export const TableRowSkeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #F1F1F1' }}>
          <Skeleton height={36} width={36} circle />
          <Skeleton height={16} width={180} />
          <Skeleton height={16} width={100} />
          <Skeleton height={16} width={80} />
          <Skeleton height={24} width={64} borderRadius={12} />
        </div>
      ))}
    </div>
  ),
};
