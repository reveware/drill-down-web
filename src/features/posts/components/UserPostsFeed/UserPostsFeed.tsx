'use client';
import React, { useRef } from 'react';
import { PostCard } from '../PostCard';
import { PostCardSkeleton } from '../PostCard/PostCardSkeleton';
import { useSearchPosts } from '@/features/posts/hooks/useSearchPosts';
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';

interface UserPostsFeedProps {
  authorId: string;
}

export const UserPostsFeed: React.FC<UserPostsFeedProps> = ({ authorId }) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { posts, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useSearchPosts({
    authorId,
  });

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
    <p className="text-muted-foreground">{`This user hasn't posted anything yet.`}</p>
  </div>
);
