import React, { useState, useRef, useEffect } from 'react';

// ─── Design Tokens ────────────────────────────────────────────────────────────
const COLORS = {
  psBlue: '#005BA6',
  psBlueDeep: '#004A84',
  userBubbleStandalone: '#DCEAED',
  userBubbleStandaloneText: '#4A4A4A',
  agentBubble: '#F5F7FA',
  errorBg: '#FEF0F0',
  errorColor: '#E00000',
  online: '#17AB78',
  white: '#FFFFFF',
  headerBg: '#FFFFFF',
  inputBorder: '#C8D0D8',
  textPrimary: '#1A1A1A',
  textSecondary: '#6B7280',
  pillBorder: '#005BA6',
  cardBorder: '#E5E7EB',
  badgeUrgentBg: '#FEF0F0',
  badgeUrgentText: '#E00000',
  badgeInfoBg: '#EBF4FF',
  badgeInfoText: '#005BA6',
} as const;

const FONT_FAMILY = "'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AgentAvatarProps {
  initials?: string;
  size?: number;
}

export interface UserAvatarProps {
  initials?: string;
  size?: number;
}

export interface ChatBubbleProps {
  message: string;
  sender: 'user' | 'agent';
  mode?: 'standalone' | 'full';
  avatar?: React.ReactNode;
  timestamp?: string;
}

export interface LoadingBubbleProps {
  label?: string;
  estimatedTime?: string;
}

export interface AiErrorMessageProps {
  message: string;
}

export interface ActionBarProps {
  actions: Array<{ label: string; onClick?: () => void }>;
}

export interface DataCardBadge {
  label: string;
  color?: 'urgent' | 'info' | 'default';
}

export interface DataCardProps {
  title: string;
  subtitle?: string;
  trackingLabel?: string;
  trackingNumber?: string;
  deliveryInfo?: string;
  statusBadge?: string;
  highlighted?: boolean;
  badge?: DataCardBadge;
  cost?: string;
}

export interface PromptSuggestion {
  label: string;
  description: string;
  onClick?: () => void;
}

export interface PromptLibraryProps {
  greeting?: string;
  subtitle?: string;
  prompts?: PromptSuggestion[];
  onSelect?: (prompt: PromptSuggestion) => void;
}

export interface QuickAction {
  label: string;
  description: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface QuickActionsProps {
  actions?: QuickAction[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  content: React.ReactNode;
  timestamp?: string;
}

export interface ChatWindowProps {
  messages?: ChatMessage[];
  onSend?: (text: string) => void;
  agentName?: string;
  isOnline?: boolean;
  placeholder?: string;
  style?: React.CSSProperties;
}

// ─── AgentAvatar ──────────────────────────────────────────────────────────────

export const AgentAvatar: React.FC<AgentAvatarProps> = ({
  initials = 'PA',
  size = 36,
}) => {
  return (
    <div
      aria-label={`Agent avatar: ${initials}`}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: COLORS.psBlue,
        color: COLORS.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: FONT_FAMILY,
        fontSize: Math.round(size * 0.38),
        fontWeight: 700,
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      {initials}
    </div>
  );
};

// ─── UserAvatar ───────────────────────────────────────────────────────────────

export const UserAvatar: React.FC<UserAvatarProps> = ({
  initials = 'U',
  size = 36,
}) => {
  return (
    <div
      aria-label={`User avatar: ${initials}`}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: COLORS.psBlueDeep,
        color: COLORS.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: FONT_FAMILY,
        fontSize: Math.round(size * 0.38),
        fontWeight: 700,
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      {initials}
    </div>
  );
};

// ─── ChatBubble ───────────────────────────────────────────────────────────────

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  sender,
  mode = 'standalone',
  avatar,
  timestamp,
}) => {
  const isUser = sender === 'user';
  const isFullMode = mode === 'full';

  const userBg = isFullMode ? COLORS.psBlue : COLORS.userBubbleStandalone;
  const userText = isFullMode ? COLORS.white : COLORS.userBubbleStandaloneText;

  const bubbleStyle: React.CSSProperties = {
    maxWidth: '72%',
    padding: '10px 14px',
    borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
    backgroundColor: isUser ? userBg : COLORS.agentBubble,
    color: isUser ? userText : COLORS.textPrimary,
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    lineHeight: '1.5',
    wordBreak: 'break-word',
  };

  if (isUser) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          marginBottom: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
          <div style={bubbleStyle}>{message}</div>
          {avatar}
        </div>
        {timestamp && (
          <span
            style={{
              fontSize: 11,
              color: COLORS.textSecondary,
              marginTop: 4,
              fontFamily: FONT_FAMILY,
            }}
          >
            {timestamp}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
        {avatar}
        <div style={bubbleStyle}>{message}</div>
      </div>
      {timestamp && (
        <span
          style={{
            fontSize: 11,
            color: COLORS.textSecondary,
            marginTop: 4,
            marginLeft: avatar ? 44 : 0,
            fontFamily: FONT_FAMILY,
          }}
        >
          {timestamp}
        </span>
      )}
    </div>
  );
};

// ─── LoadingBubble ────────────────────────────────────────────────────────────

export const LoadingBubble: React.FC<LoadingBubbleProps> = ({
  label = 'Analyzing prompt…',
  estimatedTime,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
        <AgentAvatar size={36} />
        <div
          style={{
            padding: '10px 16px',
            borderRadius: '18px 18px 18px 4px',
            backgroundColor: COLORS.agentBubble,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: FONT_FAMILY,
              fontSize: 14,
              color: COLORS.textSecondary,
            }}
          >
            <span>{label}</span>
            <DotPulse />
          </div>
          {estimatedTime && (
            <span
              style={{
                fontSize: 12,
                color: COLORS.textSecondary,
                fontFamily: FONT_FAMILY,
              }}
            >
              {estimatedTime}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const DotPulse: React.FC = () => {
  return (
    <span
      style={{ display: 'inline-flex', gap: 3, alignItems: 'center' }}
      aria-label="Loading"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: COLORS.textSecondary,
            display: 'inline-block',
            animation: `dotPulse 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes dotPulse {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </span>
  );
};

// ─── AiErrorMessage ───────────────────────────────────────────────────────────

export const AiErrorMessage: React.FC<AiErrorMessageProps> = ({ message }) => {
  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        padding: '10px 14px',
        borderRadius: 8,
        backgroundColor: COLORS.errorBg,
        border: `1px solid ${COLORS.errorColor}22`,
        fontFamily: FONT_FAMILY,
        fontSize: 14,
        color: COLORS.errorColor,
        lineHeight: '1.5',
      }}
    >
      <AlertCircleIcon color={COLORS.errorColor} size={18} />
      <span>{message}</span>
    </div>
  );
};

const AlertCircleIcon: React.FC<{ color: string; size?: number }> = ({
  color,
  size = 18,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0, marginTop: 1 }}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

// ─── ActionBar ────────────────────────────────────────────────────────────────

export const ActionBar: React.FC<ActionBarProps> = ({ actions }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        padding: '4px 0',
      }}
    >
      {actions.map((action, idx) => (
        <button
          key={idx}
          onClick={action.onClick}
          style={{
            padding: '6px 16px',
            borderRadius: 20,
            border: `1.5px solid ${COLORS.psBlue}`,
            backgroundColor: 'transparent',
            color: COLORS.psBlue,
            fontFamily: FONT_FAMILY,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'background-color 0.15s ease',
            outline: 'none',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#EBF4FF';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
          }}
          onFocus={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 0 2px ${COLORS.psBlue}40`;
          }}
          onBlur={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
          }}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};

// ─── DataCard ─────────────────────────────────────────────────────────────────

export const DataCard: React.FC<DataCardProps> = ({
  title,
  subtitle,
  trackingLabel,
  trackingNumber,
  deliveryInfo,
  statusBadge,
  highlighted = false,
  badge,
  cost,
}) => {
  const badgeBg =
    badge?.color === 'urgent'
      ? COLORS.badgeUrgentBg
      : badge?.color === 'info'
      ? COLORS.badgeInfoBg
      : '#F3F4F6';
  const badgeText =
    badge?.color === 'urgent'
      ? COLORS.badgeUrgentText
      : badge?.color === 'info'
      ? COLORS.badgeInfoText
      : COLORS.textSecondary;

  return (
    <div
      style={{
        border: `1px solid ${COLORS.cardBorder}`,
        borderLeft: highlighted
          ? `4px solid ${COLORS.psBlue}`
          : `1px solid ${COLORS.cardBorder}`,
        borderRadius: 8,
        padding: highlighted ? '12px 14px 12px 12px' : '12px 14px',
        backgroundColor: COLORS.white,
        fontFamily: FONT_FAMILY,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 8,
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: COLORS.textPrimary,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            flex: 1,
          }}
          title={title}
        >
          {title}
        </span>
        {badge && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: 20,
              backgroundColor: badgeBg,
              color: badgeText,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {badge.label}
          </span>
        )}
      </div>
      {subtitle && (
        <span style={{ fontSize: 13, color: COLORS.textSecondary }}>
          {subtitle}
        </span>
      )}
      {(trackingLabel || trackingNumber) && (
        <div style={{ display: 'flex', gap: 6, fontSize: 13 }}>
          {trackingLabel && (
            <span style={{ color: COLORS.textSecondary }}>{trackingLabel}:</span>
          )}
          {trackingNumber && (
            <span style={{ color: COLORS.textPrimary, fontWeight: 600 }}>
              {trackingNumber}
            </span>
          )}
        </div>
      )}
      {deliveryInfo && (
        <span style={{ fontSize: 13, color: COLORS.textSecondary }}>
          {deliveryInfo}
        </span>
      )}
      {(statusBadge || cost) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 4,
          }}
        >
          {statusBadge && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: 4,
                backgroundColor: '#F3F4F6',
                color: COLORS.textSecondary,
              }}
            >
              {statusBadge}
            </span>
          )}
          {cost && (
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: COLORS.textPrimary,
                marginLeft: 'auto',
              }}
            >
              {cost}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// ─── PromptLibrary ────────────────────────────────────────────────────────────

export const PromptLibrary: React.FC<PromptLibraryProps> = ({
  greeting = 'Hello! How can I help you today?',
  subtitle = 'Here are some things you can ask me:',
  prompts = [],
  onSelect,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 16px',
        fontFamily: FONT_FAMILY,
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          backgroundColor: COLORS.psBlue,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}
      >
        <PSAiIcon />
      </div>
      <h2
        style={{
          margin: '0 0 6px 0',
          fontSize: 18,
          fontWeight: 700,
          color: COLORS.textPrimary,
          textAlign: 'center',
        }}
      >
        {greeting}
      </h2>
      <p
        style={{
          margin: '0 0 20px 0',
          fontSize: 14,
          color: COLORS.textSecondary,
          textAlign: 'center',
        }}
      >
        {subtitle}
      </p>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          overflowY: 'auto',
          flex: 1,
        }}
      >
        {prompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => {
              prompt.onClick?.();
              onSelect?.(prompt);
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '12px 14px',
              border: `1px solid ${COLORS.cardBorder}`,
              borderRadius: 8,
              backgroundColor: COLORS.white,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'border-color 0.15s ease, background-color 0.15s ease',
              outline: 'none',
              width: '100%',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = COLORS.psBlue;
              e.currentTarget.style.backgroundColor = '#F0F6FF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = COLORS.cardBorder;
              e.currentTarget.style.backgroundColor = COLORS.white;
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: COLORS.psBlue,
                marginBottom: 2,
              }}
            >
              {prompt.label}
            </span>
            <span style={{ fontSize: 13, color: COLORS.textSecondary }}>
              {prompt.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

const PSAiIcon: React.FC = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M16 6C10.477 6 6 10.477 6 16s4.477 10 10 10 10-4.477 10-10S21.523 6 16 6z"
      fill="rgba(255,255,255,0.2)"
    />
    <path
      d="M12 16h8M16 12v8"
      stroke="#ffffff"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <circle cx="16" cy="16" r="3" fill="#ffffff" />
  </svg>
);

// ─── QuickActions ─────────────────────────────────────────────────────────────

export const QuickActions: React.FC<QuickActionsProps> = ({
  actions = [],
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10,
        padding: '8px 0',
      }}
    >
      {actions.slice(0, 4).map((action, idx) => (
        <button
          key={idx}
          onClick={action.onClick}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 4,
            padding: '14px 12px',
            border: `1px solid ${COLORS.cardBorder}`,
            borderRadius: 8,
            backgroundColor: COLORS.white,
            cursor: 'pointer',
            textAlign: 'left',
            fontFamily: FONT_FAMILY,
            transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
            outline: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = COLORS.psBlue;
            e.currentTarget.style.boxShadow = `0 0 0 1px ${COLORS.psBlue}20`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = COLORS.cardBorder;
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {action.icon && (
            <span
              style={{
                fontSize: 20,
                color: COLORS.psBlue,
                lineHeight: 1,
                marginBottom: 2,
              }}
            >
              {action.icon}
            </span>
          )}
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: COLORS.textPrimary,
            }}
          >
            {action.label}
          </span>
          {action.description && (
            <span style={{ fontSize: 12, color: COLORS.textSecondary }}>
              {action.description}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

// ─── ChatWindow ───────────────────────────────────────────────────────────────

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages = [],
  onSend,
  agentName = 'PartsSource AI',
  isOnline = true,
  placeholder = 'Type a message…',
  style,
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onSend?.(trimmed);
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 400,
        height: 600,
        borderRadius: 12,
        border: `1px solid ${COLORS.cardBorder}`,
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        fontFamily: FONT_FAMILY,
        backgroundColor: '#F9FAFB',
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          backgroundColor: COLORS.headerBg,
          borderBottom: `1px solid ${COLORS.cardBorder}`,
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: COLORS.textPrimary,
          }}
        >
          {agentName}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ position: 'relative' }}>
            <AgentAvatar initials="PA" size={36} />
            {isOnline && (
              <span
                style={{
                  position: 'absolute',
                  bottom: 1,
                  right: 1,
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: COLORS.online,
                  border: `2px solid ${COLORS.white}`,
                }}
                aria-label="Online"
              />
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 14px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <ChatBubble
              key={msg.id}
              message={typeof msg.content === 'string' ? msg.content : ''}
              sender={msg.sender}
              mode="full"
              timestamp={msg.timestamp}
              avatar={
                isUser ? (
                  <UserAvatar initials="U" size={32} />
                ) : (
                  <AgentAvatar initials="PA" size={32} />
                )
              }
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 12px',
          backgroundColor: COLORS.white,
          borderTop: `1px solid ${COLORS.cardBorder}`,
          flexShrink: 0,
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Chat message input"
          style={{
            flex: 1,
            height: 38,
            padding: '0 12px',
            border: `1px solid ${COLORS.inputBorder}`,
            borderRadius: 6,
            fontFamily: FONT_FAMILY,
            fontSize: 14,
            color: COLORS.textPrimary,
            outline: 'none',
            backgroundColor: COLORS.white,
            transition: 'border-color 0.15s ease',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = COLORS.psBlue;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = COLORS.inputBorder;
          }}
        />
        <button
          onClick={handleSend}
          aria-label="Send message"
          disabled={!inputValue.trim()}
          style={{
            height: 38,
            padding: '0 18px',
            backgroundColor: inputValue.trim() ? COLORS.psBlue : '#C8D0D8',
            color: COLORS.white,
            border: 'none',
            borderRadius: 4,
            fontFamily: FONT_FAMILY,
            fontSize: 14,
            fontWeight: 600,
            cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.15s ease',
            flexShrink: 0,
            outline: 'none',
          }}
          onMouseEnter={(e) => {
            if (inputValue.trim()) {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#004A84';
            }
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = inputValue.trim()
              ? COLORS.psBlue
              : '#C8D0D8';
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

// ─── Default export ───────────────────────────────────────────────────────────

export default ChatWindow;
