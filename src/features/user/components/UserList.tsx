import { UserOverview } from '@/types/user';
import { UserAvatar } from '@/components/shared';
import { Button } from '@/components/shared';
import { MessageCircle, UserMinus } from '@/components/shared/Icons';

interface UserItemProps {
  user: UserOverview;
}

const UserItem = ({ user }: UserItemProps) => (
  <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
    <div className="flex items-center gap-3">
      <UserAvatar user={user} />
      <div>
        <div className="font-semibold text-foreground">
          {user.first_name} {user.last_name}
        </div>
        <div className="text-sm text-muted-foreground">@{user.username}</div>
        {user.tagline && <div className="text-xs text-muted-foreground mt-1">{user.tagline}</div>}
      </div>
    </div>

    {!user.is_self && (
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <MessageCircle size={16} className="mr-2" />
          Message
        </Button>
        <Button variant="outline" size="sm">
          <UserMinus size={16} className="mr-2" />
          Unfriend
        </Button>
      </div>
    )}
  </div>
);

interface UserListProps {
  title: string;
  user: UserOverview;
  users: UserOverview[];
}

export const UserList = ({ title, user, users }: UserListProps) => {
  return (
    <div className="space-y-4">
      {users.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="text-sm text-muted-foreground">{title}</div>
          <div className="space-y-3">
            {users.map((user) => (
              <UserItem key={user.id} user={user} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const EmptyState = () => (
  <div className="text-center text-muted-foreground py-8">
    <div className="text-lg mb-2">Nothing yet</div>
    <div className="text-sm">Start connecting with other users!</div>
  </div>
);
