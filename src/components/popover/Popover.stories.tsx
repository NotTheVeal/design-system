import type { Meta, StoryObj } from '@storybook/react';
import Popover from './popover';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
    className: { control: 'text' },
    isOpen: { control: 'boolean' },
    onClose: { action: 'called' },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    title: 'Sample Title',
    content: 'Sample content',
    className: 'className',
    isOpen: true,
    onClose: () => {},
  },
};

