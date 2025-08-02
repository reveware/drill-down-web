'use client';
import React, { useRef } from 'react';
import { PostCard } from '../PostCard';
import { PostCardSkeleton } from '../PostCard/PostCardSkeleton';
import { useFeedPosts } from '@/features/posts/hooks/useFeedPosts';
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';

export const PostFeed: React.FC = () => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { posts, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useFeedPosts();

  useInfiniteScrollObserver({
    ref: loadMoreRef,
    onLoadMore: fetchNextPage,
    enabled: !!hasNextPage && !isLoading,
  });

  if (posts.length === 0 && !isLoading) {
    return <EmptyState />;
  }

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-4 px-2 py-4">
      {isLoading && <LoadingState count={3} />}

      {!isLoading && posts.map((post) => <PostCard key={post.id} post={post} />)}

      <div ref={loadMoreRef} className="flex w-full justify-center">
        {isFetchingNextPage && <PostCardSkeleton />}
      </div>
    </div>
  );
};

const LoadingState = ({ count }: { count: number }) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <PostCardSkeleton key={index} />
    ))}
  </>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <h3 className="mb-2 text-lg font-semibold">No posts found</h3>
    <p className="text-muted-foreground">There are no posts to display at the moment.</p>
  </div>
);
