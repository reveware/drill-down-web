'use client';
import React from 'react';
import { FollowRequestItem } from './FollowRequestItem';
import { FollowRequestItemSkeleton } from './FollowRequestItemSkeleton';
import { usePendingFollowRequests } from '@/features/follow/hooks/usePendingFollowRequests';
import { Feed } from '@/components/shared/Feed/Feed';
import { EmptyState } from '@/components/shared';

export const FollowRequestFeed: React.FC = () => {
  const { pendingRequests, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    usePendingFollowRequests();

  return (
    <Feed
      items={pendingRequests}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      renderItem={(fr) => <FollowRequestItem key={fr.id} followRequest={fr} />}
      renderSkeleton={() => <FollowRequestItemSkeleton />}
      renderEmptyState={() => (
        <EmptyState
          emoji="🫂"
          title="No Follow Requests"
          subtitle="Guess you are not that popular, yet."
        />
      )}
    />
  );
};
