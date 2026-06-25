import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import EmptyState from './emptyState';

const SearchIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const DataIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
  </svg>
);
const StarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const AlertIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const Btn = ({ children }: { children: React.ReactNode }) => (
  <button style={{ padding: '10px 20px', background: '#005BA6', color: '#fff', border: 'none', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'Source Sans Pro','Source Sans 3',sans-serif" }}>
    {children}
  </button>
);
const BtnSecondary = ({ children }: { children: React.ReactNode }) => (
  <button style={{ padding: '10px 20px', background: '#fff', color: '#005BA6', border: '1px solid #005BA6', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'Source Sans Pro','Source Sans 3',sans-serif" }}>
    {children}
  </button>
);

const FullWrapper = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: '100%', minHeight: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFAFA', border: '1px solid #DCDCDC', borderRadius: 8 }}>
    {children}
  </div>
);
const InlineWrapper = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: 420, border: '1px solid #DCDCDC', borderRadius: 8, background: '#FFFFFF', overflow: 'hidden' }}>
    {children}
  </div>
);

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Empty state component for no-results, no-data, first-use, and error scenarios. Supports full-page and inline/compact sizes.',
      },
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoResultsFull: Story = {
  name: 'No Results — Full Page',
  render: () => (
    <FullWrapper>
      <EmptyState
        icon={<SearchIcon />}
        title="No results found"
        description="We couldn't find anything matching your search. Try adjusting your filters or search terms."
        action={<BtnSecondary>Clear Filters</BtnSecondary>}
      />
    </FullWrapper>
  ),
};

export const NoResultsInline: Story = {
  name: 'No Results — Inline',
  render: () => (
    <InlineWrapper>
      <EmptyState
        icon={<SearchIcon />}
        title="No results found"
        description="Try adjusting your search terms."
        action={<BtnSecondary>Clear Filters</BtnSecondary>}
      />
    </InlineWrapper>
  ),
};

export const NoDataFull: Story = {
  name: 'No Data — Full Page',
  render: () => (
    <FullWrapper>
      <EmptyState
        icon={<DataIcon />}
        title="No data yet"
        description="Once data is available it will appear here. Data is refreshed every 24 hours."
        action={<Btn>Refresh Now</Btn>}
      />
    </FullWrapper>
  ),
};

export const NoDataInline: Story = {
  name: 'No Data — Inline',
  render: () => (
    <InlineWrapper>
      <EmptyState
        icon={<DataIcon />}
        title="No data yet"
        description="Data will appear here once available."
        action={<Btn>Refresh</Btn>}
      />
    </InlineWrapper>
  ),
};

export const FirstUseFull: Story = {
  name: 'First Use — Full Page',
  render: () => (
    <FullWrapper>
      <EmptyState
        icon={<StarIcon />}
        title="Welcome! Let's get started"
        description="You haven't added anything yet. Create your first item to begin using this feature."
        action={<Btn>Get Started</Btn>}
      />
    </FullWrapper>
  ),
};

export const FirstUseInline: Story = {
  name: 'First Use — Inline',
  render: () => (
    <InlineWrapper>
      <EmptyState
        icon={<StarIcon />}
        title="Get started"
        description="Create your first item to begin."
        action={<Btn>Add Item</Btn>}
      />
    </InlineWrapper>
  ),
};

export const ErrorFull: Story = {
  name: 'Error State — Full Page',
  render: () => (
    <FullWrapper>
      <EmptyState
        icon={<AlertIcon />}
        title="Something went wrong"
        description="We encountered an unexpected error. Please try again or contact support if the issue persists."
        action={<div style={{ display: 'flex', gap: 12 }}><Btn>Try Again</Btn><BtnSecondary>Contact Support</BtnSecondary></div>}
      />
    </FullWrapper>
  ),
};

export const ErrorInline: Story = {
  name: 'Error State — Inline',
  render: () => (
    <InlineWrapper>
      <EmptyState
        icon={<AlertIcon />}
        title="Something went wrong"
        description="Please try again."
        action={<Btn>Try Again</Btn>}
      />
    </InlineWrapper>
  ),
};
