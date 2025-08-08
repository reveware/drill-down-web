'use client';
import React from 'react';
import { FollowRequestItem } from './FollowRequestItem';
import { FollowRequestItemSkeleton } from './FollowRequestItemSkeleton';
import { usePendingFollowRequests } from '@/features/follow/hooks/usePendingFollowRequests';
import { Feed } from '@/components/shared/Feed/Feed';

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
      renderEmptyState={() => <EmptyState />}
    />
  );
};

const EmptyState = () => (
  <div className="flex min-h-4/5 flex-col items-center justify-center p-8 text-center">
    <div className="mb-4 text-6xl">🫂</div>
    <h2 className="mb-2 text-2xl font-bold">No Follow Requests</h2>
    <p className="text-muted-foreground max-w-md">Guess you are not that popular, yet.</p>
  </div>
);
