import { Skeleton } from '@/components/ui/skeleton';

export const PostSkeleton = () => {
  return (
    <div className="p-4 space-y-3 border rounded-lg">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-16 h-3" />
        </div>
      </div>
      <Skeleton className="w-full h-48 rounded-lg" />
      <Skeleton className="w-32 h-4" />
    </div>
  );
};
