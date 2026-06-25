import type { Meta, StoryObj } from '@storybook/react';
import Badge from './badge';

const meta: Meta<typeof Badge> = {
    title: 'Components/Badge',
    component: Badge,
    tags: ['autodocs'],
    argTypes: {
          label: { control: 'text' },
          variant: { control: 'select', options: ['success', 'error', 'warning', 'info', 'neutral', 'primary'] },
          type: { control: 'select', options: ['status', 'list', 'assignment'] },
          filled: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
    args: {
          label: 'In Progress',
          variant: 'info',
          type: 'status',
          filled: false,
    },
};

export const Success: Story = {
    args: {
          label: 'Completed',
          variant: 'success',
          type: 'status',
    },
};

export const Warning: Story = {
    args: {
          label: 'Pending Review',
          variant: 'warning',
          type: 'status',
    },
};

export const Error: Story = {
    args: {
          label: 'Failed',
          variant: 'error',
          type: 'status',
    },
};

export const ListBadge: Story = {
    args: {
          label: 'Urgent',
          variant: 'error',
          type: 'list',
    },
};

export const Assignment: Story = {
    args: {
          label: 'Assigned',
          type: 'assignment',
          filled: false,
    },
};

export const AssignmentFilled: Story = {
    args: {
          label: 'Assigned',
          type: 'assignment',
          filled: true,
    },
};
