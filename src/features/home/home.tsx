'use client';

import { PostFeed } from '../posts/post-feed/post-feed';

export const Home = () => {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16 px-4 py-6 mx-auto">
      <section className="space-y-6">
        <PostFeed />
      </section>

      <aside className="space-y-4">
        <div className="rounded-md border p-4  bg-surface shadow-sm shadow-secondary">
          <h2 className="font-semibold text-lg mb-2">Friend Requests</h2>
          <div className="h-64 bg-muted/30 rounded-md flex items-center justify-center text-muted-foreground text-sm">
            Widget Placeholder 1
          </div>
        </div>

        <div className="rounded-md border p-4  bg-surface shadow-sm shadow-secondary">
          <h2 className="font-semibold text-lg mb-2">Timebomb Status</h2>
          <div className="h-64 bg-muted/30 rounded-md flex items-center justify-center text-muted-foreground text-sm">
            Widget Placeholder 2
          </div>
        </div>
      </aside>
    </main>
  );
};
