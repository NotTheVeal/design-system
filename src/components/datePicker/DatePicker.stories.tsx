import type { Meta, StoryObj } from '@storybook/react';
import DatePicker from './datePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    selectedDate: { control: 'text' },
    onDateSelect: { action: 'called' },
    ariaLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    className: 'className',
    selectedDate: 'selectedDate',
    onDateSelect: () => {},
    ariaLabel: 'ariaLabel',
  },
};

