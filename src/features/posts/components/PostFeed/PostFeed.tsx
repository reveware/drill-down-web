'use client';
import React from 'react';
import { PostCard } from '../PostCard';
import { PostCardSkeleton } from '../PostCard/PostCardSkeleton';
import { useFeedPosts } from '@/features/posts/hooks/useFeedPosts';
import { Feed } from '@/components/shared/Feed/Feed';

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
      renderEmptyState={() => <EmptyState />}
    />
  );
};

const EmptyState = () => (
  <div className="flex min-h-4/5 flex-col items-center justify-center p-8 text-center">
    <div className="mb-4 text-6xl">🍃</div>
    <h2 className="mb-2 text-2xl font-bold">No posts found</h2>
    <p className="text-muted-foreground max-w-md">There are no posts to display at the moment.</p>
  </div>
);
