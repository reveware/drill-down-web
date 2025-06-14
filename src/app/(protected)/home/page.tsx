'use client';

import { PostFeed } from '@/features/posts/components/PostFeed/PostFeed';
import { useFeedPosts, RecommendedPhotos } from '@/features/posts';
import { UpcomingTimebomb } from '@/features/timebombs/components/UpcomingTimebomb/UpcomingTimebomb';
import { mockTimeBomb } from '@/mocks/timebomb';
import { useRef } from 'react';
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';
import { FloatingActionButton } from '@/components/shared/FloatingActionButton/FloatingActionButton';

export default function HomePage() {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const { posts, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useFeedPosts();

  useInfiniteScrollObserver({
    ref: loaderRef,
    onLoadMore: fetchNextPage,
    enabled: !!hasNextPage,
  });

  return (
    <div className="flex h-full flex-col gap-6 lg:grid lg:grid-cols-6">
      <section className="order-2 flex min-h-0 w-full flex-col items-center lg:col-span-3 lg:overflow-y-auto">
        <PostFeed
          posts={posts}
          isLoading={isLoading}
          loaderRef={loaderRef}
          isFetchingNextPage={isFetchingNextPage}
        />
      </section>

      <aside className="border-border order-1 flex flex-col items-center gap-8 border-l-1 p-4 lg:order-2 lg:col-span-3">
        <UpcomingTimebomb timebomb={mockTimeBomb} />
        <RecommendedPhotos userId={1} />
      </aside>

      <FloatingActionButton />
    </div>
  );
}
