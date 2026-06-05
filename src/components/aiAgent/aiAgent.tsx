import React, { useState } from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AiAgentProps {
  agentName?: string;
  messages?: Message[];
  onSend?: (message: string) => void;
  placeholder?: string;
  className?: string;
}

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="14" y1="2" x2="6" y2="10" />
    <polyline points="14 2 9 14 6 10 2 7 14 2" />
  </svg>
);

const AiAgent: React.FC<AiAgentProps> = ({
  agentName = 'AI',
  messages = [],
  onSend,
  placeholder = 'Type a messageâ¦',
  className = '',
}) => {
  const [inputValue, setInputValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [sendHovered, setSendHovered] = useState(false);

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onSend?.(trimmed);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const initials = agentName.slice(0, 2).toUpperCase();

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#FFFFFF',
        border: '1px solid #DCDCDC',
        borderRadius: 8,
        boxShadow: '0 1px 4px rgba(0,47,72,0.08)',
        overflow: 'hidden',
        fontFamily,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 16px',
          borderBottom: '1px solid #DCDCDC',
          background: '#FAFAFA',
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: '#005BA6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontSize: 14,
            fontWeight: 700,
            userSelect: 'none',
            flexShrink: 0,
            fontFamily,
          }}
        >
          {initials}
        </div>
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#4A4A4A',
            fontFamily,
          }}
        >
          {agentName}
        </span>
        <div
          style={{
            marginLeft: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            color: '#0E7C55',
            fontFamily,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#17AB78',
              display: 'inline-block',
            }}
          />
          Online
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          minHeight: 200,
        }}
      >
        {messages.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              color: '#949494',
              fontFamily,
            }}
          >
            Start a conversationâ¦
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 8,
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              {msg.role === 'assistant' && (
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: '#005BA6',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily,
                  }}
                >
                  {initials}
                </div>
              )}
              <div
                style={{
                  maxWidth: '80%',
                  padding: '8px 12px',
                  borderRadius: 8,
                  borderTopLeftRadius: msg.role === 'assistant' ? 2 : 8,
                  borderTopRightRadius: msg.role === 'user' ? 2 : 8,
                  fontSize: 14,
                  background: msg.role === 'user' ? '#005BA6' : '#F1F1F1',
                  color: msg.role === 'user' ? '#FFFFFF' : '#4A4A4A',
                  fontFamily,
                  lineHeight: 1.5,
                }}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: '1px solid #DCDCDC',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
          <textarea
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            rows={1}
            style={{
              flex: 1,
              resize: 'none',
              border: `1px solid ${focused ? '#005BA6' : '#DCDCDC'}`,
              borderRadius: 4,
              padding: '8px 12px',
              fontSize: 14,
              color: '#4A4A4A',
              fontFamily,
              outline: 'none',
              boxShadow: focused ? '0 0 0 3px rgba(0,147,244,0.3)' : 'none',
              transition: 'border-color 150ms ease, box-shadow 150ms ease',
            }}
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!inputValue.trim()}
            onMouseEnter={() => setSendHovered(true)}
            onMouseLeave={() => setSendHovered(false)}
            style={{
              flexShrink: 0,
              height: 36,
              padding: '0 16px',
              background: !inputValue.trim() ? '#DCDCDC' : sendHovered ? '#004A84' : '#005BA6',
              color: '#FFFFFF',
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 4,
              border: 'none',
              cursor: !inputValue.trim() ? 'not-allowed' : 'pointer',
              fontFamily,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'background 150ms ease',
            }}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiAgent;
