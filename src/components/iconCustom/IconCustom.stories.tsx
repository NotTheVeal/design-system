import type { Meta, StoryObj } from '@storybook/react';
import IconCustom from './iconCustom';

const meta: Meta<typeof IconCustom> = {
  title: 'Components/IconCustom',
  component: IconCustom,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ["sm","md","lg","xl"] },
    variant: { control: 'select', options: ["squarefilled","squareoutline","circlefilled","circleoutline"] },
    ariaLabel: { control: 'text' },
    className: { control: 'text' },
    onClick: { action: 'called' },
  },
};

export default meta;
type Story = StoryObj<typeof IconCustom>;

export const Default: Story = {
  args: {
    size: 'sm',
    variant: 'squarefilled',
    ariaLabel: 'ariaLabel',
    className: 'className',
    onClick: () => {},
  },
};

export const SquareFilled: Story = { args: { ...Default.args, variant: 'squareFilled' } };

export const SquareOutline: Story = { args: { ...Default.args, variant: 'squareOutline' } };

export const CircleFilled: Story = { args: { ...Default.args, variant: 'circleFilled' } };

export const CircleOutline: Story = { args: { ...Default.args, variant: 'circleOutline' } };
