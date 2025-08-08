'use client';
import { UserReward } from '@/types/reward';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { PixelTransition } from '@/components/shared/PixelTransition/PixelTransition';
import { useRewardReveal } from '../hooks/useRewardReveal';

interface RewardCardProps {
  reward: UserReward;
}

export const RewardCard = ({ reward }: RewardCardProps) => {
  const [isRevealed, setIsRevealed] = useState(Boolean(reward.revealed_at));
  const revealMutation = useRewardReveal();

  const handleReveal = () => {
    if (!isRevealed && !revealMutation.isPending) {
      setIsRevealed(true);
      revealMutation.mutate(reward.id);
    }
  };

  const HiddenContent = () => {
    return (
      <div
        className="bg-primary flex h-full w-full cursor-pointer flex-col p-4 text-white"
        onClick={handleReveal}
      >
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="text-2xl font-bold tracking-widest">🔒</div>
          <div className="text-xl font-bold tracking-widest">Tap to reveal</div>
        </div>

        {/* Description at the bottom */}
        <div className="overflow-hidden">
          <div className="line-clamp-6 text-xs leading-relaxed opacity-70">
            {reward.description}
          </div>
        </div>
      </div>
    );
  };

  const RevealedContent = () => {
    return (
      <div>
        <Image
          src={reward.content}
          alt={reward.description}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-full flex-col justify-end p-4">
            <p className="mb-1 text-sm font-medium text-white">{reward.description}</p>
            <p className="text-xs text-gray-200">
              {formatDistanceToNow(new Date(reward.created_at), { addSuffix: true })}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`group bg-card relative h-full w-full overflow-hidden rounded-lg`}>
      <div className="relative h-full overflow-hidden">
        {isRevealed ? (
          <RevealedContent />
        ) : (
          <PixelTransition
            pixelColor="black"
            firstContent={<HiddenContent />}
            secondContent={<RevealedContent />}
          />
        )}
      </div>
    </div>
  );
};
