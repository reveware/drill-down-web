'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface PickerRowProps {
  avatar?: string;
  avatarAlt: string;
  avatarFallback: string;
  title: string;
  subtitle: string;
  onClick: () => void;
}

export const PickerRow = ({
  avatar,
  avatarAlt,
  avatarFallback,
  title,
  subtitle,
  onClick,
}: PickerRowProps) => (
  <li>
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors',
        'hover:bg-accent/50'
      )}
    >
      <Avatar className="h-10 w-10 flex-shrink-0">
        <AvatarImage src={avatar} alt={avatarAlt} />
        <AvatarFallback className="from-accent/90 to-primary/90 bg-gradient-to-r text-white">
          {avatarFallback.toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{title}</p>
        <p className="text-muted-foreground/70 truncate text-xs">{subtitle}</p>
      </div>
    </button>
  </li>
);
