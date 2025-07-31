'use client';
import { FollowRequestFeed } from '@/features/follow/components/FollowRequestFeed';

export default function NotificationsPage() {
  return (
    <div className="mx-auto flex h-full w-full max-w-3xl justify-center px-2 py-4">
      <div className="card flex flex-col gap-4 p-4">
        <h1 className="font-title text-foreground mb-4 text-2xl font-bold">Notifications</h1>

        <div className="flex flex-col gap-2">
          <h2 className="text-md font-bold">Follow Requests</h2>
          <FollowRequestFeed />
        </div>
      </div>
    </div>
  );
}
