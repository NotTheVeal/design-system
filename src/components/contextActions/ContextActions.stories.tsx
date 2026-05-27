import type { Meta, StoryObj } from '@storybook/react';
import ContextActions from './contextActions';

const meta: Meta<typeof ContextActions> = {
  title: 'Components/ContextActions',
  component: ContextActions,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'text' },
    className: { control: 'text' },
    trigger: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ContextActions>;

export const Default: Story = {
  args: {
    items: 'items',
    className: 'className',
    trigger: 'Sample content',
  },
};

