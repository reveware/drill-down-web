'use client';
import React from 'react';
import { PostCard } from '../PostCard';
import { PostCardSkeleton } from '../PostCard/PostCardSkeleton';
import { PostOverview } from '@/types/post';
import Image from 'next/image';
import { Lost } from '@/assets/images';

interface PostFeedProps {
  posts: PostOverview[];
  isLoading: boolean;
  loaderRef: React.RefObject<HTMLDivElement | null>;
  isFetchingNextPage: boolean;
}

export const PostFeed: React.FC<PostFeedProps> = ({
  posts,
  isLoading,
  loaderRef,
  isFetchingNextPage,
}) => {
  if (posts.length === 0) {
    return <EmptyState />;
  }
  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-4 px-2 py-4">
      {isLoading && <LoadingState count={3} />}

      {!isLoading && posts.map((post) => <PostCard key={post.id} post={post} />)}

      <div ref={loaderRef} className="flex w-full justify-center">
        {isFetchingNextPage && <PostCardSkeleton />}
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div className="relative flex h-full w-full max-w-lg flex-col items-center gap-4 px-2 py-4">
    <p className="tex-title font-title font- absolute top-2/4 left-1/2 z-10 mx-2 -translate-x-1/2 -translate-y-1/2 text-center text-6xl tracking-widest text-white opacity-60">
      Nothing to see here.
    </p>
    <Image src={Lost} alt="Lost" className="h-full w-full rounded-lg object-cover opacity-90" />
  </div>
);

const LoadingState: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <PostCardSkeleton key={i} />
    ))}
  </>
);
