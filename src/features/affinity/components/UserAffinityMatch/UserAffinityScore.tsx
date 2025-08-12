'use client';
import { UserAffinityScore as Score } from '@/types/affinity';
import { Card, CardContent } from '@/components/ui/card';
import { UserInfo } from '@/components/shared/UserInfo/UserInfo';
import { UserAvatar } from '@/components/shared/UserAvatar/UserAvatar';
import { Dna } from '@/components/shared/Icons';

interface UserAffinityScoreProps {
  matchData: Score;
}

export function UserAffinityScore({ matchData }: UserAffinityScoreProps) {
  return (
    <div>
      <Card className="card">
        <CardContent className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-foreground font-title text-xl font-semibold">
                Affinity Match
              </span>

              <span className="text-muted text-sm">Overall compatibility score</span>
            </div>

            <span className="text-accent flex items-center gap-2 text-3xl font-bold tracking-widest">
              <Dna />
              {matchData.score.overall}%
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-1 items-center gap-2">
              <UserAvatar user={matchData.users.a} />
              <UserInfo user={matchData.users.a} subtitle={` `} />
            </div>
            <div className="flex flex-1 items-center gap-2">
              <UserAvatar user={matchData.users.b} />
              <UserInfo user={matchData.users.b} subtitle={` `} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
