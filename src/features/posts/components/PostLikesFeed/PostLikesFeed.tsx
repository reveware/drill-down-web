'use client';
import React, { useRef } from 'react';
import { PostCard } from '../PostCard';
import { PostCardSkeleton } from '../PostCard/PostCardSkeleton';
import { useUserLikes } from '@/features/user/hooks/useUserLikes';
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';
import Image from 'next/image';
import { Lost } from '@/assets/images';

interface PostLikesFeedProps {
  userId: string;
}

export const PostLikesFeed: React.FC<PostLikesFeedProps> = ({ userId }) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { likes, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useUserLikes(userId);

  useInfiniteScrollObserver({
    ref: loadMoreRef,
    onLoadMore: fetchNextPage,
    enabled: !!hasNextPage && !isLoading,
  });

  const posts = likes.map((like) => like.post);

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
    <Image src={Lost} alt="No liked posts found" className="mb-4 h-32 w-32" />
    <h3 className="mb-2 text-lg font-semibold">No liked posts</h3>
    <p className="text-muted-foreground">{`This user hasn't liked any posts yet.`}</p>
  </div>
);
