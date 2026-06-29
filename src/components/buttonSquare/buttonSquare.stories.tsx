import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ButtonSquare } from './buttonSquare';

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const meta: Meta<typeof ButtonSquare> = {
  title: 'Components/ButtonSquare',
  component: ButtonSquare,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof ButtonSquare>;

export const Default: Story = { render: () => <ButtonSquare icon={<SearchIcon />} label="Search" size="lg" /> };
export const WithIcon: Story = { render: () => <ButtonSquare icon={<SearchIcon />} size="lg" /> };
export const Small: Story = { render: () => <ButtonSquare icon={<SearchIcon />} label="Search" size="sm" /> };
export const Loading: Story = { render: () => <ButtonSquare icon={<SearchIcon />} label="Search" loading /> };
export const Disabled: Story = { render: () => <ButtonSquare icon={<SearchIcon />} label="Search" disabled /> };
export const AllSizes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display:'flex', gap:12, alignItems:'center' }}>
      <ButtonSquare icon={<SearchIcon />} label="Large" size="lg" />
      <ButtonSquare icon={<SearchIcon />} label="Small" size="sm" />
    </div>
  ),
};
