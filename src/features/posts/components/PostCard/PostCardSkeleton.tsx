import { Skeleton } from '@/components/ui/skeleton';

export const PostCardSkeleton = () => {
  return (
    <div className="card w-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-2 py-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-32 rounded-md" />
          <Skeleton className="h-3 w-20 rounded-md" />
        </div>
      </div>

      {/* Content Block */}
      <div className="aspect-[4/3] w-full overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Footer bar */}
      <div className="flex justify-center gap-3 px-2 py-3">
        <Skeleton className="h-4 w-16 rounded-md" />
        <Skeleton className="h-4 w-16 rounded-md" />
      </div>
    </div>
  );
};
