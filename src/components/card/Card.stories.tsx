import type { Meta, StoryObj } from '@storybook/react';
import Card from './card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
    footer: { control: 'text' },
    className: { control: 'text' },
    onClick: { action: 'called' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: 'Sample Title',
    content: 'Sample content',
    footer: 'Sample content',
    className: 'className',
    onClick: () => {},
  },
};

