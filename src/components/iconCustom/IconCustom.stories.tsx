import type { Meta, StoryObj } from '@storybook/react';
import IconCustom from './iconCustom';

const meta: Meta<typeof IconCustom> = {
  title: 'Components/IconCustom',
  component: IconCustom,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    variant: { control: 'select', options: ['squareFilled', 'squareOutline', 'circleFilled', 'circleOutline'] },
    ariaLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof IconCustom>;

export const SquareFilled: Story = {
  args: {
    size: 'md',
    variant: 'squareFilled',
    ariaLabel: 'Square filled icon',
  },
};

export const SquareOutline: Story = {
  args: {
    size: 'md',
    variant: 'squareOutline',
    ariaLabel: 'Square outline icon',
  },
};

export const CircleFilled: Story = {
  args: {
    size: 'md',
    variant: 'circleFilled',
    ariaLabel: 'Circle filled icon',
  },
};

export const CircleOutline: Story = {
  args: {
    size: 'md',
    variant: 'circleOutline',
    ariaLabel: 'Circle outline icon',
  },
};

export const Large: Story = {
  args: {
    size: 'xl',
    variant: 'circleFilled',
    ariaLabel: 'Large circle filled icon',
  },
};
