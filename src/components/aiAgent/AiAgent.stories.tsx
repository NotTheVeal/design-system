import type { Meta, StoryObj } from '@storybook/react';
import AiAgent from './aiAgent';

const meta: Meta<typeof AiAgent> = {
  title: 'Components/AiAgent',
  component: AiAgent,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AiAgent>;

export const Default: Story = {
  args: {
    agentName: 'PartsSource AI',
    messages: [
      { role: 'assistant', content: 'Hello! How can I help you today?' },
      { role: 'user', content: 'What is the delivery status of my order?' },
      { role: 'assistant', content: 'I can look that up for you. Could you share your order number?' },
    ],
    onSend: () => {},
  },
};

export const Empty: Story = {
  args: {
    agentName: 'PartsSource AI',
    messages: [],
    onSend: () => {},
  },
};

export const LongConversation: Story = {
  args: {
    agentName: 'PartsSource AI',
    messages: [
      { role: 'assistant', content: 'Hello! How can I help you today?' },
      { role: 'user', content: 'I need a replacement cable for a GE patient monitor.' },
      { role: 'assistant', content: 'I can help with that. Which GE monitor model do you have?' },
      { role: 'user', content: 'It is a GE Dash 4000.' },
      { role: 'assistant', content: 'Great — I found 3 compatible SpO2 cables for the GE Dash 4000. Would you like OEM or aftermarket options?' },
    ],
    onSend: () => {},
  },
};
