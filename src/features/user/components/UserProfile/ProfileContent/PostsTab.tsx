import { UserOverview } from '@/types/user';
import { UserPostsFeed } from '@/features/posts/components/UserPostsFeed';

export const PostsTab = ({ user }: { user: UserOverview }) => {
  return (
    <div className="flex h-full w-full justify-center overflow-y-auto">
      <UserPostsFeed authorId={user.id} />
    </div>
  );
};
