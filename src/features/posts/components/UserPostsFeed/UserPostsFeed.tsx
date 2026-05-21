'use client';
import React from 'react';
import { PostCard } from '../PostCard';
import { PostCardSkeleton } from '../PostCard/PostCardSkeleton';
import { useSearchPosts } from '@/features/posts/hooks/useSearchPosts';
import { Feed } from '@/components/shared/Feed/Feed';
import { EmptyState } from '@/components/shared';

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
      renderEmptyState={() => (
        <EmptyState
          emoji="🍃"
          title="No posts found"
          subtitle="This user hasn't posted anything yet."
        />
      )}
    />
  );
};
