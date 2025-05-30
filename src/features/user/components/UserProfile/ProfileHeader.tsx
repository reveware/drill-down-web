import { UserOverview } from '@/types/user';
import { UserAvatar } from '@/components/shared';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/shared';
import { Edit, Settings, UserPlus, MessageCircle } from '@/components/shared/Icons';
import { formatDistanceToNow } from 'date-fns';

interface ProfileHeaderProps {
  user: UserOverview;
}

export const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const joinedDate = new Date(user.created_at);

  return (
    <Card className="card">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-shrink-0">
            <div className="relative">
              <UserAvatar user={user} />
              <div className="absolute -bottom-1 -right-1">
                <Badge variant="secondary" className="text-xs">
                  {user.role}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-2xl font-bold font-title text-foreground">
                {user.first_name} {user.last_name}
              </h1>
              <p className="text-lg text-muted-foreground">@{user.username}</p>
              {user.tagline && <p className="text-sm text-muted-foreground mt-2">{user.tagline}</p>}
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div>
                <span className="font-medium">Email:</span> {user.email}
              </div>
              <div>
                <span className="font-medium">Joined:</span>{' '}
                {formatDistanceToNow(joinedDate, { addSuffix: true })}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            {user.is_self ? (
              <>
                <Button variant="outline" size="sm">
                  <Edit size={16} className="mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" size="sm">
                  <Settings size={16} className="mr-2" />
                  Settings
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm">
                  <UserPlus size={16} className="mr-2" />
                  Add Friend
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircle size={16} className="mr-2" />
                  Message
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
