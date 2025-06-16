import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';
import { useRef } from 'react';
import { UserOverview } from '@/types/user';
import { useSearchPosts } from '@/features/posts/hooks/useSearchPosts';
import { PostFeed } from '@/features/posts/components/PostFeed/PostFeed';

export const PostsTab = ({ user }: { user: UserOverview }) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { posts, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useSearchPosts({
    authorId: user.id,
  });

  useInfiniteScrollObserver({
    ref: loadMoreRef,
    onLoadMore: fetchNextPage,
    enabled: !!hasNextPage,
  });

  return (
    <div className="flex h-full w-full justify-center overflow-y-auto">
      <PostFeed
        posts={posts}
        isLoading={isLoading}
        loaderRef={loadMoreRef}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
};
