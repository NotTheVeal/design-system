import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import InlineButton from './inlineButton';

const meta: Meta<typeof InlineButton> = {
  title: 'Components/InlineButton',
  component: InlineButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InlineButton>;

export const Tall: Story = {
  args: {
    variant: 'tall',
    children: 'View Details',
    onClick: () => {},
  },
};

export const TallDisabled: Story = {
  args: {
    variant: 'tall',
    children: 'Add to Cart',
    disabled: true,
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'See supplier info',
    onClick: () => {},
  },
};

export const LinkBlue: Story = {
  args: {
    variant: 'linkBlue',
    children: 'View contract terms',
    onClick: () => {},
  },
};

export const IconButton: Story = {
  args: {
    variant: 'iconButton',
    'aria-label': 'Edit item',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    onClick: () => {},
  },
};

export const IconButtonWithLabel: Story = {
  args: {
    variant: 'tall',
    children: 'Download Quote',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
    onClick: () => {},
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', padding: 24, fontFamily: 'Source Sans Pro, sans-serif' }}>
      <InlineButton variant="tall">View PO Details</InlineButton>
      <InlineButton variant="link">Download invoice</InlineButton>
      <InlineButton variant="linkBlue">View contract</InlineButton>
      <InlineButton variant="iconButton" aria-label="Delete" icon={
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
          <path d="M10 11v6" /><path d="M14 11v6" />
        </svg>
      } />
    </div>
  ),
};
