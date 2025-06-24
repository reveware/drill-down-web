import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface CommentSkeletonProps {
  depth?: number;
}

export const CommentSkeleton = ({ depth = 0 }: CommentSkeletonProps) => {
  return (
    <div className={cn('space-y-2', depth > 0 && 'border-border ml-6 border-l pl-4')}>
      <div className="flex items-start gap-3">
        <Skeleton className="h-8 w-8 rounded-full" />

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>

          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="mb-2 h-4 w-3/4" />

          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
};
