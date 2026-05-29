'use client';
import { UserReward } from '@/types/reward';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PixelTransition } from '@/components/shared/PixelTransition/PixelTransition';
import { ImageLightbox } from '@/components/shared';
import { useRewardReveal } from '../hooks/useRewardReveal';

interface RewardCardProps {
  reward: UserReward;
}

const HOLD_MS = 300;

export const RewardCard = ({ reward }: RewardCardProps) => {
  const [isRevealed, setIsRevealed] = useState(Boolean(reward.revealed_at));
  const revealMutation = useRewardReveal();

  const handleReveal = () => {
    if (!isRevealed && !revealMutation.isPending) {
      setIsRevealed(true);
      revealMutation.mutate(reward.id);
    }
  };

  return (
    <div className="bg-card relative h-full w-full overflow-hidden rounded-lg">
      <div className="relative h-full overflow-hidden">
        {isRevealed ? (
          <UnlockedContent reward={reward} />
        ) : (
          <PixelTransition
            pixelColor="black"
            firstContent={<LockedContent onReveal={handleReveal} />}
            secondContent={<UnlockedContent reward={reward} />}
          />
        )}
      </div>
    </div>
  );
};

const LockedContent = ({ onReveal }: { onReveal: () => void }) => (
  <div
    className="bg-card text-card-foreground flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 p-4 text-center"
    onClick={onReveal}
  >
    <div className="text-2xl">🔒</div>
    <div className="font-semibold tracking-widest">Tap to reveal</div>
  </div>
);

const UnlockedContent = ({ reward }: { reward: UserReward }) => {
  const [view, setView] = useState<'image' | 'description'>('image');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdFired = useRef(false);

  const startHold = () => {
    cancelHold();
    holdFired.current = false;
    holdTimer.current = setTimeout(() => {
      setView((v) => (v === 'image' ? 'description' : 'image'));
      holdFired.current = true;
      holdTimer.current = null;
    }, HOLD_MS);
  };
  const cancelHold = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  const handleImageClick = () => {
    if (holdFired.current) {
      holdFired.current = false;
      return;
    }
    setIsFullscreen(true);
  };

  return (
    <>
      <div
        className="relative h-full w-full select-none"
        onPointerDown={startHold}
        onPointerUp={cancelHold}
        onPointerLeave={cancelHold}
        onPointerCancel={cancelHold}
      >
        <AnimatePresence mode="wait" initial={false}>
          {view === 'image' ? (
            <motion.div
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleImageClick}
              className="absolute inset-0 cursor-zoom-in"
            >
              <Image
                src={reward.content}
                alt={reward.description}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </motion.div>
          ) : (
            <motion.div
              key="description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-card text-card-foreground absolute inset-0 overflow-y-auto p-4"
            >
              <p className="text-sm leading-relaxed">{reward.description}</p>
              <p className="text-muted-foreground mt-3 text-xs">
                {formatDistanceToNow(new Date(reward.created_at), { addSuffix: true })}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ImageLightbox
        open={isFullscreen}
        onOpenChange={setIsFullscreen}
        src={reward.content}
        alt={reward.description}
      />
    </>
  );
};
