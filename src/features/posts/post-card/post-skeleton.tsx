import { Skeleton } from '@/components/ui/skeleton';
export const PostSkeleton = () => {
  return (
    <div className="card space-y-3">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-20 h-3" />
        </div>
      </div>

      {/* Content Block */}
      <div className="w-full aspect-[4/3] rounded-md overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Footer bar */}
      <div className="flex gap-4">
        <Skeleton className="w-16 h-4" />
        <Skeleton className="w-16 h-4" />
      </div>
    </div>
  );
};
