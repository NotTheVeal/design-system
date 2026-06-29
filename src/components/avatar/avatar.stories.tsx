import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Avatar } from './avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = { args: { name: 'Rachael Veal', size: 'md' } };
export const WithStatus: Story = { args: { name: 'John Smith', size: 'md', status: 'online' } };
export const Large: Story = { args: { name: 'Sarah Connor', size: 'xl', status: 'away' } };
export const Small: Story = { args: { name: 'Tom Baker', size: 'sm' } };
export const ExtraSmall: Story = { args: { name: 'Anna Lee', size: 'xs' } };
export const NoName: Story = { args: { size: 'md' } };

export const AllSizes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display:'flex', alignItems:'center', gap:20, padding:24, fontFamily:"'Source Sans Pro',sans-serif" }}>
      {(['xs','sm','md','lg','xl'] as const).map(s => (
        <div key={s} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
          <Avatar name="Rachael Veal" size={s} status="online" />
          <span style={{ fontSize:11, color:'#777777', textTransform:'uppercase', letterSpacing:'0.5px' }}>{s}</span>
        </div>
      ))}
    </div>
  ),
};

export const AllStatuses: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display:'flex', gap:24, padding:24, fontFamily:"'Source Sans Pro',sans-serif" }}>
      {([['online','Online'],['away','Away'],['busy','Busy'],['offline','Offline']] as const).map(([s,l]) => (
        <div key={s} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
          <Avatar name="Jane Doe" size="lg" status={s} />
          <span style={{ fontSize:12, color:'#4A4A4A' }}>{l}</span>
        </div>
      ))}
    </div>
  ),
};
