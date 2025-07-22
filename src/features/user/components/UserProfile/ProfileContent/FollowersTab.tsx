import { UserList } from '@/features/user';
import { useUserFollowers } from '@/features/follow/hooks/useUserFollowers';
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';
import { useRef } from 'react';
import { UserOverview } from '@/types/user';

export const FollowersTab = ({ user }: { user: UserOverview }) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { followers, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useUserFollowers(
    user.id
  );

  useInfiniteScrollObserver({
    ref: loadMoreRef,
    onLoadMore: fetchNextPage,
    enabled: !!hasNextPage && !isLoading,
  });

  return (
    <div className="flex h-full w-full justify-center space-y-4 overflow-y-auto">
      <UserList
        users={followers}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        loaderRef={loadMoreRef}
      />
    </div>
  );
};
