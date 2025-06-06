import { UserDetail } from '@/types/user';
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
        <div className="flex flex-col items-start gap-6">
          <UserDetails user={user} />
          <ProfileDetails user={user} />
          <ProfileActions user={user} />
          <div>
            <p className="text-muted text-xs">
              Joined: {formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}
            </p>
            <p className="text-muted text-xs">
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
    <div className="flex w-full flex-col gap-2">
      <div className="relative mx-auto aspect-[3/5] max-h-[250px] w-full overflow-hidden rounded-md">
        <Image
          src={user.avatar}
          alt={user.username}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 300px, 250px"
          priority
        />
      </div>
      <div className="px-4">
        <h1 className="font-title text-foreground text-2xl font-bold">
          {user.first_name} {user.last_name}
        </h1>
        <p className="text-accent text-lg">@{user.username}</p>
        {user.tagline && <p className="text-muted mt-2 text-sm">{user.tagline}</p>}
      </div>
    </div>
  );
};

const ProfileDetails = ({ user }: { user: UserDetail }) => {
  const stats = {
    posts: user.posts_count,
    followers: user.followers_count,
    following: user.following_count,
  };

  return (
    <div className="text-foreground flex w-full flex-wrap justify-evenly gap-2">
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="flex flex-col items-center justify-center text-center font-bold">
          <span className="text-2xl font-extrabold tracking-widest">{value}</span>
          <span className="text-xs font-light">{key}</span>
        </div>
      ))}
    </div>
  );
};

const ProfileActions = ({ user }: { user: UserDetail }) => {
  if (user.is_self) {
    return null;
  }

  return (
    <div className="flex w-full flex-wrap justify-center gap-2">
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
