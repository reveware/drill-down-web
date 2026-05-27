'use client';

import { PostFeed } from '@/features/posts/components/PostFeed/PostFeed';
import { RecommendedImages } from '@/features/posts';
import { UpcomingTimebomb } from '@/features/timebombs/components/UpcomingTimebomb/UpcomingTimebomb';
import { FloatingActionButton } from '@/components/shared/FloatingActionButton/FloatingActionButton';
import { mockTimeBomb } from '@/mocks/timebomb';
import { useAuth } from '@/hooks/useAuth';
import { UserRecommendations } from '@/features/user/components/UserRecommendations/UserRecommendations';
import { UserTags } from '@/features/user';

export default function HomePage() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-full flex-col gap-6 lg:grid lg:grid-cols-6">
      <section className="order-2 flex min-h-0 w-full flex-col items-center gap-4 lg:col-span-3 lg:overflow-y-auto">
        <PostFeed />
      </section>

      <aside className="border-border order-1 flex flex-col items-center gap-6 border-l-1 p-4 lg:order-2 lg:col-span-3">
        <UserTags userId={user.id} />
        <UpcomingTimebomb timebomb={mockTimeBomb} />
        <RecommendedImages userId={user.id} />
        <UserRecommendations userId={user.id} />
      </aside>

      <FloatingActionButton />
    </div>
  );
}
