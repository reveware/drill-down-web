'use client';

import { ReactNode, useRef } from 'react';
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';
import { PickerRowSkeleton } from './PickerRowSkeleton';

interface PickerListProps<T> {
  items: T[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  renderRow: (item: T) => ReactNode;
  renderEmpty: () => ReactNode;
}

export const PickerList = <T,>({
  items,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  renderRow,
  renderEmpty,
}: PickerListProps<T>) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  useInfiniteScrollObserver({
    ref: sentinelRef,
    onLoadMore: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage,
  });

  if (isLoading) return <PickerRowSkeleton />;
  if (items.length === 0) return <>{renderEmpty()}</>;

  return (
    <ul className="flex flex-col">
      {items.map((item) => renderRow(item))}
      {hasNextPage && <div ref={sentinelRef} className="h-4" />}
      {isFetchingNextPage && <PickerRowSkeleton count={2} />}
    </ul>
  );
};
