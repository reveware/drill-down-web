import React, { useRef } from 'react';

import { PostCard } from '../PostCard';
import { PostCardSkeleton } from '../PostCard/PostCardSkeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useFeedPosts } from './useFeedPosts';
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';
import { PostOverview } from '@/types/post';

export const PostFeed = () => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useFeedPosts();

  useInfiniteScrollObserver({
    ref: loaderRef,
    onLoadMore: fetchNextPage,
    enabled: !!hasNextPage,
  });

  const posts = data?.pages.flat() || [];

  return (
    <ScrollArea className="h-full w-full">
      <div className="min-h-full flex flex-col items-center gap-6">
        {isLoading && <LoadingState count={3} />}
        {!isLoading && posts.map((post: PostOverview) => <PostCard key={post.id} post={post} />)}
        {hasNextPage && (
          <div className="w-full flex justify-center" ref={loaderRef}>
            {isFetchingNextPage && <PostCardSkeleton />}
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

const LoadingState = ({ count = 3 }: { count?: number }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <PostCardSkeleton key={i} />
    ))}
  </>
);
