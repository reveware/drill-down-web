'use client';

import { useEffect, useRef, useState } from 'react';
import { WireMessage, Participant } from '@/types/chat';
import { MessageBubble } from '../MessageBubble/MessageBubble';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { differenceInMinutes } from 'date-fns';

interface ChatHistoryProps {
  messages: WireMessage[];
  participants: Participant[];
  currentUserId: string;
  typingUsers?: string[];
  isLoading?: boolean;
  className?: string;
}

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="mr-auto flex max-w-[85%] gap-3"
  >
    <div className="bg-secondary text-on-primary rounded-2xl rounded-bl-md px-4 py-2">
      <div className="flex items-center gap-1">
        {[0, 0.2, 0.4].map((delay) => (
          <motion.div
            key={delay}
            className="bg-on-primary h-2 w-2 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay }}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

export const ChatHistory = ({
  messages,
  participants,
  currentUserId,
  typingUsers = [],
  isLoading = false,
  className,
}: ChatHistoryProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isNearBottom, setIsNearBottom] = useState(true);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (isNearBottom) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    }
  }, [messages, typingUsers, isNearBottom]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setIsNearBottom(distanceFromBottom < 100);
  };

  const shouldShowTimestamp = (message: WireMessage, index: number) => {
    const prevMessage = messages[index - 1];
    if (!prevMessage) return true;
    return (
      differenceInMinutes(new Date(message.timestamp), new Date(prevMessage.timestamp)) >= 5 ||
      prevMessage.sender.actor_id !== message.sender.actor_id
    );
  };

  // Derive read status from the watermark. For own messages, compare seq
  // against the counterpart's last_read_seq.
  const counterpart = participants.find((p) => p.id !== currentUserId);
  const counterpartReadSeq = counterpart?.last_read_seq;

  const getDisplayStatus = (message: WireMessage): WireMessage['status'] => {
    if (message.status === 'sending' || message.status === 'failed') return message.status;
    if (message.seq && counterpartReadSeq && BigInt(message.seq) <= BigInt(counterpartReadSeq)) {
      return 'read';
    }
    return message.status;
  };

  const typingNames = typingUsers
    .filter((id) => id !== currentUserId)
    .map((id) => {
      const participant = participants.find((p) => p.id === id);
      return participant?.name ?? id;
    });

  if (isLoading) {
    return (
      <div className={cn('flex h-full items-center justify-center', className)}>
        <div className="border-accent h-6 w-6 animate-spin rounded-full border-2 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className={cn('relative h-full', className)}>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="absolute inset-0 overflow-y-auto px-4"
      >
        <div className="flex flex-col gap-4 py-4">
          {messages.length === 0 ? (
            <div className="text-muted-foreground flex h-32 items-center justify-center">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <MessageBubble
                  message={message}
                  isOwn={message.sender.actor_id === currentUserId}
                  displayStatus={
                    message.sender.actor_id === currentUserId
                      ? getDisplayStatus(message)
                      : undefined
                  }
                  showTimestamp={shouldShowTimestamp(message, index)}
                />
              </motion.div>
            ))
          )}

          <AnimatePresence>{typingNames.length > 0 && <TypingIndicator />}</AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {!isNearBottom && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() =>
              scrollRef.current?.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth',
              })
            }
            className="bg-primary text-primary-foreground hover:bg-primary/90 absolute right-6 bottom-4 rounded-full p-2 shadow-lg transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
