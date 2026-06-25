import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AvatarGroup } from './avatarGroup';

const meta: Meta<typeof AvatarGroup> = {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    max: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

const TEAM = [
  { name: 'Rachel Kim', initials: 'RK' },
  { name: 'Marcus Johnson', initials: 'MJ' },
  { name: 'Sarah Chen', initials: 'SC' },
  { name: 'Tom Webb', initials: 'TW' },
  { name: 'Dana Patel', initials: 'DP' },
  { name: 'Luis Garcia', initials: 'LG' },
];

export const Default: Story = {
  args: { avatars: TEAM.slice(0, 4), size: 'md', max: 4 },
};

export const WithOverflow: Story = {
  args: { avatars: TEAM, max: 3, size: 'md' },
};

export const SmallSize: Story = {
  args: { avatars: TEAM.slice(0, 5), size: 'sm', max: 4 },
};

export const LargeSize: Story = {
  args: { avatars: TEAM, size: 'lg', max: 4 },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: '#777777', width: 40 }}>sm</span>
        <AvatarGroup avatars={TEAM} size="sm" max={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: '#777777', width: 40 }}>md</span>
        <AvatarGroup avatars={TEAM} size="md" max={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: '#777777', width: 40 }}>lg</span>
        <AvatarGroup avatars={TEAM} size="lg" max={4} />
      </div>
    </div>
  ),
};

export const TwoMembers: Story = {
  args: { avatars: TEAM.slice(0, 2), size: 'md', max: 4 },
};
