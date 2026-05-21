'use client';
import { useRewards } from '../hooks/useRewards';
import { RewardCard } from './RewardCard';
import { RewardCardSkeleton } from './RewardCardSkeleton';
import { MasonryGallery } from '@/components/shared/MasonryGallery';
import { EmptyState } from '@/components/shared';
import { UserReward } from '@/types/reward';

export const RewardsGallery = () => {
  const { rewards, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useRewards();

  return (
    <MasonryGallery<UserReward>
      items={rewards}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      renderItem={(reward) => <RewardCard key={reward.id} reward={reward} />}
      renderSkeleton={() => <RewardCardSkeleton />}
      renderEmptyState={() => (
        <EmptyState
          emoji="🎁"
          title="No Rewards Yet"
          subtitle="Keep engaging with the platform to earn rewards."
        />
      )}
    />
  );
};
