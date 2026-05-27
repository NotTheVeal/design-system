import type { Meta, StoryObj } from '@storybook/react';
import AiDataCard from './aiDataCard';

const meta: Meta<typeof AiDataCard> = {
  title: 'Components/AiDataCard',
  component: AiDataCard,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    manufacturer: { control: 'text' },
    tracking: { control: 'text' },
    costLabel: { control: 'text' },
    costAmount: { control: 'text' },
    imageSrc: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof AiDataCard>;

export const Default: Story = {
  args: {
    title: 'Sample Title',
    manufacturer: 'manufacturer',
    tracking: 'tracking',
    costLabel: 'costLabel',
    costAmount: 'costAmount',
    imageSrc: 'imageSrc',
    className: 'className',
  },
};

