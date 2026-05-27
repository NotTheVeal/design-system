import type { Meta, StoryObj } from '@storybook/react';
import Input from './input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    label: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    onChange: { action: 'called' },
    onFocus: { control: 'text' },
    onBlur: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    className: 'className',
    label: 'Label',
    error: 'error',
    disabled: true,
    value: 'value',
    placeholder: 'Enter value...',
    onChange: () => {},
    onFocus: 'onFocus',
    onBlur: 'onBlur',
  },
};

export const Disabled: Story = { args: { ...Default.args, disabled: true } };
