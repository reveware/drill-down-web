'use client';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfile } from '@/features/user/hooks/useUserProfile';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';

export const RewardProgress = () => {
  const { user: authUser } = useAuth();
  const { data: user, isLoading } = useUserProfile(authUser?.id || '');

  if (!user || isLoading) {
    return null;
  }

  const { previous, next } = user.reward_cycle;
  const cycleLength = next - previous;
  const postsInCycle = user.posts_count - previous;
  const postsLeft = next - user.posts_count;

  const message =
    user.posts_count === 0
      ? 'Post once to earn your first reward!'
      : postsLeft === 1
        ? 'Just 1 more post until your next reward!'
        : `${postsLeft} more posts until your next reward`;

  return (
    <Card className="card">
      <CardContent className="px-4 py-2">
        <h3 className="text-lg font-semibold">Next Reward</h3>
        <div className="space-y-2">
          <div className="text-muted-foreground flex items-center justify-between text-xs">
            <span>{message}</span>
            <span>
              {postsInCycle}/{cycleLength} posts
            </span>
          </div>
          <Progress value={(postsInCycle / cycleLength) * 100} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};
