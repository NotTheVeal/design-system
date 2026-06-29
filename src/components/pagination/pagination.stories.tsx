import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Pagination } from './pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = React.useState(3);
    return <Pagination page={page} totalPages={10} onPageChange={setPage} />;
  },
};

export const FirstPage: Story = {
  render: () => {
    const [page, setPage] = React.useState(1);
    return <Pagination page={page} totalPages={10} onPageChange={setPage} />;
  },
};

export const LastPage: Story = {
  render: () => {
    const [page, setPage] = React.useState(10);
    return <Pagination page={page} totalPages={10} onPageChange={setPage} />;
  },
};

export const WithFirstLast: Story = {
  render: () => {
    const [page, setPage] = React.useState(5);
    return <Pagination page={page} totalPages={20} onPageChange={setPage} showFirstLast />;
  },
};

export const FewPages: Story = {
  render: () => {
    const [page, setPage] = React.useState(2);
    return <Pagination page={page} totalPages={4} onPageChange={setPage} />;
  },
};

export const Interactive: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', fontFamily: "'Source Sans Pro', sans-serif" }}>
        <Pagination page={page} totalPages={15} onPageChange={setPage} showFirstLast />
        <p style={{ fontSize: 14, color: '#777777' }}>Current page: <strong>{page}</strong> of 15</p>
      </div>
    );
  },
};
