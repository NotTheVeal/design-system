import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Toggle } from './toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Toggle label="Email notifications" checked={checked} onChange={setChecked} />;
  },
};
export const On: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return <Toggle label="Push notifications" checked={checked} onChange={setChecked} />;
  },
};
export const Off: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Toggle label="SMS alerts" checked={checked} onChange={setChecked} />;
  },
};
export const Disabled: Story = { render: () => <Toggle label="Disabled (off)" disabled /> };
export const DisabledOn: Story = { render: () => <Toggle label="Locked on" defaultChecked disabled /> };
export const AllStates: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display:'flex', flexDirection:'column', gap:16, padding:24, fontFamily:"'Source Sans Pro',sans-serif" }}>
      <Toggle label="Email notifications" />
      <Toggle label="Push notifications (on)" defaultChecked />
      <Toggle label="Disabled off" disabled />
      <Toggle label="Disabled on" defaultChecked disabled />
    </div>
  ),
};
