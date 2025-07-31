import { UserOverview } from '@/types/user';
import { PostLikesFeed } from '@/features/posts/components/PostLikesFeed';

export const LikesTab = ({ user }: { user: UserOverview }) => {
  return (
    <div className="flex h-full w-full justify-center overflow-y-auto">
      <PostLikesFeed userId={user.id} />
    </div>
  );
};
