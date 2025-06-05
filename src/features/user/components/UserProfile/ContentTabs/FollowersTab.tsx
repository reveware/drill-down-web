import { Spinner } from '@/components/shared';
import { UserList } from '@/features/user';
import { useUserFollowers } from '@/features/user/hooks/useUserFollowers';
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';
import { useRef } from 'react';
import { UserOverview } from '@/types/user';

export const FollowersTab = ({ user }: { user: UserOverview }) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useUserFollowers(
    user.id
  );

  useInfiniteScrollObserver({
    ref: loadMoreRef,
    onLoadMore: fetchNextPage,
    enabled: !!hasNextPage,
  });

  const users = data?.pages.flat() ?? [];

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <UserList title="Followers" user={user} users={users} />
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
