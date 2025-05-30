import { UserOverview } from '@/types/user';
import { UserAvatar } from '@/components/shared';
import { Button } from '@/components/shared';
import { MessageCircle, UserMinus } from '@/components/shared/Icons';
import { mockUser, mockAdmin } from '@/mocks/user';

interface FriendsListProps {
  user: UserOverview;
  isOwnProfile?: boolean;
}

interface FriendItemProps {
  friend: UserOverview;
  isOwnProfile?: boolean;
}

const FriendItem = ({ friend, isOwnProfile = false }: FriendItemProps) => (
  <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
    <div className="flex items-center gap-3">
      <UserAvatar user={friend} />
      <div>
        <div className="font-semibold text-foreground">
          {friend.first_name} {friend.last_name}
        </div>
        <div className="text-sm text-muted-foreground">@{friend.username}</div>
        {friend.tagline && (
          <div className="text-xs text-muted-foreground mt-1">{friend.tagline}</div>
        )}
      </div>
    </div>

    {isOwnProfile && (
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

export const FriendsList = ({ user, isOwnProfile = false }: FriendsListProps) => {
  // Mock friends list - in a real app, this would come from an API based on user ID
  const friends = [
    { ...mockAdmin, id: 2, tagline: 'Admin extraordinaire' },
    {
      ...mockUser,
      id: 3,
      username: 'alice_wonder',
      first_name: 'Alice',
      last_name: 'Wonder',
      tagline: 'Down the rabbit hole we go!',
    },
    {
      ...mockUser,
      id: 4,
      username: 'bob_builder',
      first_name: 'Bob',
      last_name: 'Builder',
      tagline: 'Can we fix it? Yes we can!',
    },
    {
      ...mockUser,
      id: 5,
      username: 'charlie_chocolate',
      first_name: 'Charlie',
      last_name: 'Bucket',
      tagline: 'Golden ticket holder',
    },
  ];

  return (
    <div className="space-y-4">
      {friends.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          <div className="text-lg mb-2">No friends yet</div>
          <div className="text-sm">Start connecting with other users!</div>
        </div>
      ) : (
        <>
          <div className="text-sm text-muted-foreground">
            {friends.length} friend{friends.length !== 1 ? 's' : ''}
          </div>
          <div className="space-y-3">
            {friends.map((friend) => (
              <FriendItem key={friend.id} friend={friend} isOwnProfile={isOwnProfile} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
