'use client';

import { useState, useMemo, useRef } from 'react';
import { AffinityType, TimelineInterval } from '@/types/affinity';
import { useAffinityTimeline } from '@/features/affinity/hooks/useAffinityTimeline';
import { toAreaBumpSeries } from './toAreaBumpSeries';
import { AreaBump } from '@/components/shared/Charts/AreaBump';

import { AffinityTimelineTooltip } from './AffinityTimelineTooltip';
import { AffinityTimelineFilter } from './AffinityTimelineFilter';
import { format } from 'date-fns';

const LoadingState = () => (
  <div className="flex h-full items-center justify-center">
    <div className="text-center">
      <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
      <p className="text-gray-500">Loading timeline...</p>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="flex h-full items-center justify-center">
    <div className="text-center">
      <p className="text-lg text-gray-500">No timeline data available</p>
      <p className="text-sm text-gray-400">Try selecting a different affinity type</p>
    </div>
  </div>
);

interface AffinityTimelineProps {
  userId: string;
  className?: string;
}

export const AffinityTimeline = ({ userId, className = '' }: AffinityTimelineProps) => {
  const keyRef = useRef<number>(0);
  const [selectedType, setSelectedType] = useState<AffinityType>(AffinityType.TAG);
  const [selectedInterval, setSelectedInterval] = useState<TimelineInterval>(TimelineInterval.WEEK);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateRangeChange = (newStartDate: Date, newEndDate: Date) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const { data: timelineData, isPending: isLoading } = useAffinityTimeline(userId, {
    type: selectedType,
    interval: selectedInterval,
    start_date: startDate ? format(startDate, 'yyyy-MM-dd') : undefined,
    end_date: endDate ? format(endDate, 'yyyy-MM-dd') : undefined,
  });

  // Filter to top N affinities by total weight across all buckets
  const series = useMemo(() => {
    if (!timelineData?.buckets) return [];

    const raw = toAreaBumpSeries(timelineData.buckets, selectedType);
    const limit = 5;

    const topSlugs = [...raw]
      .map((serie) => ({
        id: serie.id,
        total: serie.data.reduce((acc, d) => acc + d.y, 0),
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, limit)
      .map((s) => s.id);

    return raw.filter((s) => topSlugs.includes(s.id));
  }, [timelineData, selectedType]);

  const handleTooltipDismiss = () => {
    console.log('dismissed');
    keyRef.current++;
  };

  return (
    <div className={`card flex h-full w-full flex-col gap-2 rounded-lg p-4 ${className}`}>
      <div className="flex justify-between px-4">
        <div className="font-xl font-title font-semibold">Timeline</div>
        <AffinityTimelineFilter
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          selectedInterval={selectedInterval}
          onIntervalChange={setSelectedInterval}
          onDateRangeChange={handleDateRangeChange}
        />
      </div>

      <div className="h-full min-h-[400px] flex-1">
        {isLoading ? (
          <LoadingState />
        ) : !timelineData?.buckets || timelineData.buckets.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="m-0 h-full w-full p-4">
            <AreaBump
              key={keyRef.current}
              labels={{ x: 'Time', y: 'Affinity' }}
              data={series}
              getTooltip={(props) => (
                <AffinityTimelineTooltip serie={props.serie} onDismiss={handleTooltipDismiss} />
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
};
