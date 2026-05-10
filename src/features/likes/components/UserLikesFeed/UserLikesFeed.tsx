'use client';
import React from 'react';
import { PostCard } from '../../../posts/components/PostCard';
import { PostCardSkeleton } from '../../../posts/components/PostCard/PostCardSkeleton';
import { useUserLikes } from '@/features/likes/hooks/useUserLikes';
import { Feed } from '@/components/shared/Feed/Feed';

interface UserLikesFeedProps {
  userId: string;
}

export const UserLikesFeed: React.FC<UserLikesFeedProps> = ({ userId }) => {
  const { likes, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useUserLikes(userId);
  const posts = likes.map((like) => like.post);

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
    <div className="mb-4 text-6xl">🥀</div>
    <h2 className="mb-2 text-2xl font-bold">No Likes Yet</h2>
    <p className="text-muted-foreground max-w-md">{`This user hasn't liked any posts yet`}</p>
  </div>
);
