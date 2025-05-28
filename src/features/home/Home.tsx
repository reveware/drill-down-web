'use client';

import { PostFeed } from '../posts/components/PostFeed/PostFeed';
import {
  RecommendedPhotoPosts,
  useRecommendedPhotoPosts,
} from '../posts/components/RecommendedPosts';
import { UpcomingTimebomb } from '../timebombs/components/UpcomingTimebomb/UpcomingTimebomb';
import { mockTimeBomb } from '../../mocks/timebomb';

export const Home = () => {
  const { data: recommendedPhotoPosts = [] } = useRecommendedPhotoPosts();

  return (
    <main className="flex flex-col gap-6 h-full lg:grid lg:grid-cols-6 ">
      <section className="order-2 lg:col-span-3 flex flex-col min-h-0 lg:overflow-y-auto">
        <PostFeed />
      </section>

      <aside className="order-1 lg:order-2 p-4 flex flex-col items-center gap-8 lg:col-span-3 border-l-1 border-border">
        <RecommendedPhotoPosts posts={recommendedPhotoPosts} />
        <UpcomingTimebomb timebomb={mockTimeBomb} />
      </aside>
    </main>
  );
};
