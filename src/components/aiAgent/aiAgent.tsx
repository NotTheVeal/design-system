import React, { useState, useRef, useEffect } from 'react';

export interface AiMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface AiAgentProps {
  messages?: AiMessage[];
  onSend?: (message: string) => void;
  onClear?: () => void;
  isLoading?: boolean;
  placeholder?: string;
  agentName?: string;
  agentDescription?: string;
  maxHeight?: number;
  className?: string;
}

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const ClearIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const TypingIndicator = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '10px 14px' }}>
    {[0, 1, 2].map(i => (
      <div key={i} style={{
        width: 7, height: 7, borderRadius: '50%', background: '#005BA6', opacity: 0.4,
        animation: 'pulse 1.4s ease-in-out infinite',
        animationDelay: `${i * 0.2}s`,
      }} />
    ))}
    <style>{`@keyframes pulse { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }`}</style>
  </div>
);

export const AiAgent: React.FC<AiAgentProps> = ({
  messages = [],
  onSend,
  onClear,
  isLoading = false,
  placeholder = 'Ask me anything about your parts and orders...',
  agentName = 'PartsSource AI',
  agentDescription = 'Your intelligent procurement assistant',
  maxHeight = 480,
  className = '',
}) => {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const font = "'Source Sans Pro', -apple-system, sans-serif";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    onSend?.(trimmed);
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', border: '1px solid #DCDCDC', borderRadius: 8, overflow: 'hidden', background: '#FFFFFF', fontFamily: font, boxShadow: '0 2px 10px rgba(0,47,72,0.10)' }}>
      {/* Header */}
      <div style={{ background: '#005BA6', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
            <SparkleIcon />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF', lineHeight: '20px' }}>{agentName}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: '16px' }}>{agentDescription}</div>
          </div>
        </div>
        {onClear && messages.length > 0 && (
          <button onClick={onClear} title="Clear conversation" style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 4, padding: 6, cursor: 'pointer', color: '#FFFFFF', display: 'flex', alignItems: 'center' }}>
            <ClearIcon />
          </button>
        )}
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 16, maxHeight, background: '#FAFAFA' }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '32px 16px', color: '#949494' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#DCEAED', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#005BA6' }}>
              <SparkleIcon />
            </div>
            <p style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 300, color: '#002F48' }}>How can I help you today?</p>
            <p style={{ margin: 0, fontSize: 13, color: '#777777' }}>Ask me about parts, orders, vendors, or pricing.</p>
          </div>
        )}

        {messages.map(msg => {
          const isUser = msg.role === 'user';
          return (
            <div key={msg.id} style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', gap: 10, alignItems: 'flex-end' }}>
              {!isUser && (
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#005BA6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#FFFFFF' }}>
                  <SparkleIcon />
                </div>
              )}
              <div style={{ maxWidth: '72%' }}>
                <div style={{
                  padding: '10px 14px',
                  borderRadius: isUser ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  background: isUser ? '#005BA6' : '#FFFFFF',
                  color: isUser ? '#FFFFFF' : '#4A4A4A',
                  fontSize: 14,
                  lineHeight: '21px',
                  border: isUser ? 'none' : '1px solid #DCDCDC',
                  boxShadow: isUser ? 'none' : '0 1px 3px rgba(0,47,72,0.06)',
                }}>
                  {msg.content}
                </div>
                {msg.timestamp && (
                  <div style={{ fontSize: 11, color: '#949494', marginTop: 4, textAlign: isUser ? 'right' : 'left', padding: '0 4px' }}>
                    {formatTime(msg.timestamp)}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#005BA6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#FFFFFF' }}>
              <SparkleIcon />
            </div>
            <div style={{ background: '#FFFFFF', border: '1px solid #DCDCDC', borderRadius: '12px 12px 12px 2px', boxShadow: '0 1px 3px rgba(0,47,72,0.06)' }}>
              <TypingIndicator />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid #DCDCDC', background: '#FFFFFF', display: 'flex', gap: 10, alignItems: 'flex-end' }}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          style={{
            flex: 1, resize: 'none', border: '1px solid #DCDCDC', borderRadius: 6, padding: '10px 14px',
            fontSize: 14, color: '#4A4A4A', fontFamily: font, outline: 'none', lineHeight: '20px',
            transition: 'border-color 150ms ease',
            minHeight: 40, maxHeight: 120, overflow: 'auto',
          }}
          onFocus={e => (e.target.style.borderColor = '#005BA6')}
          onBlur={e => (e.target.style.borderColor = '#DCDCDC')}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          style={{
            width: 40, height: 40, borderRadius: 6, border: 'none', flexShrink: 0,
            background: input.trim() && !isLoading ? '#005BA6' : '#DCDCDC',
            color: '#FFFFFF', cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 150ms ease',
          }}
          onMouseEnter={e => input.trim() && !isLoading && ((e.currentTarget as HTMLElement).style.background = '#004A84')}
          onMouseLeave={e => input.trim() && !isLoading && ((e.currentTarget as HTMLElement).style.background = '#005BA6')}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default AiAgent;
