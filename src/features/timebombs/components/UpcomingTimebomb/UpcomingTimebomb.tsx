'use client';
import React from 'react';
import { TimeBomb } from '@/types/time-bombs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserAvatar } from '@/components/shared/';
import { formatDistanceToNow } from 'date-fns';
import { Timebomb } from '@/assets/images';
import Image from 'next/image';
import { useCountdown } from '../../hooks/useCountdown';
import { formatCountdownPadded } from '../../formatCountdown';
import { UserInfo } from '@/components/shared/UserInfo/UserInfo';

interface Props {
  timebomb: TimeBomb | null;
}

export const UpcomingTimebomb: React.FC<Props> = ({ timebomb }) => {
  const remaining = useCountdown(timebomb?.unlocks_at);
  const formatted = formatCountdownPadded(remaining);

  return (
    <Card className="card max-w-lg">
      <CardHeader>
        <CardTitle className="font-title text-lg font-semibold">Upcoming Timebomb</CardTitle>
      </CardHeader>

      <CardContent className="flex h-full flex-col gap-4 px-4">
        {!timebomb && <EmptyState />}
        {timebomb && (
          <>
            <div className="flex items-center gap-3">
              <UserAvatar user={timebomb.author} />
              <UserInfo user={timebomb.author} subtitle="Sent you a Timebomb!" />
            </div>
            <Countdown time={formatted} />
            <Footer unlocksAt={timebomb.unlocks_at} />
          </>
        )}
      </CardContent>
    </Card>
  );
};

const EmptyState: React.FC = () => (
  <div className="flex h-full flex-col items-center justify-evenly gap-4 text-center">
    <div className="text-foreground text-lg">No upcoming Timebombs</div>
    <Image src={Timebomb} alt="No Timebomb" className="h-64 object-cover" />
    <div className="text-muted-foreground text-sm">Check back later for surprises!</div>
  </div>
);

const Countdown: React.FC<{ time: string }> = ({ time }) => (
  <div className="bg-primary flex items-center justify-center rounded-md p-4">
    <div className="font-title neon-text text-lg font-bold tracking-widest sm:text-2xl md:text-3xl lg:text-5xl">
      {time}
    </div>
  </div>
);

const Footer: React.FC<{ unlocksAt: string }> = ({ unlocksAt }) => (
  <div className="flex flex-col items-center justify-center">
    <div className="text-muted-foreground mb-4 text-sm">
      Unlocks {formatDistanceToNow(new Date(unlocksAt), { addSuffix: true })}
    </div>
  </div>
);
