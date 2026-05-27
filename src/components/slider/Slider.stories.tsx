import type { Meta, StoryObj } from '@storybook/react';
import Slider from './slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    onChange: { action: 'called' },
    className: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    value: 1,
    min: 1,
    max: 1,
    onChange: () => {},
    className: 'className',
    disabled: true,
  },
};

export const Disabled: Story = { args: { ...Default.args, disabled: true } };
