import { UserAvatar } from '@/components/shared/';
import { CardHeader } from '@/components/ui/card';
import { UserOverview } from '@/types/user';
import { formatDistanceToNow } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical, Trash } from '@/components/shared/Icons';
import { UserInfo } from '@/components/shared/UserInfo/UserInfo';

interface PostCardHeaderProps {
  user: UserOverview;
  createdAt: Date;
  onDelete: () => void;
}

export const PostCardHeader = ({ user, createdAt, onDelete }: PostCardHeaderProps) => {
  const subtitle = formatDistanceToNow(createdAt, { addSuffix: true });

  const handleDelete = () => {
    onDelete();
  };

  return (
    <CardHeader className="flex items-center justify-between gap-3 px-2">
      <div className="flex items-center gap-3">
        <UserAvatar user={user} />
        <UserInfo user={user} subtitle={subtitle} />
      </div>
      {user.is_self && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:bg-muted focus:ring-accent rounded-full p-2 focus:ring-2 focus:outline-none">
              <EllipsisVertical className="text-muted-foreground h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="card p-2" align="end">
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2" onClick={handleDelete}>
                  <Trash size={20} className="text-on-surface-variant" />
                  <p className="text-sm font-medium">Delete Post</p>
                </button>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </CardHeader>
  );
};
