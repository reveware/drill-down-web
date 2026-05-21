'use client';
import React from 'react';
import { PostCard } from '../../../posts/components/PostCard';
import { PostCardSkeleton } from '../../../posts/components/PostCard/PostCardSkeleton';
import { useUserLikes } from '@/features/likes/hooks/useUserLikes';
import { Feed } from '@/components/shared/Feed/Feed';
import { EmptyState } from '@/components/shared';

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
      renderEmptyState={() => (
        <EmptyState
          emoji="🥀"
          title="No Likes Yet"
          subtitle="This user hasn't liked any posts yet"
        />
      )}
    />
  );
};
