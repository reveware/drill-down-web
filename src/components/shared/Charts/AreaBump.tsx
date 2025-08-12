'use client';

import { ResponsiveAreaBump, AreaBumpComputedSerie } from '@nivo/bump';
import { format } from 'date-fns';

interface AreaBumpProps {
  key: number;
  labels: { x: string; y: string };
  data: Array<{
    id: string;
    data: { x: string; y: number }[];
  }>;
  getTooltip: (props: {
    serie: AreaBumpComputedSerie<
      { x: string; y: number },
      { id: string; data: { x: string; y: number }[] }
    >;
  }) => React.ReactNode;
}

export const AreaBump = (props: AreaBumpProps) => {
  const { labels, data, getTooltip } = props;
  return (
    <div className="h-full w-full">
      <ResponsiveAreaBump
        data={data}
        borderWidth={2}
        align="middle"
        margin={{ top: 0, bottom: 50, left: 20, right: 20 }}
        spacing={20}
        colors={{ scheme: 'dark2' }}
        blendMode="saturation"
        enableGridX={true}
        animate={true}
        motionConfig={{
          mass: 1,
          tension: 10,
          friction: 0.8,
          clamp: true,
        }}
        startLabel={false}
        endLabel={true}
        axisTop={null}
        axisBottom={{
          format: (value) => format(value, 'MM/dd'),
          tickSize: 0,
          legend: labels.x,
          legendPosition: 'middle',
          legendOffset: 40,
        }}
        tooltip={getTooltip}
        theme={{
          background: 'var(--color-background)',
          axis: {
            ticks: {
              text: { fill: 'var(--color-foreground)' },
            },
          },
        }}
        layers={[
          'grid',
          'areas',
          'axes',
          ({ series }) =>
            series.map((serie) => {
              const lastPoint = serie.areaPoints[serie.areaPoints.length - 1];
              return (
                <text
                  key={serie.id}
                  x={lastPoint.x - 8}
                  y={(lastPoint.y0 + lastPoint.y1) / 2}
                  alignmentBaseline="middle"
                  textAnchor="end"
                  fill={serie.color}
                  fontSize={12}
                  fontWeight="bold"
                  stroke="var(--color-background)"
                  fontFamily="var(--font-title)"
                  strokeWidth={3}
                  paintOrder="stroke"
                  letterSpacing={1.5}
                >
                  {serie.id}
                </text>
              );
            }),
        ]}
      />
    </div>
  );
};
