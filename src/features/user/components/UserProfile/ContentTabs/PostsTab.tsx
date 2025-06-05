import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';
import { useRef } from 'react';
import { UserOverview } from '@/types/user';
import { useSearchPosts } from '@/features/posts/hooks/useSearchPosts';
import { PostFeed } from '@/features/posts/components/PostFeed/PostFeed';

export const PostsTab = ({ user }: { user: UserOverview }) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useSearchPosts({
    author: user.username,
  });

  useInfiniteScrollObserver({
    ref: loadMoreRef,
    onLoadMore: fetchNextPage,
    enabled: !!hasNextPage,
  });

  const posts = data?.pages.flat() ?? [];

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto">
      <PostFeed
        posts={posts}
        isLoading={isLoading}
        loaderRef={loadMoreRef}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
};
