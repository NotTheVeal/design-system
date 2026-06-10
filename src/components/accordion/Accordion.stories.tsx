import type { Meta, StoryObj } from '@storybook/react';
import Accordion from './accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    allowMultiple: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    items: [
      { title: 'What is ProProcure?', content: 'ProProcure is a healthcare procurement platform built for clinical and supply chain teams.', defaultOpen: true },
      { title: 'How do I place an order?', content: 'Search for the part you need, add it to your cart, and proceed to checkout.' },
      { title: 'What payment methods are accepted?', content: 'We accept purchase orders, credit cards, and ACH transfers.' },
    ],
  },
};

export const AllowMultiple: Story = {
  args: {
    allowMultiple: true,
    items: [
      { title: 'Section One', content: 'Content for section one.', defaultOpen: true },
      { title: 'Section Two', content: 'Content for section two.', defaultOpen: true },
      { title: 'Section Three', content: 'Content for section three.' },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [
      { title: 'Frequently Asked Question', content: 'This accordion has just one expandable item.', defaultOpen: true },
    ],
  },
};
