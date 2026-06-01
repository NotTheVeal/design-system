import type { Meta, StoryObj } from '@storybook/react';
import Cart from './cart';

const meta: Meta<typeof Cart> = {
  title: 'Components/Cart',
  component: Cart,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Cart>;

export const Default: Story = {
  args: {
    items: [
      {
        id: '1',
        name: 'MRI Gradient Coil Assembly',
        description: 'OEM Part #GCA-7720',
        quantity: 1,
        price: 1249.99,
        onQuantityChange: () => {},
        onRemove: () => {},
      },
      {
        id: '2',
        name: 'Ultrasound Transducer Probe',
        description: 'Compatible: GE Logiq E9',
        quantity: 2,
        price: 389.00,
        onQuantityChange: () => {},
        onRemove: () => {},
      },
    ],
    onCheckout: () => {},
  },
};
