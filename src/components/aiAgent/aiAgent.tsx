import React from 'react';

interface AiAgentProps {
  messages: { text: string; type: 'user' | 'agent' | 'error' }[];
  onSendMessage: (message: string) => void;
  className?: string;
}

const AiAgent: React.FC<AiAgentProps> = ({ messages, onSendMessage, className }) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className={`ai-agent ${className}`} style={{ '--ps-chat-background': 'var(--color-neutral-50)', padding: 'var(--ps-chat-paddingV) var(--ps-chat-paddingH)', display: 'flex', flexDirection: 'column', gap: 'var(--ps-chat-gap)' }}>
      <div className="messages" style={{ overflowY: 'auto', flexGrow: 1 }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message message-${msg.type}`}
            style={{
              background: msg.type === 'user' ? 'var(--color-brand-tint)' : msg.type === 'error' ? 'var(--color-feedback-error-background)' : 'var(--color-surface-default)',
              color: msg.type === 'user' ? 'var(--color-text-primary)' : msg.type === 'error' ? 'var(--color-feedback-error-default)' : 'var(--color-text-primary)',
              border: msg.type === 'agent' ? '1px solid var(--color-border-default)' : 'none',
              borderRadius: msg.type === 'user' ? '12px 12px 4px 12px' : msg.type === 'error' ? '8px' : '12px',
              padding: 'var(--ps-message-paddingV) var(--ps-message-paddingH)',
              maxWidth: '80%',
              margin: '4px 0',
            }}
            role={msg.type === 'error' ? 'alert' : 'presentation'}
            aria-label={msg.type === 'error' ? 'Error message' : undefined}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area" style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          style={{
            height: '48px',
            background: 'var(--color-surface-default)',
            border: '1px solid var(--color-border-default)',
            borderRadius: 'var(--ps-input-radius)',
            padding: 'var(--ps-input-paddingV) var(--ps-input-paddingH)',
            flexGrow: 1,
            outline: 'none'
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-brand-primary)'; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-default)'; }}
          aria-label="Message input"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          style={{
            background: 'white',
            border: '1px solid var(--color-brand-primary)',
            color: 'var(--color-brand-primary)',
            borderRadius: '100px',
            padding: '4px 12px',
            fontSize: '12px',
            fontWeight: 600,
            marginLeft: '8px',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-light)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; }}
          aria-label="Send message"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AiAgent;
