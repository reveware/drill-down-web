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
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <h3 className="mb-2 text-lg font-semibold">No posts found</h3>
    <p className="text-muted-foreground">{`This user hasn't posted anything yet.`}</p>
  </div>
);
