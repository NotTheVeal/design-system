import type { Meta, StoryObj } from '@storybook/react';
import Drawer from './drawer';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'called' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    className: { control: 'text' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: 'Sample Title',
    subtitle: 'subtitle',
    className: 'className',
    children: 'Content goes here',
  },
};

