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
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <h3 className="mb-2 text-lg font-semibold">No posts found</h3>
    <p className="text-muted-foreground">There are no posts to display at the moment.</p>
  </div>
);
