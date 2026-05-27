import type { Meta, StoryObj } from '@storybook/react';
import Cms from './cms';

const meta: Meta<typeof Cms> = {
  title: 'Components/Cms',
  component: Cms,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Cms>;

export const Default: Story = {
  args: {
    className: 'className',
  },
};

