'use client';
import React from 'react';
import { PostCard } from '../../../posts/components/PostCard';
import { PostCardSkeleton } from '../../../posts/components/PostCard/PostCardSkeleton';
import { useUserLikes } from '@/features/likes/hooks/useUserLikes';
import Image from 'next/image';
import { Lost } from '@/assets/images';
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
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <Image src={Lost} alt="No liked posts found" className="mb-4 h-32 w-32" />
    <h3 className="mb-2 text-lg font-semibold">No liked posts</h3>
    <p className="text-muted-foreground">{`This user hasn't liked any posts yet.`}</p>
  </div>
);
