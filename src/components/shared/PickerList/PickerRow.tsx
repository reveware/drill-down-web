'use client';

import { cn, getInitials } from '@/lib/utils';
import { UserAvatar } from '@/components/shared/UserAvatar/UserAvatar';

interface PickerRowProps {
  avatar?: string | null;
  title: string;
  subtitle: string;
  onClick: () => void;
}

export const PickerRow = ({ avatar, title, subtitle, onClick }: PickerRowProps) => (
  <li>
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors',
        'hover:bg-accent/50'
      )}
    >
      <UserAvatar
        src={avatar}
        initials={getInitials([title])}
        alt={title}
        className="flex-shrink-0"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{title}</p>
        <p className="text-muted-foreground/70 truncate text-xs">{subtitle}</p>
      </div>
    </button>
  </li>
);
