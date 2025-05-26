'use client';

import { PostFeed } from '../posts/PostFeed/PostFeed';
import { UpcomingTimebomb } from '../Timebombs/UpcomingTimebomb';
import { RecommendedPhotoPosts, useRecommendedPhotoPosts } from '../posts/RecommendedPosts';
import { mockTimeBomb } from '../../mocks/timebomb';

export const Home = () => {
  const { data: recommendedPhotoPosts = [] } = useRecommendedPhotoPosts();

  return (
    <div className="h-full flex flex-col">
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-6 gap-6 min-h-0 ">
        <section className="col-span-3 flex flex-col min-h-0 p-4 justify-center items-center">
          <PostFeed />
        </section>

        <aside className="col-span-3 px-4 hidden md:block overflow-y-auto border-l-1 border-border">
          <div className="flex flex-col gap-8 mt-8 h-full">
            <RecommendedPhotoPosts posts={recommendedPhotoPosts} />
            <UpcomingTimebomb timebomb={mockTimeBomb} />
          </div>
        </aside>
      </main>
    </div>
  );
};
