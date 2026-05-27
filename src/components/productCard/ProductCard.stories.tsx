import type { Meta, StoryObj } from '@storybook/react';
import ProductCard from './productCard';

const meta: Meta<typeof ProductCard> = {
  title: 'Components/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    price: { control: 'text' },
    imageSrc: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    title: 'Sample Title',
    subtitle: 'subtitle',
    price: 'price',
    imageSrc: 'imageSrc',
    className: 'className',
  },
};

