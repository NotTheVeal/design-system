import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Avatar } from './avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  argTypes: {
    size:   { control: 'select', options: ['xs','sm','md','lg','xl'] },
    status: { control: 'select', options: ['online','busy','away','offline'] },
  },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = { args: { name: 'Rachael Veal', size: 'md' } };
export const WithStatus: Story = { args: { name: 'John Smith', size: 'md', status: 'online' } };
export const Large: Story = { args: { name: 'Sarah Connor', size: 'lg', status: 'away' } };
export const Small: Story = { args: { name: 'Tom Baker', size: 'sm' } };

export const AllSizes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display:'flex', alignItems:'center', gap:20, padding:24, fontFamily:"'Source Sans Pro', sans-serif" }}>
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
    <div style={{ display:'flex', alignItems:'center', gap:24, padding:24, fontFamily:"'Source Sans Pro', sans-serif" }}>
      {([['online','Online'],['busy','Busy'],['away','Away'],['offline','Offline']] as const).map(([s, label]) => (
        <div key={s} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
          <Avatar name="Jane Doe" size="lg" status={s} />
          <span style={{ fontSize:12, color:'#4A4A4A' }}>{label}</span>
        </div>
      ))}
    </div>
  ),
};

export const AvatarGroupStory: Story = {
  name: 'Avatar Group',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display:'flex', alignItems:'center', padding:24 }}>
      {['Alice Wong','Bob Chen','Carol Adams','Dave Park','Eve Torres'].map((name, i) => (
        <div key={name} style={{ marginLeft: i ? -8 : 0, zIndex: 5 - i }}>
          <Avatar name={name} size="md" />
        </div>
      ))}
      <div style={{ marginLeft:-8, zIndex:0, width:36, height:36, borderRadius:'50%', background:'#DCDCDC', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:600, color:'#4A4A4A', border:'2px solid white', fontFamily:"'Source Sans Pro', sans-serif" }}>
        +3
      </div>
    </div>
  ),
};
