import type { Meta, StoryObj } from '@storybook/react';
import AiAgent from './aiAgent';

const meta: Meta<typeof AiAgent> = {
  title: 'Components/AiAgent',
  component: AiAgent,
  parameters: { layout: 'centered', docs: { description: { component: 'AiAgent component from the PartsSource design system.' } } },
  tags: ['autodocs'],
  argTypes: {
    messages: { control: 'object' },
    onSendMessage: { action: 'called' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof AiAgent>;

export const Default: Story = {
  args: {
    messages: [
      { text: 'Hello! How can I help you today?', type: 'agent' },
      { text: 'What is the delivery status of my order?', type: 'user' },
      { text: 'I can look that up. Could you share your order number?', type: 'agent' },
    ],
    onSendMessage: () => {},
  },
};

export const WithError: Story = {
  args: {
    messages: [
      { text: 'Check my order status', type: 'user' },
      { text: 'Sorry, I encountered an error retrieving your data.', type: 'error' },
    ],
    onSendMessage: () => {},
  },
};
