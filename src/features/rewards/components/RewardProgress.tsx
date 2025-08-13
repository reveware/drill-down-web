'use client';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfile } from '@/features/user/hooks/useUserProfile';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { usePendingRewardJob } from '../hooks/usePendingRewardJob';
import { RewardPendingCard } from './RewardPendingCard';

const POSTS_PER_REWARD = 10;

export const RewardProgress = () => {
  const { user: authUser } = useAuth();
  const { data: user, isLoading } = useUserProfile(authUser?.id || '');
  const { hasPending } = usePendingRewardJob(authUser?.id);

  if (!user || isLoading) {
    return null;
  }

  const postsCount = user.posts_count;
  const postsInCurrentCycle = postsCount % POSTS_PER_REWARD;
  const postsUntilNextReward = POSTS_PER_REWARD - postsInCurrentCycle;
  const progressPercentage = (postsInCurrentCycle / POSTS_PER_REWARD) * 100;

  // If user just completed a reward cycle, show they're at 0/10 for next reward
  const isStartOfCycle = postsCount === 0 || (postsInCurrentCycle === 0 && postsCount > 0);
  const displayProgress = isStartOfCycle ? 0 : postsInCurrentCycle;
  const displayPercentage = isStartOfCycle ? 0 : progressPercentage;

  const getProgressMessage = () => {
    return postsUntilNextReward === POSTS_PER_REWARD
      ? 'Start posting to earn rewards!'
      : postsUntilNextReward === 1
        ? 'Just 1 more post until your next reward!'
        : `Continue posting to earn a new reward!`;
  };
  return (
    <div className="flex flex-col gap-2">
      <Card className="card">
        <CardContent className="px-4 py-2">
          <div>
            <h3 className="text-lg font-semibold">Next Reward</h3>

            <div className="space-y-2">
              <div className="text-muted flex items-center justify-between text-xs">
                <span>{getProgressMessage()}</span>
                <span>
                  {displayProgress}/{POSTS_PER_REWARD} posts
                </span>
              </div>

              <Progress value={displayPercentage} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
      {hasPending && <RewardPendingCard />}
    </div>
  );
};
