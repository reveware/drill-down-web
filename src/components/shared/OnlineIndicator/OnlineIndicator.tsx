'use client';

import { cn } from '@/lib/utils';
import { Wifi, WifiOff } from '@/components/shared/Icons';

interface OnlineIndicatorProps {
  isOnline: boolean;
  className?: string;
}

export const OnlineIndicator = ({ isOnline, className }: OnlineIndicatorProps) => {
  const online = {
    status: 'online',
    icon: <Wifi className="text-success h-4 w-4" />,
  };
  const offline = {
    status: 'offline',
    icon: <WifiOff className="text-danger h-4 w-4" />,
  };

  const status = isOnline ? online : offline;
  return (
    <div className={cn('flex w-full flex-row items-center justify-end gap-2 p-1', className)}>
      <span className="text-muted font-mono text-xs font-extralight">{status.status}</span>
      <span>{status.icon}</span>
    </div>
  );
};
