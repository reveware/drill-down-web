'use client';

import { PostFeed } from '../posts/post-feed/post-feed';
import { UpcomingTimebombCard } from '../time-bombs/UpcomingTimebombCard';
import { mockTimeBomb } from '../../mocks/timebomb';

export const Home = () => {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-6 gap-8">
      <section className="col-span-4 space-y-6">
        <PostFeed />
      </section>

      <aside className="col-span-2 space-y-4">
        <div className="card">
          <h2 className="font-semibold text-lg mb-2">Recommended Posts</h2>
          <div className="h-64 bg-muted/30 rounded-md flex items-center justify-center text-muted-foreground text-sm">
            Widget Placeholder 1
          </div>
        </div>

        <UpcomingTimebombCard timebomb={mockTimeBomb} />
      </aside>
    </main>
  );
};
