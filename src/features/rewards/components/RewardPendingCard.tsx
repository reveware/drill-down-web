'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export const RewardPendingCard = () => {
  return (
    <Card className="card border-dashed">
      <CardContent className="flex items-center gap-2">
        <Loader2 className="text-primary h-5 w-5 animate-spin" />
        <div className="flex flex-col gap-1">
          <div className="text-muted-foreground text-sm font-medium">
            Your reward is being generated
          </div>
          <div className="text-muted text-xs">Personalized assets can take a little while.</div>
        </div>
      </CardContent>
    </Card>
  );
};
