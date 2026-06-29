import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Search } from './search';

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ maxWidth: 480, width: '100%', margin: '40px auto' }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Search>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return <Search value={val} onChange={setVal} placeholder="Search parts, equipment, suppliers..." />;
  },
};

export const WithValue: Story = {
  render: () => {
    const [val, setVal] = useState('Ultrasound probe');
    return <Search value={val} onChange={setVal} />;
  },
};

export const Disabled: Story = {
  render: () => <Search value="" onChange={() => {}} disabled />,
};

export const Large: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return <Search value={val} onChange={setVal} size="lg" placeholder="Search..." />;
  },
};
