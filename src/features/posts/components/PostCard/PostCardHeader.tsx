import { UserAvatar } from '@/components/shared/';
import { CardHeader } from '@/components/ui/card';
import { UserOverview } from '@/types/user';
import { formatDistanceToNow } from 'date-fns';

export const PostCardHeader = ({ user, date }: { user: UserOverview; date: Date }) => {
  return (
    <CardHeader className="flex items-center gap-3 px-2">
      <UserAvatar user={user} subtitle={formatDistanceToNow(date, { addSuffix: true })} />
    </CardHeader>
  );
};
