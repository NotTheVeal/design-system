import type { Meta, StoryObj } from '@storybook/react';
import Tabs from './tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: { layout: 'centered', docs: { description: { component: 'Tabs component from the PartsSource design system.' } } },
  tags: ['autodocs'],
  argTypes: {
    tabs: { control: 'object' },
    activeTabIndex: { control: 'number' },
    onTabChange: { action: 'called' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    tabs: [
      { label: 'Overview', content: 'Overview content goes here.' },
      { label: 'Details', content: 'Detailed information goes here.' },
      { label: 'History', content: 'Historical data goes here.', disabled: false },
    ],
    activeTabIndex: 0,
    onTabChange: () => {},
  },
};

export const WithDisabledTab: Story = {
  args: {
    tabs: [
      { label: 'Active', content: 'This tab is active.' },
      { label: 'Disabled', content: 'This content is hidden.', disabled: true },
    ],
    activeTabIndex: 0,
    onTabChange: () => {},
  },
};
