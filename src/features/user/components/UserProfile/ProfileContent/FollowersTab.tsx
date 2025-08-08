import { UserOverview } from '@/types/user';
import { FollowerFeed } from '@/features/follow';

export const FollowersTab = ({ user }: { user: UserOverview }) => {
  return (
    <div className="flex h-full w-full justify-center overflow-y-auto">
      <FollowerFeed userId={user.id} />;
    </div>
  );
};
