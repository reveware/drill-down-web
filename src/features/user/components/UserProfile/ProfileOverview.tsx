import { UserDetail, UserOverview } from '@/types/user';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/shared';
import { UserPlus, UserMinus, MessageCircle, Bomb } from '@/components/shared/Icons';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';

interface ProfileOverviewProps {
  user: UserDetail;
}

export const ProfileOverview = ({ user }: ProfileOverviewProps) => {
  return (
    <Card className="card">
      <CardContent className="p-4">
        <div className="flex flex-col gap-6 items-start">
          <UserDetails user={user} />
          <ProfileDetails user={user} />
          <ProfileActions user={user} />
          <div>
            <p className="text-xs text-muted">
              Joined: {formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}
            </p>
            <p className="text-xs text-muted">
              Last seen: {formatDistanceToNow(new Date(user.last_seen), { addSuffix: true })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const UserDetails = ({ user }: { user: UserDetail }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Image
        src={user.avatar}
        alt={user.username}
        width={150}
        height={250}
        className="rounded-md mx-auto justify-center w-full max-h-[250px] object-cover"
      />
      <div className="px-4">
        <h1 className="text-2xl font-bold font-title text-foreground">
          {user.first_name} {user.last_name}
        </h1>
        <p className="text-lg text-accent">@{user.username}</p>
        {user.tagline && <p className="text-sm text-muted mt-2">{user.tagline}</p>}
      </div>
    </div>
  );
};

const ProfileDetails = ({ user }: { user: UserDetail }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-evenly w-full text-foreground">
      <div className="flex flex-col  font-bold items-center">
        <span className="text-xl tracking-wide">{user.posts_count}</span>
        <span className="text-xs">posts</span>
      </div>
      <div className="flex flex-col  font-bold items-center">
        <span className="text-xl tracking-wide">{user.followers_count}</span>
        <span className="text-xs">followers</span>
      </div>
      <div className="flex flex-col font-bold items-center">
        <span className="text-xl tracking-wide">{user.following_count}</span>
        <span className="text-xs">following</span>
      </div>
    </div>
  );
};

const ProfileActions = ({ user }: { user: UserDetail }) => {
  if (user.is_self) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center w-full">
      <Button variant="outline" size="sm" block={!user.is_following}>
        {user.is_following ? (
          <>
            <UserMinus size={16} />
            Unfollow
          </>
        ) : (
          <>
            <UserPlus size={16} />
            Follow
          </>
        )}
      </Button>

      {user.is_following && (
        <Button variant="outline" size="sm">
          <MessageCircle size={16} />
          Message
        </Button>
      )}

      {user.is_following && (
        <Button variant="outline" size="sm">
          <Bomb size={16} />
          Timebomb
        </Button>
      )}
    </div>
  );
};
