import { cn } from '@/lib/utils';

interface EmptyStateProps {
  emoji: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState = ({ emoji, title, subtitle, action, className }: EmptyStateProps) => {
  return (
    <div
      className={cn(
        'flex h-full w-full flex-col items-center justify-center p-8 text-center',
        className
      )}
    >
      <div className="mb-4 text-4xl" aria-hidden="true">
        {emoji}
      </div>
      <h2 className="text-title font-semibold">{title}</h2>
      {subtitle && <p className="text-muted-foreground mt-2 max-w-md">{subtitle}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};
