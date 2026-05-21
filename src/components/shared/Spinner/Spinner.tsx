import { cn } from '@/lib/utils';

interface SpinnerProps {
  className?: string;
}

export const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn('flex h-full w-full items-center justify-center py-12', className)}
    >
      <div className="border-primary/25 border-t-primary h-10 w-10 animate-spin rounded-full border-4" />
      <span className="sr-only">Loading…</span>
    </div>
  );
};
