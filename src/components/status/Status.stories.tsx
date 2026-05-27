import type { Meta, StoryObj } from '@storybook/react';
import Status from './status';

const meta: Meta<typeof Status> = {
  title: 'Components/Status',
  component: Status,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ["active","inactive","warning","error","info"] },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Status>;

export const Default: Story = {
  args: {
    type: 'active',
    className: 'className',
  },
};

