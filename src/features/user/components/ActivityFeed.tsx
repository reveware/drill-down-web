import { UserOverview } from '@/types/user';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, UserPlus, Camera, Gift } from '@/components/shared/Icons';

interface ActivityFeedProps {
  user: UserOverview;
  isOwnProfile?: boolean;
}

interface ActivityItem {
  id: string;
  type: 'like' | 'comment' | 'friend' | 'post' | 'timebomb';
  description: string;
  timestamp: Date;
}

const ActivityIcon = ({ type }: { type: ActivityItem['type'] }) => {
  const iconProps = { size: 16, className: 'text-muted-foreground' };

  switch (type) {
    case 'like':
      return <Heart {...iconProps} className="text-red-500" />;
    case 'comment':
      return <MessageCircle {...iconProps} className="text-blue-500" />;
    case 'friend':
      return <UserPlus {...iconProps} className="text-green-500" />;
    case 'post':
      return <Camera {...iconProps} className="text-purple-500" />;
    case 'timebomb':
      return <Gift {...iconProps} className="text-orange-500" />;
    default:
      return <div className="w-4 h-4" />;
  }
};

const ActivityItemComponent = ({ activity }: { activity: ActivityItem }) => (
  <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-card">
    <div className="flex-shrink-0 mt-1">
      <ActivityIcon type={activity.type} />
    </div>
    <div className="flex-1">
      <p className="text-sm text-foreground">{activity.description}</p>
      <p className="text-xs text-muted-foreground mt-1">
        {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
      </p>
    </div>
  </div>
);

export const ActivityFeed = ({ user, isOwnProfile = false }: ActivityFeedProps) => {
  // Mock activity data - in a real app, this would come from an API based on user ID
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'post',
      description: 'Shared a new photo',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: '2',
      type: 'like',
      description: "Liked Alice's post about sunset photography",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    },
    {
      id: '3',
      type: 'friend',
      description: 'Became friends with Bob Builder',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    },
    {
      id: '4',
      type: 'comment',
      description: "Commented on Charlie's chocolate factory tour",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    },
    {
      id: '5',
      type: 'timebomb',
      description: 'Sent a timebomb to Alice',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
      id: '6',
      type: 'like',
      description: 'Liked 3 posts from friends',
      timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000), // 1.5 days ago
    },
  ];

  return (
    <div className="space-y-4">
      {activities.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          <div className="text-lg mb-2">No recent activity</div>
          <div className="text-sm">Start interacting with posts and friends!</div>
        </div>
      ) : (
        <>
          <div className="text-sm text-muted-foreground">Recent activity</div>
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {activities.map((activity) => (
              <ActivityItemComponent key={activity.id} activity={activity} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
