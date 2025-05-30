'use client';
import React, { useRef } from 'react';
import { PostCard } from '../PostCard';
import { PostCardSkeleton } from '../PostCard/PostCardSkeleton';
import { useFeedPosts } from '../../hooks/useFeedPosts';
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';
import { PostOverview } from '@/types/post';

export const PostFeed: React.FC = () => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useFeedPosts();

  useInfiniteScrollObserver({
    ref: loaderRef,
    onLoadMore: fetchNextPage,
    enabled: !!hasNextPage,
  });

  const posts: PostOverview[] = data?.pages.flat() ?? [];

  return (
    <div className="w-full flex flex-col items-center gap-6 p-4">
      {isLoading && <LoadingState count={3} />}

      {!isLoading && posts.map((post) => <PostCard key={post.id} post={post} />)}

      {hasNextPage && (
        <div ref={loaderRef} className="w-full flex justify-center">
          {isFetchingNextPage && <PostCardSkeleton />}
        </div>
      )}
    </div>
  );
};

const LoadingState: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <PostCardSkeleton key={i} />
    ))}
  </>
);
