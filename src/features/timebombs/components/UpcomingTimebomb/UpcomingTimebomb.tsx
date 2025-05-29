import React from 'react';
import { TimeBomb } from '@/types/time-bombs';
import { Card } from '@/components/ui/card';
import { UserAvatar, Button } from '@/components/shared/';
import { formatDistanceToNow } from 'date-fns';
import { Timebomb } from '@/assets/images';
import Image from 'next/image';
import { useCountdown } from '../../hooks/useCountdown';
import { formatCountdownPadded } from '../../formatCountdown';

interface Props {
  timebomb: TimeBomb | null;
}

export const UpcomingTimebomb: React.FC<Props> = ({ timebomb }) => {
  const remaining = useCountdown(timebomb?.unlocks_at);
  const formatted = formatCountdownPadded(remaining);

  if (!timebomb) {
    return <EmptyState />;
  }

  return (
    <Card className="card p-6 space-y-4">
      <Header user={timebomb.author} />
      <Countdown time={formatted} />
      <Footer unlocksAt={timebomb.unlocks_at} />
    </Card>
  );
};

const EmptyState: React.FC = () => (
  <Card className="card p-6 flex flex-col items-center justify-center text-center space-y-4">
    <div className="font-title text-lg font-semibold text-foreground">No upcoming Timebombs</div>
    <Image src={Timebomb} alt="No Timebomb" className="h-64 object-cover" />
    <div className="text-sm text-muted-foreground">Check back later for surprises!</div>
  </Card>
);

const Header: React.FC<{ user: TimeBomb['author'] }> = ({ user }) => (
  <div className="flex items-center gap-3">
    <UserAvatar user={user} />
    <div>
      <div className="font-semibold text-lg text-foreground">{user.username}</div>
      <div className="text-xs text-muted-foreground">Sent you a Timebomb!</div>
    </div>
  </div>
);

const Countdown: React.FC<{ time: string }> = ({ time }) => (
  <div className="relative h-32 rounded-md overflow-hidden bg-primary">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-5xl font-title font-bold tracking-widest neon-text">{time}</div>
    </div>
  </div>
);

const Footer: React.FC<{ unlocksAt: string }> = ({ unlocksAt }) => (
  <div className="flex flex-col items-center justify-center">
    <div className="text-sm text-muted-foreground mb-4">
      Unlocks {formatDistanceToNow(new Date(unlocksAt), { addSuffix: true })}
    </div>
    <Button variant="outline" block>
      Send timebomb
    </Button>
  </div>
);
