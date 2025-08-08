import { Card } from '@/components/ui/card';

import { Skeleton } from '@/components/ui/skeleton';

export const UserItemSkeleton = () => (
  <Card className="card max-w-md">
    <div className="flex flex-col items-center gap-2 p-4 md:flex-row">
      {/* Avatar Section */}
      <div className="flex w-full items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex flex-1 flex-col gap-1">
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-3 w-32 rounded-md" />
        </div>
      </div>

      {/* Button Section */}
      <div className="w-full md:w-auto">
        <Skeleton className="h-8 w-full rounded-md md:w-24" />
      </div>
    </div>
  </Card>
);
