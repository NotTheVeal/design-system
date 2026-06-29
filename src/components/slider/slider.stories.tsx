import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Slider } from './slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ maxWidth: 400, width: '100%', margin: '40px auto' }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState(30);
    return <Slider value={val} onChange={setVal} label="Volume" />;
  },
};

export const Full: Story = {
  render: () => {
    const [val, setVal] = useState(100);
    return <Slider value={val} onChange={setVal} label="Brightness" />;
  },
};

export const Disabled: Story = {
  render: () => <Slider value={50} onChange={() => {}} label="Disabled" disabled />,
};

export const NoLabel: Story = {
  render: () => {
    const [val, setVal] = useState(60);
    return <Slider value={val} onChange={setVal} />;
  },
};
