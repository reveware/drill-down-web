'use client';

import { ResponsiveRadar } from '@nivo/radar';
import { AffinityType, UserAffinityScore } from '@/types/affinity';
import { cn } from '@/lib/utils';
import { AffinityRadarTooltip } from './AffinityRadarTooltip';
import { ColorDot } from '@/components/shared/ColorDot/ColorDot';

interface AffinityRadarProps {
  data: UserAffinityScore;
  className?: string;
}

const DEFAULT_ORDER: AffinityType[] = [
  AffinityType.TAG,
  AffinityType.STYLE,
  AffinityType.THEME,
  AffinityType.MOOD,
];

export const RADAR_COLORS = {
  onlyA: '#e620a6', // Fuchsia - only A
  onlyB: '#07d9c4', // Turquoise - only B
  shared: '#f5ae48', // Gold - shared
};

export function AffinityRadar({ data, className }: AffinityRadarProps) {
  const { score, users } = data;

  const usernameA = users.a.username || 'A';
  const usernameB = users.b.username || 'B';

  const axisOrder = score.meta.type_order ?? DEFAULT_ORDER;

  const radarData = axisOrder.map((type) => {
    const metrics = score.by_type?.[type];
    const shared = metrics?.affinities.shared ?? [];
    const onlyA = metrics?.affinities.only_a ?? [];
    const onlyB = metrics?.affinities.only_b ?? [];

    const total = shared.length + onlyA.length + onlyB.length || 1;

    return {
      type,
      [usernameA]: ((onlyA.length + shared.length) / total) * 100,
      [usernameB]: ((onlyB.length + shared.length) / total) * 100,
      shared: (shared.length / total) * 100,
      affinities: {
        shared,
        onlyA,
        onlyB,
      },
    };
  });

  const isEmpty = radarData.every(
    (row) => row[usernameA] === 0 && row[usernameB] === 0 && row.shared === 0
  );

  if (isEmpty) {
    return (
      <div className="rounded-xl bg-gradient-to-b from-slate-900 to-black p-6 text-center text-white/60 shadow-md">
        Not enough affinity data to compare these users yet.
      </div>
    );
  }

  return (
    <div className={cn('card w-full rounded-xl p-4', className)}>
      <div className="flex justify-between">
        <div className="font-xl font-title font-semibold">Radar</div>

        <div className="text-foreground flex flex-1 items-center justify-end gap-4 text-xs font-semibold">
          <LegendItem color={RADAR_COLORS.onlyA} label={usernameA} />
          <LegendItem color={RADAR_COLORS.onlyB} label={usernameB} />
          <LegendItem color={RADAR_COLORS.shared} label="Shared" />
        </div>
      </div>

      <div className="relative h-[400px] w-full">
        <ResponsiveRadar
          data={radarData}
          keys={[usernameA, usernameB, 'shared']}
          indexBy="type"
          maxValue={100}
          curve="cardinalClosed"
          margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
          borderWidth={2}
          borderColor={{ from: 'color' }}
          gridLevels={5}
          gridShape="linear"
          gridLabelOffset={16}
          dotSize={8}
          dotColor={{ from: 'color' }}
          dotBorderWidth={1}
          colors={[RADAR_COLORS.onlyA, RADAR_COLORS.onlyB, RADAR_COLORS.shared]}
          blendMode="screen"
          motionConfig="wobbly"
          theme={{
            text: {
              fill: 'var(--color-foreground)',
              fontSize: 10,
              fontWeight: 600,
              color: 'var(--color-foreground)',
            },
            grid: { line: { stroke: 'var(--color-border)', strokeWidth: 1 } },
            axis: {
              domain: { line: { stroke: 'var(--color-accent)' } },
              ticks: {
                line: { stroke: 'var(--color-border)' },
                text: { fill: 'var(--color-foreground)' },
              },
            },
          }}
          sliceTooltip={({ index }) => {
            const row = radarData.find((r) => r.type === index);
            return row ? (
              <AffinityRadarTooltip
                type={index as AffinityType}
                values={[
                  { label: usernameA, value: row[usernameA] as number, color: RADAR_COLORS.onlyA },
                  { label: usernameB, value: row[usernameB] as number, color: RADAR_COLORS.onlyB },
                  { label: 'shared', value: row.shared, color: RADAR_COLORS.shared },
                ]}
                affinities={row.affinities}
              />
            ) : null;
          }}
        />
      </div>
    </div>
  );
}

const LegendItem = ({ color, label }: { color: string; label: string }) => {
  return (
    <div className="flex items-center gap-2">
      <ColorDot color={color} />
      <span>{label}</span>
    </div>
  );
};
