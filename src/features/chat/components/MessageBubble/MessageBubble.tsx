'use client';

import { WireMessage, MessagePart } from '@/types/chat';
import { cn, formatTimestamp, copyToClipboard } from '@/lib/utils';
import { useLongPress } from '@/hooks/useLongPress';
import { Check, CheckCheck, Clock, XCircle } from '@/components/shared/Icons';
import { toast } from '@/lib/toast';

interface MessageBubbleProps {
  message: WireMessage;
  isOwn: boolean;
  displayStatus?: WireMessage['status'];
  showTimestamp?: boolean;
  className?: string;
}

const RenderContent = ({ parts }: { parts: MessagePart[] }) => (
  <>
    {parts.map((part, i) => {
      if (part.type === 'text') return <span key={i}>{part.text}</span>;
      if (part.type === 'image')
        return (
          <span key={i} className="text-xs italic">
            [Image]
          </span>
        );
      if (part.type === 'audio')
        return (
          <span key={i} className="text-xs italic">
            [Audio]
          </span>
        );
      if (part.type === 'post_ref')
        return (
          <span key={i} className="text-xs italic">
            [Post]
          </span>
        );
      return null;
    })}
  </>
);

const ErrorCallout = ({ text }: { text: string }) => (
  <div className="mx-auto max-w-[85%] py-1">
    <div className="bg-destructive/5 text-destructive border-destructive/30 border-l-2 px-4 py-2 text-sm">
      {text}
    </div>
  </div>
);

const StatusIcon = ({ status }: { status: WireMessage['status'] }) => {
  switch (status) {
    case 'sending':
      return <Clock className="text-muted-foreground h-3 w-3 animate-pulse" />;
    case 'sent':
      return <Check className="text-muted-foreground h-3 w-3" />;
    case 'read':
      return <CheckCheck className="h-3 w-3 text-blue-500" />;
    case 'failed':
      return <XCircle className="text-destructive h-3 w-3" />;
    default:
      return null;
  }
};

export const MessageBubble = ({
  message,
  isOwn,
  displayStatus,
  showTimestamp = true,
  className,
}: MessageBubbleProps) => {
  const effectiveStatus = displayStatus ?? message.status;

  const textContent = message.content
    .filter((p) => p.type === 'text')
    .map((p) => p.text)
    .join('');

  const longPressHandlers = useLongPress({
    onLongPressed: async () => {
      if (!textContent) return;
      const ok = await copyToClipboard(textContent);
      if (ok) toast.success('Copied to clipboard');
    },
  });

  if (!isOwn && effectiveStatus === 'failed') {
    return <ErrorCallout text={message.content[0]?.text ?? 'Something went wrong.'} />;
  }

  return (
    <div
      className={cn(
        'flex max-w-[85%] gap-3',
        isOwn ? 'ml-auto flex-row-reverse' : 'mr-auto',
        className
      )}
    >
      <div className={cn('flex flex-col gap-1', isOwn ? 'items-end' : 'items-start')}>
        <div
          {...longPressHandlers}
          className={cn(
            'max-w-full rounded-2xl px-4 py-2 text-sm break-words',
            'group relative',
            isOwn
              ? 'bg-accent text-on-accent rounded-br-md'
              : 'bg-secondary text-on-primary rounded-bl-md'
          )}
        >
          <RenderContent parts={message.content} />
        </div>

        {showTimestamp && (
          <div
            className={cn(
              'text-muted-foreground flex items-center gap-1 text-xs',
              isOwn ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            <span>{formatTimestamp(message.timestamp)}</span>
            {isOwn && <StatusIcon status={effectiveStatus} />}
          </div>
        )}
      </div>
    </div>
  );
};
