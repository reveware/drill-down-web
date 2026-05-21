'use client';

import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Smile } from '@/components/shared/Icons';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onTypingStart?: () => void;
  onTypingStop?: () => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export const ChatInput = ({
  onSendMessage,
  onTypingStart,
  onTypingStop,
  disabled = false,
  placeholder = 'Send message...',
  className,
}: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = useCallback(() => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || disabled) return;

    onSendMessage(trimmedMessage);
    onTypingStop?.();
    setMessage('');
    textareaRef.current?.focus();
  }, [message, disabled, onSendMessage, onTypingStop]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, []);

  return (
    <div className={cn('bg-background flex items-end gap-2 border-t p-4', className)}>
      <div className="relative flex-1">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            adjustTextareaHeight();
            if (e.target.value.trim()) onTypingStart?.();
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'max-h-[120px] min-h-[40px] resize-none pr-12',
            'rounded-2xl',
            'focus:ring-primary focus:border-primary focus:ring-1'
          )}
          rows={1}
        />

        <Button
          variant="ghost"
          size="icon"
          disabled={disabled}
          className="absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2 rounded-full"
        >
          <Smile className="h-4 w-4" />
        </Button>
      </div>

      <Button
        onClick={handleSendMessage}
        disabled={disabled || !message.trim()}
        size="icon"
        className={cn(
          'h-10 w-10 flex-shrink-0 rounded-full',
          'transition-all duration-200',
          disabled || !message.trim()
            ? 'bg-muted text-muted-foreground scale-95'
            : 'bg-primary hover:bg-primary/90 scale-100'
        )}
      >
        <Send className="h-5 w-5" />
      </Button>
    </div>
  );
};
