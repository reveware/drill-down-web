import { PostFeed } from '@/features/posts/components/PostFeed/PostFeed';
import { RecommendedPhotoPosts } from '@/features/posts/components/RecommendedPosts';
import { UpcomingTimebomb } from '@/features/timebombs/components/UpcomingTimebomb/UpcomingTimebomb';
import { mockTimeBomb } from '@/mocks/timebomb';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6 h-full lg:grid lg:grid-cols-6 ">
      <section className="order-2 lg:col-span-3 flex flex-col min-h-0 lg:overflow-y-auto">
        <PostFeed />
      </section>

      <aside className="order-1 lg:order-2 p-4 flex flex-col items-center gap-8 lg:col-span-3 border-l-1 border-border">
        <RecommendedPhotoPosts />
        <UpcomingTimebomb timebomb={mockTimeBomb} />
      </aside>
    </div>
  );
}
