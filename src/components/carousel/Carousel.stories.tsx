import type { Meta, StoryObj } from '@storybook/react';
import Carousel from './carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  args: {
    items: ['Slide 1', 'Slide 2', 'Slide 3'],
    className: 'className',
  },
};

