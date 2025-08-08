'use client';
import React from 'react';
import { usePostLikes } from '@/features/likes/hooks/usePostLikes';
import { Feed } from '@/components/shared/Feed/Feed';
import { UserItem } from '@/features/user/components/UserItem/UserItem';
import { UserItemSkeleton } from '@/features/user/components/UserItem/UserItemSkeleton';

interface PostLikesFeedProps {
  postId: string;
}

export const PostLikesFeed: React.FC<PostLikesFeedProps> = ({ postId }) => {
  const { likes, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = usePostLikes(postId);

  const users = likes.map((l) => l.author);

  return (
    <Feed
      items={users}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      renderItem={(user) => <UserItem key={user.id} user={user} />}
      renderSkeleton={() => <UserItemSkeleton />}
      renderEmptyState={() => <EmptyState />}
    />
  );
};

const EmptyState = () => (
  <div className="text-foreground py-8 text-center">
    <div className="mb-2 text-lg">No likes yet</div>
    <div className="text-sm">Be the first to like this post!</div>
  </div>
);
