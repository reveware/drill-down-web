'use client';
import React from 'react';
import { PostCard } from '../PostCard';
import { PostCardSkeleton } from '../PostCard/PostCardSkeleton';
import { useSearchPosts } from '@/features/posts/hooks/useSearchPosts';
import { Feed } from '@/components/shared/Feed/Feed';

interface UserPostsFeedProps {
  authorId: string;
}

export const UserPostsFeed: React.FC<UserPostsFeedProps> = ({ authorId }) => {
  const { posts, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useSearchPosts({
    authorId,
  });

  return (
    <Feed
      items={posts}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      renderItem={(post) => <PostCard key={post.id} post={post} />}
      renderSkeleton={() => <PostCardSkeleton />}
      renderEmptyState={() => <EmptyState />}
    />
  );
};

const EmptyState = () => (
  <div className="flex min-h-4/5 flex-col items-center justify-center p-8 text-center">
    <div className="mb-4 text-6xl">🍃</div>
    <h2 className="mb-2 text-2xl font-bold">No posts found</h2>
    <p className="text-muted-foreground max-w-md">{`This user hasn't posted anything yet.`}</p>
  </div>
);
