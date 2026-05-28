import React, { useState } from 'react';

interface Message {
  id: string | number;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

interface AiAgentProps {
  messages?: Message[];
  onSend?: (message: string) => void;
  placeholder?: string;
  agentName?: string;
  agentAvatar?: string;
  isLoading?: boolean;
  className?: string;
}

const AiAgent: React.FC<AiAgentProps> = ({
  messages = [],
  onSend,
  placeholder = 'Ask a question...',
  agentName = 'AI Assistant',
  isLoading = false,
  className = '',
}) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    onSend?.(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div className={`flex flex-col bg-white border border-[#DCDCDC] rounded-[8px] shadow-[0_1px_4px_rgba(0,47,72,0.08)] overflow-hidden ${className}`}>
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#DCDCDC] bg-[#FAFAFA]">
        <div className="w-[32px] h-[32px] rounded-full bg-[#005BA6] flex items-center justify-center text-white text-[14px] font-bold select-none">
          AI
        </div>
        <span className="text-[14px] font-semibold text-[#4A4A4A]">{agentName}</span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[12px] text-[#0E7C55]">
          <span className="w-[6px] h-[6px] rounded-full bg-[#17AB78]" />
          Active
        </span>
      </div>

      <div className="flex-1 overflow-auto p-4 flex flex-col gap-3 min-h-[200px]">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-[14px] text-[#949494]">
            Start a conversation...
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-[28px] h-[28px] rounded-full bg-[#005BA6] flex-shrink-0 flex items-center justify-center text-white text-[11px] font-bold">AI</div>
              )}
              <div className={`max-w-[80%] px-3 py-2 rounded-[8px] text-[14px] ${msg.role === 'user' ? 'bg-[#005BA6] text-white rounded-tr-[2px]' : 'bg-[#F1F1F1] text-[#4A4A4A] rounded-tl-[2px]'}`}>
                {msg.content}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex gap-2 justify-start">
            <div className="w-[28px] h-[28px] rounded-full bg-[#005BA6] flex-shrink-0 flex items-center justify-center text-white text-[11px] font-bold">AI</div>
            <div className="bg-[#F1F1F1] rounded-[8px] rounded-tl-[2px] px-3 py-2 flex items-center gap-1">
              {[0,1,2].map(i => (
                <span key={i} className="w-[6px] h-[6px] rounded-full bg-[#949494] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="px-4 py-3 border-t border-[#DCDCDC]">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            className="flex-1 resize-none border border-[#DCDCDC] rounded-[4px] px-3 py-2 text-[14px] text-[#4A4A4A] placeholder-[#949494] focus:outline-none focus:border-[#005BA6] focus:shadow-[0_0_0_3px_rgba(0,147,244,0.3)] transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            aria-label="Send message"
            className="flex-shrink-0 h-[36px] px-4 bg-[#005BA6] text-white text-[14px] font-semibold rounded-[4px] hover:bg-[#004A84] disabled:bg-[#DCDCDC] disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiAgent;
