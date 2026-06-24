import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ChatWindow, AgentAvatar, UserAvatar, LoadingBubble, AiErrorMessage, ActionBar, DataCard } from './aiAgent';
import type { ChatMessage, DataCardProps } from './aiAgent';

const meta = {
  title: 'Components/AiAgent',
  component: ChatWindow,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `**PS Design System 2.0 — AI Agent (Figma node 1911-46)**

All building blocks for conversational AI interfaces.

| Component | Purpose |
|-----------|---------|
| \`ChatWindow\` | Full chat UI — white header, PA avatar, Online status |
| \`LoadingBubble\` | "Analyzing prompt…" pill with animated dots |
| \`AiErrorMessage\` | Pink bg (#FEF0F0), red AlertCircle, red text |
| \`ActionBar\` | Pill outline buttons (Approve / Deny / Review later) |
| \`DataCard\` | Structured product/order response card |
| \`AgentAvatar\` / \`UserAvatar\` | #005BA6 / #004A84 avatars |

**Key colors:**
- User bubble (chat): \`#005BA6\` fill, white text
- Agent bubble: \`#F5F7FA\`
- Send button: \`#005BA6\`, \`4px\` radius — rectangular, NOT circle
- Error: bg \`#FEF0F0\`, text \`#E00000\``.trim(),
      },
    },
  },
} satisfies Meta<typeof ChatWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

const LONG_CONV: ChatMessage[] = [
  { id: '1', role: 'agent', content: 'Hello! How can I help you today?' },
  { id: '2', role: 'user',  content: 'I need a replacement cable for a GE patient monitor.' },
  { id: '3', role: 'agent', content: 'I can help with that. Which GE monitor model do you have?' },
  { id: '4', role: 'user',  content: 'It is a GE Dash 4000.' },
  { id: '5', role: 'agent', content: 'Great — I found 3 compatible SpO2 cables for the GE Dash 4000. Would you like OEM or aftermarket options?' },
];

const WITH_STATES: ChatMessage[] = [
  { id: '1', role: 'user', content: 'Show me my requests' },
  { id: '2', role: 'error' },
  { id: '3', role: 'user', content: 'Second message typed by user' },
  { id: '4', role: 'data', card: { title: '1 pending requests:', subtitle: 'Approval chain: Sarah Moore → Director Williams\n\nIf you approve this morning and your director approves today, it could still make the vendor\'s 5pm cutoff for same-day ship.' } },
  { id: '5', role: 'user', content: 'Longer message typed by the user example' },
  { id: '6', role: 'loading', estimatedTime: 'Est. response in 5 minutes' },
];

const WITH_CARDS: ChatMessage[] = [
  { id: '1', role: 'user', content: 'Show me my requests' },
  { id: '2', role: 'data', card: { title: 'BATTERY RECHARGEABLE, LITHIUM ION, 7.2…', subtitle: 'by Welch Allyn Inc.', trackingLabel: 'FedEx', trackingNumber: '#032523123242', delivery: 'Est. Delivery: Today by 1:00 PM', statusBadge: 'Not Shipped', cost: '$2,400' } },
  { id: '3', role: 'data', card: { title: 'BATTERY RECHARGEABLE, LITHIUM ION, 7.2…', subtitle: 'by Welch Allyn Inc.', delivery: 'ICU · Tech Mike R. · Yesterday at 3:47pm', badge: { label: 'Urgent', color: 'urgent' }, cost: '$2,400', highlighted: true },
    actions: [{ label: 'Approve' }, { label: 'Deny' }, { label: 'Review later' }] },
];

export const LongConversation: Story = {
  name: 'Chat Window — Long Conversation',
  render: () => {
    const [msgs, setMsgs] = useState<ChatMessage[]>(LONG_CONV);
    return (
      <ChatWindow agentName="PartsSource AI" agentInitials="PA" userInitials="DM" messages={msgs}
        onSend={text => setMsgs(p => [...p, { id: String(Date.now()), role: 'user', content: text }, { id: String(Date.now()+1), role: 'agent', content: 'Looking into that for you...' }])}
        style={{ width: 680, height: 520 }} />
    );
  },
};

export const WithErrorAndLoading: Story = {
  name: 'Chat Window — Error + Loading states',
  render: () => <ChatWindow messages={WITH_STATES} style={{ width: 480, height: 600 }} />,
};

export const WithProductCards: Story = {
  name: 'Chat Window — Data cards + Action bar',
  render: () => <ChatWindow messages={WITH_CARDS} style={{ width: 480, height: 600 }} />,
};

export const ComponentsShowcase: Story = {
  name: 'Individual components',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480, fontFamily: "'Source Sans 3', sans-serif" }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#777', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>AVATARS</p>
        <div style={{ display: 'flex', gap: 8 }}><AgentAvatar initials="PA" size={40} /><UserAvatar initials="DM" size={40} /></div>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#777', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>LOADING BUBBLE</p>
        <LoadingBubble estimatedTime="Est. response in 5 minutes" />
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#777', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>ERROR MESSAGE</p>
        <AiErrorMessage />
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#777', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>ACTION BAR</p>
        <ActionBar actions={[{ label: 'Approve' }, { label: 'Deny' }, { label: 'Review later' }]} />
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#777', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>DATA CARD</p>
        <DataCard title="BATTERY RECHARGEABLE, LITHIUM ION, 7.2…" subtitle="by Welch Allyn Inc." trackingLabel="FedEx" trackingNumber="#032523123242" delivery="Est. Delivery: Today by 1:00 PM" statusBadge="Not Shipped" cost="$2,400" />
      </div>
    </div>
  ),
};
