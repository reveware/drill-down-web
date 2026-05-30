'use client';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Loader2, RotateCw, Sparkles } from '@/components/shared/Icons';
import { cn } from '@/lib/utils';
import { JobStatus, RewardGeneration } from '@/types/rewardGeneration';
import { useRetryRewardGeneration } from '../hooks/useRetryRewardGeneration';

interface RewardGenerationCardProps {
  generation: RewardGeneration;
}

export const RewardGenerationCard = ({ generation }: RewardGenerationCardProps) => {
  if (generation.status === JobStatus.FAILED) {
    return <FailedCard generation={generation} />;
  }
  return <PendingCard isStarted={generation.status === JobStatus.IN_PROGRESS} />;
};

const PendingCard = ({ isStarted }: { isStarted: boolean }) => (
  <div className="bg-card text-card-foreground border-border/60 flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-4 text-center">
    <div className="relative">
      <Sparkles className="text-primary h-6 w-6" />
      <Loader2 className="text-muted-foreground absolute -top-1 -right-3 h-3 w-3 animate-spin" />
    </div>
    <div className="text-sm font-medium">{isStarted ? 'Generating your reward' : 'Queued'}</div>
    <div className="text-muted-foreground text-xs">
      Personalized assets can take a little while.
    </div>
  </div>
);

const FailedCard = ({ generation }: { generation: RewardGeneration }) => {
  const retry = useRetryRewardGeneration();

  return (
    <div className="bg-card text-card-foreground border-destructive/30 flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg border p-4 text-center">
      <AlertTriangle className="text-destructive h-6 w-6" />
      <div className="text-sm font-medium">{"Couldn't generate reward"}</div>
      {generation.error_message && (
        <div className="text-muted-foreground line-clamp-2 text-xs">{generation.error_message}</div>
      )}
      <Button
        size="sm"
        variant="outline"
        disabled={retry.isPending}
        onClick={() => retry.mutate(generation.id)}
        className="mt-1"
      >
        <RotateCw className={cn('mr-1.5 h-3 w-3', retry.isPending && 'animate-spin')} />
        Try again
      </Button>
    </div>
  );
};
