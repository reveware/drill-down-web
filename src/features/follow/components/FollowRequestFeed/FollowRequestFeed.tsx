'use client';
import React, { useRef } from 'react';
import { FollowRequestItem } from './FollowRequestItem';
import { FollowRequestItemSkeleton } from './FollowRequestItemSkeleton';
import { usePendingFollowRequests } from '@/features/follow/hooks/usePendingFollowRequests';
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';

export const FollowRequestFeed: React.FC = () => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { pendingRequests, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    usePendingFollowRequests();

  useInfiniteScrollObserver({
    ref: loadMoreRef,
    onLoadMore: fetchNextPage,
    enabled: !!hasNextPage && !isLoading,
  });

  if (pendingRequests.length === 0 && !isLoading) {
    return <EmptyState />;
  }

  return (
    <div className="min-h-full w-full">
      {isLoading && <LoadingState />}

      {!isLoading && (
        <div className="flex flex-col items-center gap-4">
          {pendingRequests.map((followRequest) => (
            <FollowRequestItem key={followRequest.id} followRequest={followRequest} />
          ))}
        </div>
      )}

      <div ref={loadMoreRef} className="text-center">
        {isFetchingNextPage && <FollowRequestItemSkeleton />}
      </div>
    </div>
  );
};

const LoadingState = () => (
  <div className="flex flex-col items-center gap-4">
    <FollowRequestItemSkeleton />
    <FollowRequestItemSkeleton />
    <FollowRequestItemSkeleton />
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <p className="text-muted-foreground">No pending follow requests</p>
  </div>
);
