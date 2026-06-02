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
    colorScheme: 'future',
    items: [
      {
        id: '1',
        name: 'MRI Gradient Coil Assembly',
        partNumber: 'GCA-7720',
        quantity: 1,
        price: '$1,249.99',
      },
      {
        id: '2',
        name: 'Ultrasound Transducer Probe',
        partNumber: 'GE-LOGIQ-E9',
        quantity: 2,
        price: '$389.00',
      },
    ],
    onCheckout: () => {},
  },
};
