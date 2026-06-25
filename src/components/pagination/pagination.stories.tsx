import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Pagination } from './pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: { layout: 'centered' },
  argTypes: { size: { control: 'select', options: ['sm', 'md'] } },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: { currentPage: 3, totalPages: 10, onPageChange: () => {} },
};

export const SmallSize: Story = {
  args: { currentPage: 5, totalPages: 20, size: 'sm', onPageChange: () => {} },
};

export const WithFirstLast: Story = {
  args: { currentPage: 5, totalPages: 20, showFirstLast: true, onPageChange: () => {} },
};

export const FewPages: Story = {
  args: { currentPage: 2, totalPages: 5, onPageChange: () => {} },
};

export const ManyPages: Story = {
  args: { currentPage: 10, totalPages: 50, siblingCount: 2, onPageChange: () => {} },
};

export const FirstPage: Story = {
  args: { currentPage: 1, totalPages: 10, onPageChange: () => {} },
};

export const LastPage: Story = {
  args: { currentPage: 10, totalPages: 10, onPageChange: () => {} },
};

export const Interactive: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <p style={{ margin: 0, fontSize: 14, color: '#4A4A4A', fontFamily: 'Source Sans Pro, sans-serif' }}>
          Page {page} of 25 — {(page - 1) * 10 + 1}–{Math.min(page * 10, 248)} of 248 results
        </p>
        <Pagination currentPage={page} totalPages={25} onPageChange={setPage} showFirstLast />
      </div>
    );
  },
};
