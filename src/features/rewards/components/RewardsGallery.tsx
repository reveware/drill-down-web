'use client';
import { useMemo } from 'react';
import { useRewards } from '../hooks/useRewards';
import { useActiveRewardGenerations } from '../hooks/useActiveRewardGenerations';
import { RewardCard } from './RewardCard';
import { RewardCardSkeleton } from './RewardCardSkeleton';
import { RewardGenerationCard } from './RewardGenerationCard';
import { MasonryGallery } from '@/components/shared/MasonryGallery';
import { EmptyState } from '@/components/shared';
import { UserReward } from '@/types/reward';
import { RewardGeneration } from '@/types/rewardGeneration';

type GalleryItem =
  | { kind: 'generation'; key: string; generation: RewardGeneration }
  | { kind: 'reward'; key: string; reward: UserReward };

export const RewardsGallery = () => {
  const { rewards, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useRewards();
  const { generations } = useActiveRewardGenerations();

  const items = useMemo<GalleryItem[]>(() => {
    const sortedGenerations = [...generations].sort(
      (a, b) => new Date(b.enqueued_at).getTime() - new Date(a.enqueued_at).getTime()
    );
    return [
      ...sortedGenerations.map<GalleryItem>((g) => ({
        kind: 'generation',
        key: `gen-${g.id}`,
        generation: g,
      })),
      ...rewards.map<GalleryItem>((r) => ({
        kind: 'reward',
        key: `reward-${r.id}`,
        reward: r,
      })),
    ];
  }, [rewards, generations]);

  return (
    <MasonryGallery<GalleryItem>
      items={items}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      renderItem={(item) =>
        item.kind === 'generation' ? (
          <RewardGenerationCard key={item.key} generation={item.generation} />
        ) : (
          <RewardCard key={item.key} reward={item.reward} />
        )
      }
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
