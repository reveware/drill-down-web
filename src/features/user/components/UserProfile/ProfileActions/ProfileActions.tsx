import { UserDetail } from '@/types/user';
import { useFollowUser } from '@/features/follow/hooks/useFollowUser';
import { useUnfollowUser } from '@/features/follow/hooks/useUnfollowUser';
import { Button } from '@/components/ui/button';
import { Dna, UserMinus, UserPlus } from '@/components/shared/Icons';
import { cn } from '@/lib/utils';
import { useApproveFollowRequest } from '@/features/follow/hooks/useApproveFollowRequest';
import { useRejectFollowRequests } from '@/features/follow/hooks/useRejectFollowRequests';
import { useRouter } from 'next/navigation';

type Action = {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
};

type ProfileActionsProps = {
  user: UserDetail;
};

export const ProfileActions = ({ user }: ProfileActionsProps) => {
  const { mutate: followUser } = useFollowUser();
  const { mutate: unfollowUser } = useUnfollowUser();
  const router = useRouter();
  const matchWithUser = (userId: string) => router.push(`/user/${userId}/match`);

  if (user.is_self) {
    return null;
  }

  const getAvailableActions = () => {
    const actions: Action[] = [];

    // Rule: Follow actions based on relationship state
    if (!user.is_following && !user.is_pending_follow) {
      actions.push({
        label: 'Follow',
        icon: <UserPlus size={16} />,
        onClick: () => followUser(user.id),
        disabled: false,
      });
    }

    if (user.is_following || user.is_mutual) {
      actions.push({
        label: 'Unfollow',
        icon: <UserMinus size={16} />,
        onClick: () => unfollowUser(user.id),
        disabled: false,
      });
    }

    if (user.is_pending_follow) {
      actions.push({
        label: 'Pending',
        icon: <UserPlus size={16} />,
        onClick: () => {},
        disabled: true,
      });
    }

    if (user.is_mutual) {
      actions.push({
        label: 'Match',
        icon: <Dna size={16} />,
        onClick: () => matchWithUser(user.id),
        disabled: false,
      });
    }

    return actions;
  };

  const actions = getAvailableActions();

  return (
    <div className="flex w-full flex-col gap-4">
      <div className={cn('flex flex-wrap justify-center gap-2', 'flex-col')}>
        {actions.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            size="sm"
            onClick={action.onClick}
            disabled={action.disabled}
          >
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
