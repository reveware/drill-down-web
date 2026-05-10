'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from '@/components/shared/Icons';
import { JoinError } from '@/types/chat';

interface JoinErrorStateProps {
  error: JoinError;
  onBack?: () => void;
}

export const JoinErrorState = ({ error, onBack }: JoinErrorStateProps) => (
  <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 p-8">
    {onBack && (
      <Button
        variant="ghost"
        size="icon"
        onClick={onBack}
        className="absolute top-4 left-4 h-8 w-8"
        aria-label="Back"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
    )}
    <p className="text-destructive text-sm font-medium">Failed to open chat</p>
    <p className="text-muted-foreground text-center text-xs">{error.message}</p>
    <Button variant="outline" size="sm" onClick={error.retry}>
      Retry
    </Button>
  </div>
);
