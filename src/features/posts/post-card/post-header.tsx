import { UserAvatar } from '@/components/shared/user-avatar/user-avatar';
import { UserOverview } from '@/types/user';
import { formatDistanceToNow } from 'date-fns';

export const PostHeader = ({ user, date }: { user: UserOverview; date: Date }) => {
  return (
    <div className="flex items-center gap-3">
      <UserAvatar user={user} />
      <div>
        <div className="font-semibold leading-none">{user.username}</div>
        <div className="text-xs text-muted-foreground">
          {formatDistanceToNow(date, { addSuffix: true })}
        </div>
      </div>
    </div>
  );
};
