'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash } from '@/components/shared/Icons';
import { UserAvatar } from '@/components/shared/UserAvatar/UserAvatar';
import { getInitials } from '@/lib/utils';

interface ChatHeaderProps {
  title: string;
  avatar?: string | null;
  subtitle?: string;

  onBack?: () => void;
  onDelete?: () => void;
}

export const ChatHeader = ({ title, avatar, subtitle, onBack, onDelete }: ChatHeaderProps) =>
  title ? (
    <div className="flex h-[4.5rem] items-center gap-3 border-b px-4">
      {onBack && (
        <Button
          variant="ghost"
          size="icon"
          aria-label="Back to conversations"
          onClick={onBack}
          className="h-8 w-8 flex-shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      )}

      <UserAvatar src={avatar} initials={getInitials([title])} alt={title} />

      <div className="min-w-0 flex-1">
        <h2 className="truncate font-semibold">{title}</h2>
        {subtitle && <p className="text-muted-foreground truncate text-sm">{subtitle}</p>}
      </div>

      {onDelete && (
        <Button
          variant="ghost"
          size="icon"
          aria-label="Delete conversation"
          onClick={onDelete}
          className="text-muted-foreground hover:text-destructive h-8 w-8 flex-shrink-0"
        >
          <Trash className="h-4 w-4" />
        </Button>
      )}
    </div>
  ) : (
    <ChatHeaderSkeleton />
  );

const ChatHeaderSkeleton = () => (
  <div className="flex h-[4.5rem] items-center gap-3 border-b px-4">
    <div className="bg-muted h-10 w-10 animate-pulse rounded-full" />
    <div className="flex-1 space-y-2">
      <div className="bg-muted h-3 w-32 animate-pulse rounded" />
      <div className="bg-muted h-3 w-20 animate-pulse rounded" />
    </div>
  </div>
);
