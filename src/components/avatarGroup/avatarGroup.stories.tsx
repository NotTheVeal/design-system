import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AvatarGroup } from './avatarGroup';

const TEAM = [
  { name: 'Rachael Veal' },
  { name: 'Mike Johnson' },
  { name: 'Sarah Chen' },
  { name: 'David Park' },
  { name: 'Eve Torres' },
  { name: 'Frank Lee' },
];

const meta: Meta<typeof AvatarGroup> = {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof AvatarGroup>;

export const Default: Story = { args: { avatars: TEAM.slice(0, 4), size: 'md' } };
export const WithOverflow: Story = { args: { avatars: TEAM, size: 'md', max: 4 } };
export const SmallSize: Story = { args: { avatars: TEAM.slice(0, 4), size: 'sm' } };
export const LargeSize: Story = { args: { avatars: TEAM.slice(0, 4), size: 'lg' } };
export const TwoMembers: Story = { args: { avatars: TEAM.slice(0, 2), size: 'md' } };
export const AllSizes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display:'flex', flexDirection:'column', gap:20, padding:24, fontFamily:"'Source Sans Pro',sans-serif" }}>
      {(['xs','sm','md','lg'] as const).map(s => (
        <div key={s} style={{ display:'flex', alignItems:'center', gap:16 }}>
          <span style={{ fontSize:12, color:'#777777', width:24, textTransform:'uppercase' }}>{s}</span>
          <AvatarGroup avatars={TEAM} size={s} max={4} />
        </div>
      ))}
    </div>
  ),
};
