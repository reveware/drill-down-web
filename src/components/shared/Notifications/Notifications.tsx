'use client';
import { Bell } from '@/components/shared/Icons';
import { usePendingFollowRequests } from '@/features/follow/hooks/usePendingFollowRequests';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface NotificationsProps {
  className?: string;
  size?: number;
}

export const Notifications = ({ className, size = 24 }: NotificationsProps) => {
  const { pendingRequests } = usePendingFollowRequests();
  const pendingCount = pendingRequests?.length || 0;

  return (
    <Link
      href="/notifications"
      className={cn(
        'hover:bg-muted relative flex items-center justify-center rounded-md transition-colors',
        className
      )}
      aria-label={`Notifications (${pendingCount} pending)`}
    >
      <Bell size={size} />
      {pendingCount > 0 && (
        <span className="bg-accent text-accent-foreground absolute -top-1 -right-1 flex h-5 w-5 min-w-[20px] items-center justify-center rounded-full text-xs font-bold">
          {pendingCount > 99 ? '99+' : pendingCount}
        </span>
      )}
    </Link>
  );
};
