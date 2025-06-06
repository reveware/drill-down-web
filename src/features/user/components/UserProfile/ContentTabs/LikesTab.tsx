import { useUserLikes } from '@/features/user/hooks/useUserLikes';
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';
import { useRef } from 'react';
import { UserOverview } from '@/types/user';
import { PostFeed } from '@/features/posts/components/PostFeed/PostFeed';

export const LikesTab = ({ user }: { user: UserOverview }) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useUserLikes(user.id);

  useInfiniteScrollObserver({
    ref: loadMoreRef,
    onLoadMore: fetchNextPage,
    enabled: !!hasNextPage && !isLoading,
  });

  const likes = data?.pages.flat() ?? [];

  return (
    <div className="flex h-full w-full justify-center overflow-y-auto">
      <PostFeed
        posts={likes.map((like) => like.post)}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        loaderRef={loadMoreRef}
      />
    </div>
  );
};
