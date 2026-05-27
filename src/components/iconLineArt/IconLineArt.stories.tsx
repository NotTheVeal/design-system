import type { Meta, StoryObj } from '@storybook/react';
import IconLineArt from './iconLineArt';

const meta: Meta<typeof IconLineArt> = {
  title: 'Components/IconLineArt',
  component: IconLineArt,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ["sm","md","lg","xl"] },
    color: { control: 'select', options: ["default","brand","ondark","subtle"] },
    className: { control: 'text' },
    ariaLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof IconLineArt>;

export const Default: Story = {
  args: {
    size: 'sm',
    color: 'default',
    className: 'className',
    ariaLabel: 'ariaLabel',
  },
};

