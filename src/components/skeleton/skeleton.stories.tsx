import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Skeleton } from './skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ maxWidth: 400 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = { args: { width: '100%', height: 16 } };
export const Circle: Story = { parameters: { layout: 'centered' }, args: { width: 48, height: 48, circle: true } };
export const Rectangle: Story = { parameters: { layout: 'centered' }, args: { width: 200, height: 120 } };
export const MultiLine: Story = { args: { width: '100%', height: 16, lines: 3 } };

export const CardSkeleton: Story = {
  render: () => (
    <div style={{ display:'flex', flexDirection:'column', gap:12, padding:16, border:'1px solid #DCDCDC', borderRadius:4, maxWidth:320 }}>
      <Skeleton width="100%" height={160} />
      <Skeleton width="70%" height={20} />
      <Skeleton width="100%" height={14} />
      <Skeleton width="90%" height={14} />
      <div style={{ display:'flex', justifyContent:'space-between' }}>
        <Skeleton width={80} height={28} />
        <Skeleton width={100} height={36} />
      </div>
    </div>
  ),
};

export const UserList: Story = {
  render: () => (
    <div style={{ display:'flex', flexDirection:'column', gap:12, maxWidth:400 }}>
      {[1,2,3].map(i => (
        <div key={i} style={{ display:'flex', gap:12, alignItems:'center' }}>
          <Skeleton width={40} height={40} circle />
          <div style={{ flex:1, display:'flex', flexDirection:'column', gap:6 }}>
            <Skeleton width="60%" height={16} />
            <Skeleton width="40%" height={12} />
          </div>
        </div>
      ))}
    </div>
  ),
};
