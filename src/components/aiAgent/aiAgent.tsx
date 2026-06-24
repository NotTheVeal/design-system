/**
 * AiAgent — PS Design System 2.0
 * Figma node: 1911-46 (AI Agent Master Component Kit)
 *
 * Colors:
 *   Agent avatar:     #005BA6
 *   User avatar:      #004A84
 *   User bubble (full chat): #005BA6 fill, white text
 *   User bubble (standalone): #DCEAED fill, #4A4A4A text
 *   Agent bubble:     #F5F7FA
 *   Send button:      #005BA6, 4px radius (NOT circle)
 *   Error bg:         #FEF0F0, icon + text #E00000
 *   Online dot:       #17AB78
 */
import React, { useState, useRef, useEffect } from 'react';

const FONT = "'Source Sans 3', 'Source Sans Pro', -apple-system, sans-serif";

const C = {
  blue: '#005BA6', blueDark: '#004A84', blueLight: '#DCEAED', blueSubtle: '#EBF3FA',
  white: '#FFFFFF', bgMsg: '#F5F7FA', border: '#DCDCDC', borderLight: '#F1F1F1',
  textPrimary: '#4A4A4A', textSecondary: '#777777', textMuted: '#AAAAAA',
  green: '#17AB78', red: '#E00000', redBg: '#FEF0F0', midnight: '#002F48',
} as const;

export const AgentAvatar: React.FC<{ initials?: string; size?: number }> = ({ initials = 'PA', size = 40 }) => (
  <div style={{ width: size, height: size, borderRadius: '50%', background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: FONT, fontWeight: 700, fontSize: size * 0.35, color: C.white, letterSpacing: '0.02em' }}>{initials}</div>
);

export const UserAvatar: React.FC<{ initials?: string; size?: number }> = ({ initials = 'DM', size = 40 }) => (
  <div style={{ width: size, height: size, borderRadius: '50%', background: C.blueDark, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: FONT, fontWeight: 700, fontSize: size * 0.35, color: C.white, letterSpacing: '0.02em' }}>{initials}</div>
);

export const LoadingBubble: React.FC<{ text?: string; estimatedTime?: string }> = ({ text = 'Analyzing prompt…', estimatedTime }) => (
  <div>
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 100, border: '1px solid ' + C.border, background: C.white, fontFamily: FONT, fontSize: 14, color: C.textSecondary }}>
      <span style={{ display: 'flex', gap: 3 }}>
        {[0, 1, 2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: C.textMuted, animation: 'ps-ai-pulse 1.2s ease-in-out ' + (i * 0.2) + 's infinite' }} />)}
      </span>
      <span style={{ fontWeight: 600 }}>{text}</span>
    </div>
    {estimatedTime && (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6, fontFamily: FONT, fontSize: 12, color: C.textMuted }}>
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth={1.75} strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        {estimatedTime}
      </div>
    )}
    <style>{`@keyframes ps-ai-pulse { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }`}</style>
  </div>
);

export const AiErrorMessage: React.FC<{ message?: string }> = ({ message = 'There was an error in processing this request. Please try again or try later.' }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderRadius: 8, backgroundColor: C.redBg, fontFamily: FONT }}>
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth={1.75} strokeLinecap="round" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
    <span style={{ fontSize: 15, color: C.red, lineHeight: 1.5 }}>{message}</span>
  </div>
);

export const ActionBar: React.FC<{ actions: Array<{ label: string; onClick?: () => void }> }> = ({ actions }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
    {actions.map(a => (
      <button key={a.label} onClick={a.onClick} style={{ padding: '8px 20px', borderRadius: 100, border: '1.5px solid ' + C.border, background: C.white, color: C.blue, fontFamily: FONT, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.blue; (e.currentTarget as HTMLButtonElement).style.background = C.blueSubtle; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.border; (e.currentTarget as HTMLButtonElement).style.background = C.white; }}>
        {a.label}
      </button>
    ))}
  </div>
);

export interface DataCardProps {
  title: string; subtitle?: string; trackingLabel?: string; trackingNumber?: string;
  delivery?: string; statusBadge?: string; cost?: string;
  badge?: { label: string; color: 'urgent' | 'info' | 'neutral' }; highlighted?: boolean;
}

export const DataCard: React.FC<DataCardProps> = ({ title, subtitle, trackingLabel, trackingNumber, delivery, statusBadge, cost, badge, highlighted }) => (
  <div style={{ borderRadius: 8, border: '1px solid ' + C.border, backgroundColor: highlighted ? C.blueSubtle : C.white, fontFamily: FONT, overflow: 'hidden' }}>
    <div style={{ padding: '14px 16px' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>{title}</div>
      {subtitle && <div style={{ fontSize: 13, color: C.textSecondary, marginBottom: 10, whiteSpace: 'pre-wrap' }}>{subtitle}</div>}
      {(trackingLabel || trackingNumber) && (
        <div style={{ fontSize: 13, color: C.textSecondary, marginBottom: 2 }}>
          {trackingLabel && <span>{trackingLabel} · </span>}
          {trackingNumber && <a href="#" style={{ color: C.blue, textDecoration: 'none', fontWeight: 600 }}>{trackingNumber}</a>}
        </div>
      )}
      {delivery && <div style={{ fontSize: 13, color: C.textSecondary }}>{delivery}</div>}
    </div>
    <div style={{ padding: '10px 16px', borderTop: '1px solid ' + C.borderLight, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', gap: 6 }}>
        {statusBadge && <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 4, background: '#F1F1F1', color: C.textPrimary, border: '1px solid ' + C.border }}>{statusBadge}</span>}
        {badge && (() => {
          const colors = { urgent: { bg: '#FFF4D0', c: '#B45309' }, info: { bg: C.blueSubtle, c: C.blue }, neutral: { bg: '#F1F1F1', c: C.textPrimary } };
          const { bg, c } = colors[badge.color];
          return <span style={{ fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 4, background: bg, color: c }}>{badge.label}</span>;
        })()}
      </div>
      {cost && <div style={{ fontSize: 14, color: C.textPrimary }}>Cost: <strong style={{ color: C.midnight }}>{cost}</strong></div>}
    </div>
  </div>
);

export type ChatMessage =
  | { id: string; role: 'user' | 'agent'; content: React.ReactNode; timestamp?: string }
  | { id: string; role: 'error'; content?: string }
  | { id: string; role: 'loading'; estimatedTime?: string }
  | { id: string; role: 'data'; card: DataCardProps; actions?: Array<{ label: string; onClick?: () => void }> };

export interface ChatWindowProps {
  agentName?: string; agentInitials?: string; userInitials?: string;
  messages?: ChatMessage[]; onSend?: (text: string) => void;
  inputPlaceholder?: string; isLoading?: boolean; style?: React.CSSProperties;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  agentName = 'PartsSource AI', agentInitials = 'PA', userInitials = 'DM',
  messages = [], onSend, inputPlaceholder = 'Type a message…', isLoading = false, style,
}) => {
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = () => { if (!input.trim()) return; onSend?.(input); setInput(''); };

  return (
    <div style={{ fontFamily: FONT, border: '1px solid ' + C.border, borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: C.white, ...style }}>
      {/* Header — white bg, PA avatar, Online status right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderBottom: '1px solid ' + C.border, background: C.white }}>
        <AgentAvatar initials={agentInitials} size={40} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary }}>{agentName}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.green }} />
          <span style={{ fontSize: 13, color: C.green, fontWeight: 600 }}>Online</span>
        </div>
      </div>
      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 200 }}>
        {messages.map(msg => {
          if (msg.role === 'user') return (
            <div key={msg.id} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 8 }}>
              <div style={{ maxWidth: '72%', padding: '11px 16px', borderRadius: '18px 18px 4px 18px', background: C.blue, color: C.white, fontSize: 15, lineHeight: 1.5 }}>{msg.content}</div>
              <UserAvatar initials={userInitials} size={36} />
            </div>
          );
          if (msg.role === 'agent') return (
            <div key={msg.id} style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <AgentAvatar initials={agentInitials} size={36} />
              <div style={{ maxWidth: '72%', padding: '11px 16px', borderRadius: '18px 18px 18px 4px', background: C.bgMsg, color: C.textPrimary, fontSize: 15, lineHeight: 1.5 }}>{msg.content}</div>
            </div>
          );
          if (msg.role === 'error') return <AiErrorMessage key={msg.id} message={msg.content} />;
          if (msg.role === 'loading') return (
            <div key={msg.id} style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <AgentAvatar initials={agentInitials} size={36} />
              <LoadingBubble estimatedTime={msg.estimatedTime} />
            </div>
          );
          if (msg.role === 'data') return (
            <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <DataCard {...msg.card} />
              {msg.actions && <ActionBar actions={msg.actions} />}
            </div>
          );
          return null;
        })}
        {isLoading && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            <AgentAvatar initials={agentInitials} size={36} />
            <LoadingBubble />
          </div>
        )}
        <div ref={endRef} />
      </div>
      {/* Input — rectangular Send button, NOT circle */}
      <div style={{ borderTop: '1px solid ' + C.border, padding: '12px 16px' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder={inputPlaceholder}
            style={{ flex: 1, height: 44, border: '1px solid ' + C.border, borderRadius: 6, padding: '0 14px', fontSize: 14, fontFamily: FONT, outline: 'none', color: C.textPrimary }} />
          <button onClick={handleSend} style={{ height: 44, padding: '0 20px', borderRadius: 6, border: 'none', background: C.blue, color: C.white, fontFamily: FONT, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = C.blueDark; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = C.blue; }}>
            Send
          </button>
        </div>
        <p style={{ fontSize: 11, color: C.textMuted, margin: '6px 0 0', textAlign: 'center' }}>
          This AI can make mistakes, including about people. Always verify information yourself.
        </p>
      </div>
    </div>
  );
};

export default ChatWindow;
