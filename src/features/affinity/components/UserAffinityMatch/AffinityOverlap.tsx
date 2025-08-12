'use client';
import { useState } from 'react';
import { UserAffinityScore, AffinityType } from '@/types/affinity';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from '@/components/shared/Icons';

interface AffinityOverlapProps {
  matchData: UserAffinityScore;
}

export function AffinityOverlap({ matchData }: AffinityOverlapProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="h-full w-full p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-title text-foreground text-lg font-semibold">Shared Affinities</h3>
        <Button variant="ghost" size="sm" onClick={toggleExpanded} className="h-8 w-8 p-0">
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {isExpanded &&
          (matchData.score.meta?.type_order || []).map((affinityType: AffinityType) => {
            const metrics = matchData.score.by_type?.[affinityType];
            if (!metrics) return null;

            const sharedAffinities = metrics.affinities.shared || [];

            return (
              <Card key={affinityType} className="card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <CardTitle className="text-md text-foreground font-semibold">
                        {affinityType}
                      </CardTitle>
                      <div className="text-muted flex gap-2 text-xs">
                        <div>
                          <span className="font-medium">Strength:</span> {metrics.strength}%
                        </div>
                        <div>
                          <span className="font-medium">Count:</span> {metrics.counts.shared}/
                          {metrics.counts.a + metrics.counts.b}
                        </div>
                      </div>
                    </div>

                    <div className="text-accent text-xl font-bold">{metrics.overall}%</div>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Progress bar */}
                  <Progress value={metrics.overall} className="h-2" />

                  {/* Shared affinities */}
                  {sharedAffinities.length > 0 && (
                    <div className="transition-all duration-200 ease-in-out">
                      <p className="text-foreground mt-2 mb-2 text-xs">Shared affinities:</p>
                      <div className="flex flex-wrap gap-2">
                        {sharedAffinities.map((affinity, index) => (
                          <span
                            key={index}
                            className="text-muted bg-surface-50 rounded-md px-2 py-1 text-xs"
                          >
                            {affinity.slug}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
