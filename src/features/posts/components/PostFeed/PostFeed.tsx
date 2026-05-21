'use client';
import React from 'react';
import { PostCard } from '../PostCard';
import { PostCardSkeleton } from '../PostCard/PostCardSkeleton';
import { useFeedPosts } from '@/features/posts/hooks/useFeedPosts';
import { Feed } from '@/components/shared/Feed/Feed';
import { EmptyState } from '@/components/shared';

export const PostFeed: React.FC = () => {
  const { posts, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useFeedPosts();

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
          subtitle="There are no posts to display at the moment."
        />
      )}
    />
  );
};
