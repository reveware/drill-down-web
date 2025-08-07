'use client';
import { FollowRequestFeed } from '@/features/follow/components/FollowRequestFeed';

export default function NotificationsPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-2 py-4">
      <h2 className="text-md font-title text-2xl font-bold">Follow Requests</h2>
      <FollowRequestFeed />
    </div>
  );
}
