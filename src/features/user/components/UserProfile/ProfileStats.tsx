import { UserOverview } from '@/types/user';
import { Card, CardContent } from '@/components/ui/card';

interface ProfileStatsProps {
  user: UserOverview;
}

interface StatItemProps {
  label: string;
  value: number;
  description?: string;
}

const StatItem = ({ label, value, description }: StatItemProps) => (
  <div className="text-center">
    <div className="text-2xl font-bold text-foreground">{value.toLocaleString()}</div>
    <div className="text-sm font-medium text-muted-foreground">{label}</div>
    {description && <div className="text-xs text-muted-foreground">{description}</div>}
  </div>
);

export const ProfileStats = ({ user }: ProfileStatsProps) => {
  // Mock stats - in a real app, these would come from an API based on user ID
  const stats = {
    posts: 42,
    friends: 156,
    timebombs: 23,
    likes: 1337,
  };

  return (
    <Card className="card">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatItem label="Posts" value={stats.posts} description="Total posts shared" />
          <StatItem label="Friends" value={stats.friends} description="Connected users" />
          <StatItem label="Timebombs" value={stats.timebombs} description="Sent & received" />
          <StatItem label="Likes" value={stats.likes} description="Total received" />
        </div>
      </CardContent>
    </Card>
  );
};
