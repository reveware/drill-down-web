import { UserAvatar } from '@/components/shared';
import { UserPlus } from '@/components/shared/Icons';
import { MessageCircle } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';

import { Card } from '@/components/ui/card';
import { UserOverview } from '@/types/user';

interface UserItemProps {
  user: UserOverview;
}

export const UserItem = ({ user }: UserItemProps) => (
  <Card className="card max-w-md">
    <div className="flex flex-col items-center gap-4 p-4 md:flex-row">
      <UserAvatar user={user} subtitle={`${user.tagline}`} className="w-full" />

      {!user.is_self && (
        <div className="w-full md:w-auto">
          {user.is_following ? (
            <Button variant="outline" size="sm" className="w-full">
              <MessageCircle size={16} className="mr-2" />
              Message
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="w-full">
              <UserPlus size={16} className="mr-2" />
              Follow
            </Button>
          )}
        </div>
      )}
    </div>
  </Card>
);
