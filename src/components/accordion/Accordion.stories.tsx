import type { Meta, StoryObj } from '@storybook/react';
import Accordion from './accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    children: { control: 'text' },
    className: { control: 'text' },
    id: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    title: 'Sample Title',
    children: 'Content goes here',
    className: 'className',
    id: 'id',
  },
};

