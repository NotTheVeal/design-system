import type { Meta, StoryObj } from '@storybook/react';
import NavLeft from './navLeft';

const meta: Meta<typeof NavLeft> = {
  title: 'Components/NavLeft',
  component: NavLeft,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    isOpen: { control: 'boolean' },
    onToggle: { action: 'called' },
  },
};

export default meta;
type Story = StoryObj<typeof NavLeft>;

export const Default: Story = {
  args: {
    className: 'className',
    isOpen: true,
    onToggle: () => {},
  },
};

