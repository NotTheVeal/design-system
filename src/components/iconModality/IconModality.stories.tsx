import type { Meta, StoryObj } from '@storybook/react';
import { createElement } from 'react';
import IconModality from './iconModality';

const meta: Meta<typeof IconModality> = {
  title: 'Components/IconModality',
  component: IconModality,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['squareFilled', 'squareOutline', 'circleFilled', 'circleOutline'] },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
  },
};

export default meta;
type Story = StoryObj<typeof IconModality>;

const heartSvg = createElement('svg', {
  width: 16, height: 16, viewBox: '0 0 24 24',
  fill: 'none', stroke: 'currentColor', strokeWidth: '1.75',
  strokeLinecap: 'round', strokeLinejoin: 'round'
}, createElement('path', {
  d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'
}));

export const SquareFilled: Story = {
  args: {
    type: 'squareFilled',
    icon: heartSvg,
    size: 'md',
    'aria-label': 'Square filled icon',
  },
};

export const SquareOutline: Story = {
  args: {
    type: 'squareOutline',
    icon: heartSvg,
    size: 'md',
    'aria-label': 'Square outline icon',
  },
};

export const CircleFilled: Story = {
  args: {
    type: 'circleFilled',
    icon: heartSvg,
    size: 'md',
    'aria-label': 'Circle filled icon',
  },
};

export const CircleOutline: Story = {
  args: {
    type: 'circleOutline',
    icon: heartSvg,
    size: 'md',
    'aria-label': 'Circle outline icon',
  },
};

export const Large: Story = {
  args: {
    type: 'circleFilled',
    icon: heartSvg,
    size: 'xl',
    'aria-label': 'Large circle filled icon',
  },
};
