import type { Meta, StoryObj } from '@storybook/react';
import NavTop from './navTop';

const meta: Meta<typeof NavTop> = {
  title: 'Components/NavTop',
  component: NavTop,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof NavTop>;

export const Default: Story = {
  args: {
    className: 'className',
  },
};

