import { UserAvatar } from '@/components/shared/user-avatar/UserAvatar';
import { CardHeader } from '@/components/ui/card';
import { UserOverview } from '@/types/user';
import { formatDistanceToNow } from 'date-fns';

export const PostCardHeader = ({ user, date }: { user: UserOverview; date: Date }) => {
  return (
    <CardHeader className="flex items-center gap-3 px-2">
      <UserAvatar user={user} />
      <div className="flex flex-col gap-1">
        <div className="font-semibold leading-none">{user.username}</div>
        <div className="text-xs text-muted">{formatDistanceToNow(date, { addSuffix: true })}</div>
      </div>
    </CardHeader>
  );
};
