import type { Meta, StoryObj } from '@storybook/react';
import Search from './search';

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    onSearch: { action: 'called' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Default: Story = {
  args: {
    placeholder: 'Enter value...',
    onSearch: () => {},
    className: 'className',
  },
};

