import { Skeleton } from '@/components/ui/skeleton';
export const PostSkeleton = () => {
  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center gap-3 px-2 py-2">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="w-32 h-4 rounded-md" />
          <Skeleton className="w-20 h-3 rounded-md" />
        </div>
      </div>

      {/* Content Block */}
      <div className="w-full aspect-[4/3] overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Footer bar */}
      <div className="flex gap-3 px-2 py-3">
        <Skeleton className="w-16 h-4 rounded-md" />
        <Skeleton className="w-16 h-4 rounded-md" />
      </div>
    </div>
  );
};
