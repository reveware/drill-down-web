'use client';

import { PostFeed } from '@/features/posts/components/PostFeed/PostFeed';
import { useFeedPosts, RecommendedPhotoPosts } from '@/features/posts';
import { UpcomingTimebomb } from '@/features/timebombs/components/UpcomingTimebomb/UpcomingTimebomb';
import { mockTimeBomb } from '@/mocks/timebomb';
import { useRef } from 'react';
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';

export default function HomePage() {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const { data: posts, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useFeedPosts();

  useInfiniteScrollObserver({
    ref: loaderRef,
    onLoadMore: fetchNextPage,
    enabled: !!hasNextPage,
  });

  const feedPosts = posts?.pages.flat() ?? [];
  return (
    <div className="flex flex-col gap-6 h-full lg:grid lg:grid-cols-6 ">
      <section className="order-2 lg:col-span-3 flex flex-col min-h-0 lg:overflow-y-auto">
        <PostFeed
          posts={feedPosts}
          isLoading={isLoading}
          loaderRef={loaderRef}
          isFetchingNextPage={isFetchingNextPage}
        />
      </section>

      <aside className="order-1 lg:order-2 p-4 flex flex-col items-center gap-8 lg:col-span-3 border-l-1 border-border">
        <RecommendedPhotoPosts />
        <UpcomingTimebomb timebomb={mockTimeBomb} />
      </aside>
    </div>
  );
}
