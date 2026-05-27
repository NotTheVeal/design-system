import type { Meta, StoryObj } from '@storybook/react';
import Modal from './modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    onClose: { action: 'closed' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Sample Title',
    onClose: () => {},
    children: 'Modal body content goes here.',
  },
};

export const Closed: Story = {
  args: { ...Default.args, isOpen: false },
};