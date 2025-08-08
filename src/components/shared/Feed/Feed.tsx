'use client';
import { ReactNode, useRef } from 'react';
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';

interface FeedProps<T> {
  items: T[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  renderItem: (item: T, index: number) => ReactNode;
  renderSkeleton: (index: number) => ReactNode;
  renderEmptyState: () => ReactNode;
}

export const Feed = <T,>({
  items,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  renderItem,
  renderSkeleton,
  renderEmptyState,
}: FeedProps<T>) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScrollObserver({
    ref: loadMoreRef,
    onLoadMore: fetchNextPage,
    enabled: !!hasNextPage && !isLoading,
  });

  const className = 'flex w-full max-w-lg flex-col items-center gap-4 px-2 py-4';

  const LoadingState = ({ count }: { count: number }) => (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={`skeleton-${idx}`} className="w-full">
          {renderSkeleton(idx)}
        </div>
      ))}
    </>
  );

  if (isLoading) {
    return (
      <div className={className}>
        <LoadingState count={3} />
      </div>
    );
  }

  if (!isLoading && items.length === 0) {
    return <div className={className}>{renderEmptyState()}</div>;
  }

  return (
    <div className={className}>
      {!isLoading &&
        items.map((item, index) => (
          <div key={`item-${index}`} className="w-full">
            {renderItem(item, index)}
          </div>
        ))}

      <div ref={loadMoreRef} className="flex w-full justify-center">
        {isFetchingNextPage && <div className="w-full">{renderSkeleton(0)}</div>}
      </div>
    </div>
  );
};
