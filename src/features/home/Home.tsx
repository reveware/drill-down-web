'use client';

import { PostFeed } from '../posts/post-feed/PostFeed';
import { UpcomingTimebomb } from '../time-bombs/UpcomingTimebomb';
import { RecommendedPhotoPosts, useRecommendedPhotoPosts } from '../posts/recommended-posts';
import { mockTimeBomb } from '../../mocks/timebomb';

export const Home = () => {
  const { data: recommendedPhotoPosts = [] } = useRecommendedPhotoPosts();

  return (
    <div className="h-full flex flex-col">
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-6 gap-6 min-h-0 ">
        <section className="col-span-4 flex flex-col min-h-0 p-4 justify-center items-center">
          <PostFeed />
        </section>

        <aside className="col-span-2 space-y-4 hidden md:block overflow-y-auto max-w-sm">
          <div className="flex flex-col gap-4 justify-center align-center h-full w-full">
            <RecommendedPhotoPosts posts={recommendedPhotoPosts} />
            <UpcomingTimebomb timebomb={mockTimeBomb} />
          </div>
        </aside>
      </main>
    </div>
  );
};
