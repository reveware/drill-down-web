import React, { useEffect, useMemo, useState } from 'react';
import { TimeBomb } from '@/types/time-bombs';
import { Card } from '@/components/ui/card';
import { UserAvatar } from '@/components/shared/user-avatar/user-avatar';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/shared/button/button';
import { Timebomb } from '@/assets/images';
import Image from 'next/image';

interface UpcomingTimebombCardProps {
  timebomb: TimeBomb | null;
}

function formatTime(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

export const UpcomingTimebombCard: React.FC<UpcomingTimebombCardProps> = ({ timebomb }) => {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (!timebomb) return;
    const unlockTime = new Date(timebomb.unlocks_at).getTime();
    const update = () => setRemaining(Math.max(0, unlockTime - Date.now()));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [timebomb]);

  const formattedTime = useMemo(() => formatTime(remaining), [remaining]);

  const Placeholder = (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="font-title text-lg font-semibold text-foreground mb-4">
        No upcoming Timebombs
      </div>
      <Image src={Timebomb} alt="No Timebomb" className="h-64 mb-4 object-cover" />
      <div className="text-sm text-muted-foreground">Check back later for surprises!</div>
    </div>
  );

  return (
    <Card className="card p-6 space-y-4">
      {timebomb ? (
        <>
          <div className="flex items-center gap-3">
            <UserAvatar user={timebomb.author} />
            <div>
              <div className="font-semibold text-lg text-foreground">
                {timebomb.author.username}
              </div>
              <div className="text-xs text-muted-foreground">Sent you a Timebomb!</div>
            </div>
          </div>

          <div className="relative h-64 rounded-md overflow-hidden">
            <Image
              src={Timebomb}
              alt="Timebomb background"
              fill
              className="object-cover opacity-50 brightness-70"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-5xl font-title font-bold tracking-widest neon-text">
                {formattedTime}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="text-sm text-muted-foreground mb-4">
              Unlocks {formatDistanceToNow(new Date(timebomb.unlocks_at), { addSuffix: true })}
            </div>
            <Button variant="outline" className="w-full">
              Send timebomb
            </Button>
          </div>
        </>
      ) : (
        Placeholder
      )}
    </Card>
  );
};
