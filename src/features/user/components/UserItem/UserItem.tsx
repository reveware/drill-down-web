import { UserAvatar } from '@/components/shared';
import { UserPlus, UserMinus } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserOverview } from '@/types/user';
import { UserInfo } from '@/components/shared/UserInfo/UserInfo';
import { useFollowUser } from '@/features/follow/hooks/useFollowUser';
import { useUnfollowUser } from '@/features/follow/hooks/useUnfollowUser';

interface UserItemProps {
  user: UserOverview;
}

export const UserItem = ({ user }: UserItemProps) => {
  const { mutate: followUser } = useFollowUser();
  const { mutate: unfollowUser } = useUnfollowUser();

  if (user.is_self) {
    return (
      <Card className="card max-w-md border-1">
        <div className="flex flex-col items-center gap-4 p-4 md:flex-row">
          <div className="flex w-full items-center gap-3">
            <UserAvatar user={user} />
            <UserInfo user={user} />
          </div>
        </div>
      </Card>
    );
  }

  const getActionButton = () => {
    if (user.is_following) {
      return (
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => unfollowUser(user.id)}
        >
          <UserMinus size={16} className="mr-2" />
          Unfollow
        </Button>
      );
    }

    if (user.is_pending_follow) {
      return (
        <Button variant="outline" size="sm" className="w-full" disabled>
          <UserPlus size={16} className="mr-2" />
          Pending
        </Button>
      );
    }

    return (
      <Button variant="outline" size="sm" className="w-full" onClick={() => followUser(user.id)}>
        <UserPlus size={16} className="mr-2" />
        Follow
      </Button>
    );
  };

  return (
    <Card className="card max-w-md border-1">
      <div className="flex flex-col items-center gap-4 p-4 md:flex-row">
        <div className="flex w-full items-center gap-3">
          <UserAvatar user={user} />
          <UserInfo user={user} />
        </div>

        <div className="w-full md:w-auto">{getActionButton()}</div>
      </div>
    </Card>
  );
};
