import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import EmptyState from './emptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

const SearchIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CartIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

export const NoResults: Story = {
  render: () => (
    <EmptyState
      icon={<SearchIcon />}
      title="No results found"
      description="We couldn't find any parts matching your search. Try adjusting your filters or searching by part number."
      action={
        <button style={{ padding: '10px 24px', background: '#005BA6', color: '#fff', border: 'none', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          Clear Filters
        </button>
      }
    />
  ),
};

export const EmptyCart: Story = {
  render: () => (
    <EmptyState
      icon={<CartIcon />}
      title="Your cart is empty"
      description="Browse our catalog to find OEM and aftermarket medical equipment parts."
      action={
        <button style={{ padding: '10px 24px', background: '#005BA6', color: '#fff', border: 'none', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          Browse Catalog
        </button>
      }
    />
  ),
};

export const NoDescription: Story = {
  render: () => (
    <EmptyState
      title="No service requests"
    />
  ),
};
