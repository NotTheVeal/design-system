import type { Meta, StoryObj } from '@storybook/react';
import Select from './select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'text' },
    value: { control: 'text' },
    onChange: { action: 'called' },
    className: { control: 'text' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    options: 'options',
    value: 'value',
    onChange: () => {},
    className: 'className',
    disabled: true,
    placeholder: 'Enter value...',
  },
};

export const Disabled: Story = { args: { ...Default.args, disabled: true } };
