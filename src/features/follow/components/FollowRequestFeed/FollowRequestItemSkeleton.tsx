import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const FollowRequestItemSkeleton = () => {
  return (
    <Card className="card max-w-md border-1">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-8 flex-1" />
          <Skeleton className="h-8 flex-1" />
        </div>
      </div>
    </Card>
  );
};
