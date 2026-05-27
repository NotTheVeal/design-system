import type { Meta, StoryObj } from '@storybook/react';
import Loading from './loading';

const meta: Meta<typeof Loading> = {
  title: 'Components/Loading',
  component: Loading,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    size: { control: 'select', options: ["sm","md","lg"] },
    ariaLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  args: {
    className: 'className',
    size: 'sm',
    ariaLabel: 'ariaLabel',
  },
};

