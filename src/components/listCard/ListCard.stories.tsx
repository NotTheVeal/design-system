import type { Meta, StoryObj } from '@storybook/react';
import ListCard from './listCard';

const meta: Meta<typeof ListCard> = {
  title: 'Components/ListCard',
  component: ListCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ListCard>;

export const Default: Story = {
  args: {
    items: [
      {
        id: '1',
        primary: 'Philips Ultrasound System',
        secondary: 'Model: EPIQ 7G — Serial #U12345',
        meta: 'Due in 3 days',
      },
      {
        id: '2',
        primary: 'GE MRI Scanner',
        secondary: 'Model: SIGNA Explorer — Serial #M98765',
        meta: 'Due in 7 days',
      },
      {
        id: '3',
        primary: 'Siemens CT Scanner',
        secondary: 'Model: SOMATOM X.cite — Serial #C55678',
        meta: 'Due in 14 days',
      },
    ],
    onItemClick: () => {},
  },
};
