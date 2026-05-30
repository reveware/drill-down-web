'use client';
import { useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PaginatedResponse } from '@/types/pagination';
import { ACTIVE_GENERATION_STATUSES, RewardGeneration } from '@/types/rewardGeneration';
import { RewardsApi } from '@/api/endpoints/rewards.api';

export const ACTIVE_REWARD_GENERATIONS_KEY = ['reward-generations', 'active'] as const;

export const useActiveRewardGenerations = (enabled: boolean = true) => {
  const queryClient = useQueryClient();

  const query = useQuery<PaginatedResponse<RewardGeneration>>({
    queryKey: ACTIVE_REWARD_GENERATIONS_KEY,
    queryFn: () => RewardsApi.getActiveRewardGenerations(ACTIVE_GENERATION_STATUSES),
    enabled,
    refetchInterval: 10_000,
  });

  const generations = query.data?.data ?? [];

  const previousCountRef = useRef(generations.length);
  useEffect(() => {
    const currentCount = generations.length;
    if (currentCount < previousCountRef.current) {
      queryClient.invalidateQueries({ queryKey: ['rewards'] });
    }
    previousCountRef.current = currentCount;
  }, [generations.length, queryClient]);

  return {
    generations,
    isLoading: query.isLoading,
  };
};
