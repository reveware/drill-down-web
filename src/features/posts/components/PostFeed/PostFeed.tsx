'use client';
import React from 'react';
import { PostCard } from '../PostCard';
import { PostCardSkeleton } from '../PostCard/PostCardSkeleton';
import { PostOverview } from '@/types/post';
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
  console.log('posts', posts);

  return (
    <div className="w-full flex flex-col items-center gap-6 p-4">
      {isLoading && <LoadingState count={3} />}

      {!isLoading && posts.map((post) => <PostCard key={post.id} post={post} />)}

      <div ref={loaderRef} className="w-full flex justify-center">
        {isFetchingNextPage && <PostCardSkeleton />}
      </div>
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
