import { Spinner } from '@/components/shared';
import { useUserLikes } from '@/features/user/hooks/useUserLikes';
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';
import { useRef } from 'react';
import { LikeFeed } from '../../LikeFeed';
import { UserOverview } from '@/types/user';

export const LikesTab = ({ user }: { user: UserOverview }) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useUserLikes(user.id);

  useInfiniteScrollObserver({
    ref: loadMoreRef,
    onLoadMore: fetchNextPage,
    enabled: !!hasNextPage,
  });

  const likes = data?.pages.flat() ?? [];

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto">
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Spinner />
        </div>
      ) : (
        <>
          <LikeFeed likes={likes} user={user} />
          {hasNextPage && (
            <div ref={loadMoreRef} className="h-6 text-center">
              {isFetchingNextPage ? 'Loading more...' : 'Scroll to load more'}
            </div>
          )}
        </>
      )}
    </div>
  );
};
