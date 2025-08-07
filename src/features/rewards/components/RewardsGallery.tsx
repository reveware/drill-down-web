'use client';
import { useRewards } from '../hooks/useRewards';
import { RewardCard } from './RewardCard';
import { RewardCardSkeleton } from './RewardCardSkeleton';
import { MasonryGallery } from '@/components/shared/MasonryGallery';
import { UserReward } from '@/types/reward';

export const RewardsGallery = () => {
  const { rewards, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useRewards();
  console.log('rewards', rewards);
  const EmptyState = () => (
    <div className="flex min-h-4/5 flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 text-6xl">🎁</div>
      <h2 className="mb-2 text-2xl font-bold">No Rewards Yet</h2>
      <p className="text-muted-foreground max-w-md">
        Keep engaging with the platform to earn rewards.
      </p>
    </div>
  );

  return (
    <MasonryGallery<UserReward>
      items={rewards}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      renderItem={(reward) => <RewardCard key={reward.id} reward={reward} />}
      renderSkeleton={() => <RewardCardSkeleton />}
      renderEmptyState={() => <EmptyState />}
    />
  );
};
