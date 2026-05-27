import type { Meta, StoryObj } from '@storybook/react';
import IconPictogram from './iconPictogram';

const meta: Meta<typeof IconPictogram> = {
  title: 'Components/IconPictogram',
  component: IconPictogram,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ["sm","md","lg","xl"] },
    background: { control: 'select', options: ["light","subtle","dark"] },
    className: { control: 'text' },
    ariaLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof IconPictogram>;

export const Default: Story = {
  args: {
    size: 'sm',
    background: 'light',
    className: 'className',
    ariaLabel: 'ariaLabel',
  },
};

