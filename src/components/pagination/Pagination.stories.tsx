import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Pagination from './pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    siblingCount: { control: 'number' },
    showFirstLast: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <Pagination
        currentPage={page}
        totalPages={10}
        onPageChange={setPage}
      />
    );
  },
};

export const MiddlePage: Story = {
  render: () => {
    const [page, setPage] = useState(5);
    return (
      <Pagination
        currentPage={page}
        totalPages={12}
        onPageChange={setPage}
      />
    );
  },
};

export const WithFirstLast: Story = {
  render: () => {
    const [page, setPage] = useState(4);
    return (
      <Pagination
        currentPage={page}
        totalPages={10}
        onPageChange={setPage}
        showFirstLast
      />
    );
  },
};

export const LastPage: Story = {
  render: () => {
    const [page, setPage] = useState(10);
    return (
      <Pagination
        currentPage={page}
        totalPages={10}
        onPageChange={setPage}
      />
    );
  },
};

export const FewPages: Story = {
  render: () => {
    const [page, setPage] = useState(2);
    return (
      <Pagination
        currentPage={page}
        totalPages={3}
        onPageChange={setPage}
      />
    );
  },
};
