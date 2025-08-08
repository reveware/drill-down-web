import { UserOverview } from '@/types/user';
import { UserLikesFeed } from '@/features/likes/components/UserLikesFeed/UserLikesFeed';

export const LikesTab = ({ user }: { user: UserOverview }) => {
  return (
    <div className="flex h-full w-full justify-center overflow-y-auto">
      <UserLikesFeed userId={user.id} />
    </div>
  );
};
