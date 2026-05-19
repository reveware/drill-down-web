'use client';

import { UserAvatar } from '@/components/shared/UserAvatar/UserAvatar';
import { Badge } from '@/components/ui/badge';
import { cn, getInitials } from '@/lib/utils';
import { Conversation, MessagePart } from '@/types/chat';
import { useIsActorSelf } from '../../hooks/useIsActorSelf';

interface ConversationListItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

const getMessagePreview = (parts: MessagePart[]): string => {
  const text = parts.find((p) => p.type === 'text')?.text;
  if (text) return text;
  if (parts.some((p) => p.type === 'image')) return '📷 Image';
  if (parts.some((p) => p.type === 'audio')) return '🎵 Audio';
  if (parts.some((p) => p.type === 'post_ref')) return '📌 Post';
  return '';
};

export const ConversationListItem = ({
  conversation,
  isActive,
  onClick,
}: ConversationListItemProps) => {
  const isSelf = useIsActorSelf();
  const counterpart = conversation.participants.find((p) => !isSelf(p));

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors',
        'hover:bg-accent/50',
        isActive && 'bg-accent'
      )}
    >
      <UserAvatar
        src={counterpart?.avatar}
        initials={getInitials([conversation.title])}
        alt={conversation.title}
        className="h-12 w-12 flex-shrink-0"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="min-w-0 flex-1 truncate font-medium">{conversation.title}</h3>
          {conversation.last_message && (
            <span className="text-muted-foreground flex-shrink-0 text-xs">
              {new Date(conversation.last_message.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-2">
          <p className="text-muted-foreground min-w-0 flex-1 truncate text-sm">
            {conversation.last_message
              ? getMessagePreview(conversation.last_message.content)
              : 'No messages'}
          </p>
          {conversation.unread_count > 0 && (
            <Badge
              variant="default"
              className="flex h-5 min-w-5 flex-shrink-0 items-center justify-center px-1.5 text-[10px] leading-none"
            >
              {conversation.unread_count}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};
