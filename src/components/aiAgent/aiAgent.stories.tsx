import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { AiAgent, AiMessage } from './aiAgent';

const meta: Meta<typeof AiAgent> = {
  title: 'Components/AiAgent',
  component: AiAgent,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof AiAgent>;

const sampleMessages: AiMessage[] = [
  { id: '1', role: 'user', content: 'What is the lead time for GE Healthcare ultrasound probes?', timestamp: new Date(Date.now() - 300000) },
  { id: '2', role: 'assistant', content: 'GE Healthcare ultrasound probes typically have a lead time of 2–5 business days for in-stock items. For specialty probes or custom configurations, lead times can range from 2–4 weeks. I can check real-time availability for a specific model if you provide the SKU.', timestamp: new Date(Date.now() - 290000) },
  { id: '3', role: 'user', content: 'Can you find alternatives for SKU 4542-0012 that are in stock?', timestamp: new Date(Date.now() - 60000) },
  { id: '4', role: 'assistant', content: 'I found 3 compatible alternatives for SKU 4542-0012 (GE Vivid Probe):\n\n• **SKU 4542-0018** — Philips C5-2 Curved Array (In Stock, $1,189)\n• **SKU 4542-0031** — Siemens 6C2 Convex Probe (In Stock, $1,340)\n• **SKU 4542-0044** — Mindray SC5-1U Probe (In Stock, $980)\n\nWould you like me to add any of these to your cart?', timestamp: new Date(Date.now() - 50000) },
];

export const Default: Story = {
  args: { messages: [], agentName: 'PartsSource AI', agentDescription: 'Your intelligent procurement assistant' },
  render: args => <div style={{ maxWidth: 600 }}><AiAgent {...args} /></div>,
};

export const Empty: Story = {
  args: { messages: [], agentName: 'PartsSource AI', agentDescription: 'Your intelligent procurement assistant' },
  render: args => <div style={{ maxWidth: 600 }}><AiAgent {...args} /></div>,
};

export const WithConversation: Story = {
  args: { messages: sampleMessages },
  render: args => <div style={{ maxWidth: 600 }}><AiAgent {...args} /></div>,
};

export const Loading: Story = {
  args: { messages: sampleMessages.slice(0, 3), isLoading: true },
  render: args => <div style={{ maxWidth: 600 }}><AiAgent {...args} /></div>,
};

export const Interactive: Story = {
  render: () => {
    const [messages, setMessages] = useState<AiMessage[]>([]);
    const [loading, setLoading] = useState(false);
    
    const responses: Record<number, string> = {
      0: 'Hello! I can help you find parts, check inventory, compare vendors, or answer procurement questions. What do you need today?',
      1: 'I found 12 results for that query. The top match is GE Healthcare SKU 4542-0012 at $1,249.00, currently In Stock with 2-day delivery.',
      2: 'Your order history shows 47 orders this quarter, totaling $128,450. Your most ordered category is Imaging & Diagnostics (38% of spend).',
    };
    let callCount = 0;

    const handleSend = (msg: string) => {
      const userMsg: AiMessage = { id: String(Date.now()), role: 'user', content: msg, timestamp: new Date() };
      setMessages(prev => [...prev, userMsg]);
      setLoading(true);
      const idx = callCount++ % 3;
      setTimeout(() => {
        const aiMsg: AiMessage = { id: String(Date.now() + 1), role: 'assistant', content: responses[idx], timestamp: new Date() };
        setMessages(prev => [...prev, aiMsg]);
        setLoading(false);
      }, 1500);
    };

    return (
      <div style={{ maxWidth: 600 }}>
        <AiAgent messages={messages} onSend={handleSend} onClear={() => setMessages([])} isLoading={loading} />
      </div>
    );
  },
};
