import type { Meta, StoryObj } from '@storybook/react';
import Radio from './radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'text' },
    selectedValue: { control: 'text' },
    onChange: { action: 'called' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    options: 'options',
    selectedValue: 'selectedValue',
    onChange: () => {},
    className: 'className',
  },
};

