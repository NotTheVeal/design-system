import type { Meta, StoryObj } from '@storybook/react';
import Table from './table';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    headers: { control: 'text' },
    data: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    className: 'className',
    headers: 'headers',
    data: 'data',
  },
};

