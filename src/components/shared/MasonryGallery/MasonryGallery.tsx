'use client';
import { useRef, ReactNode } from 'react';
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';

interface MasonryGalleryProps<T> {
  items: T[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  renderItem: (item: T, index: number) => ReactNode;
  renderSkeleton: (index: number) => ReactNode;
  renderEmptyState: () => ReactNode;
}

export const MasonryGallery = <T,>({
  items,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  renderItem,
  renderSkeleton,
  renderEmptyState,
}: MasonryGalleryProps<T>) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScrollObserver({
    ref: loadMoreRef,
    onLoadMore: fetchNextPage,
    enabled: !!hasNextPage && !isLoading,
  });

  // Instagram-style pattern that creates highlighted items
  const getItemClassName = (index: number) => {
    // Use a 6-item repeating pattern for clean grid alignment
    const pattern = index % 6;

    // Every 6th item (0, 6, 12...) gets a 2x2 square
    if (pattern === 0) {
      return 'col-span-2 row-span-2';
    }

    // Every 6th item + 2 (2, 8, 14...) gets a tall 1x2 rectangle
    if (pattern === 2) {
      return 'row-span-2';
    }

    // All other items are regular 1x1
    return '';
  };

  const LoadingState = ({ count }: { count: number }) => (
    <div className="bg-background min-h-screen p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid auto-rows-[120px] grid-cols-3 gap-1 sm:auto-rows-[150px] sm:grid-cols-4 sm:gap-2 lg:auto-rows-[180px] lg:grid-cols-6">
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className={`${getItemClassName(index)} relative`}>
              <div className="absolute inset-0">{renderSkeleton(index)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return <LoadingState count={12} />;
  }
  console.log('items', items);
  if (items.length === 0) {
    return renderEmptyState();
  }

  return (
    <div>
      <div className="grid auto-rows-[120px] grid-cols-3 gap-1 sm:auto-rows-[150px] sm:grid-cols-4 sm:gap-2 lg:auto-rows-[180px] lg:grid-cols-6">
        {items.map((item, index) => (
          <div key={`item-${index}`} className={`${getItemClassName(index)} relative`}>
            <div className="absolute inset-0">{renderItem(item, index)}</div>
          </div>
        ))}
      </div>

      {hasNextPage && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          {isFetchingNextPage && renderSkeleton(0)}
        </div>
      )}
    </div>
  );
};
