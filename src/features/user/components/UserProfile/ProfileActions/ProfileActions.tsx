import { UserDetail } from '@/types/user';
import { useFollowUser } from '@/features/follow/hooks/useFollowUser';
import { useUnfollowUser } from '@/features/follow/hooks/useUnfollowUser';
import { Button } from '@/components/ui/button';
import { Bomb, MessageCircle, UserMinus, UserPlus } from '@/components/shared/Icons';
import { cn } from '@/lib/utils';
import { useApproveFollowRequest } from '@/features/follow/hooks/useApproveFollowRequest';
import { useRejectFollowRequests } from '@/features/follow/hooks/useRejectFollowRequests';

export const ProfileActions = ({ user }: { user: UserDetail }) => {
  const { mutate: followUser } = useFollowUser();
  const { mutate: unfollowUser } = useUnfollowUser();

  if (user.is_self) return null;

  const followAction = (() => {
    if (user.is_following) {
      return {
        label: 'Unfollow',
        icon: <UserMinus size={16} />,
        onClick: () => unfollowUser(user.id),
        disabled: false,
      };
    }
    if (user.is_pending_follow) {
      return {
        label: 'Pending',
        icon: <UserPlus size={16} />,
        onClick: undefined,
        disabled: true,
      };
    }
    return {
      label: 'Follow',
      icon: <UserPlus size={16} />,
      onClick: () => followUser(user.id),
      disabled: false,
    };
  })();

  const mutualActions = user.is_mutual
    ? [
        {
          label: 'Message',
          icon: <MessageCircle size={16} />,
          onClick: () => {}, // TODO: implement messaging
        },
        {
          label: 'Timebomb',
          icon: <Bomb size={16} />,
          onClick: () => {}, // TODO: implement timebomb feature
        },
      ]
    : [];

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Follow Button Row */}
      <div className={cn('flex flex-wrap justify-center gap-2', 'flex-col')}>
        <Button
          variant="outline"
          size="sm"
          onClick={followAction.onClick}
          disabled={followAction.disabled}
        >
          {followAction.icon}
          {followAction.label}
        </Button>

        {mutualActions.map((action) => (
          <Button key={action.label} size="sm" variant="outline" onClick={action.onClick}>
            {action.icon}
            {action.label}
          </Button>
        ))}
      </div>

      {/* Pending Follower Banner (always separate) */}
      {user.is_pending_follower && <PendingFollowerBanner user={user} />}
    </div>
  );
};

const PendingFollowerBanner = ({ user }: { user: UserDetail }) => {
  const { mutate: approveFollowRequest } = useApproveFollowRequest(user.id);
  const { mutate: rejectFollowRequest } = useRejectFollowRequests(user.id);

  if (!user.follow_request_id) {
    return null;
  }

  return (
    <div className="border-border flex flex-col items-center gap-2 rounded-md border-1 p-3 text-sm">
      <span>
        <strong>{user.username}</strong> wants to follow you
      </span>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            rejectFollowRequest(user.follow_request_id!);
          }}
        >
          Reject
        </Button>
        <Button
          size="sm"
          variant="accent"
          onClick={() => {
            approveFollowRequest(user.follow_request_id!);
          }}
        >
          Approve
        </Button>
      </div>
    </div>
  );
};
