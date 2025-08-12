'use client';

import { ResponsiveRadar } from '@nivo/radar';

interface RadarProps {
  data: Array<{
    [key: string]: number;
  }>;
  keys: string[];
  indexBy: string;
  maxValue?: number;
  colors?: string[];
  sliceTooltip?: (props: { index: string | number }) => React.ReactNode;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export const Radar = ({
  data,
  keys,
  indexBy,
  maxValue = 100,
  colors = ['#e620a6', '#07d9c4', '#f5ae48'],
  sliceTooltip,
  margin = { top: 50, right: 50, bottom: 50, left: 50 },
}: RadarProps) => {
  return (
    <div className="relative h-[400px] w-full">
      <ResponsiveRadar
        data={data}
        keys={keys}
        indexBy={indexBy}
        maxValue={maxValue}
        curve="cardinalClosed"
        margin={margin}
        borderWidth={2}
        borderColor={{ from: 'color' }}
        gridLevels={5}
        gridShape="linear"
        gridLabelOffset={16}
        dotSize={8}
        dotColor={{ from: 'color' }}
        dotBorderWidth={1}
        colors={colors}
        blendMode="screen"
        motionConfig="wobbly"
        theme={{
          text: {
            fill: 'var(--color-foreground)',
            fontSize: 10,
            fontWeight: 600,
            color: 'var(--color-foreground)',
          },
          grid: {
            line: { stroke: 'var(--color-border)', strokeWidth: 1 },
          },
          axis: {
            domain: { line: { stroke: 'var(--color-accent)' } },
            ticks: {
              line: { stroke: 'var(--color-border)' },
              text: { fill: 'var(--color-foreground)' },
            },
          },
        }}
        sliceTooltip={sliceTooltip}
      />
    </div>
  );
};
