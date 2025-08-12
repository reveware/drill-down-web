'use client';
import { Affinity, AffinityType } from '@/types/affinity';
import { ColorDot } from '@/components/shared/ColorDot/ColorDot';
import { Separator } from '@/components/ui/separator';

interface AffinityRadarTooltipProps {
  type: AffinityType;

  values: { label: string; value: number; color: string }[];
  affinities: {
    shared: Affinity[];
    onlyA: Affinity[];
    onlyB: Affinity[];
  };
}

export const AffinityRadarTooltip = ({ type, values, affinities }: AffinityRadarTooltipProps) => {
  return (
    <div className="card min-w-fit rounded-md border p-2">
      <div className="mb-2 text-sm font-semibold">{type}</div>

      <div className="flex flex-col gap-1 p-2">
        {values.map((value, index) => (
          <div key={index} className="flex items-center gap-2 text-xs whitespace-nowrap">
            <ColorDot color={value.color} /> <span className="font-semibold">{value.label}:</span>
            <span>{Math.round(value.value)}%</span>
          </div>
        ))}
      </div>

      <Separator className="my-2" />

      {affinities.shared.length > 0 && (
        <div className="mt-2 text-white/80">
          <div className="flex flex-wrap gap-1">
            {affinities.shared.slice(0, 10).map((label) => (
              <span key={label.slug} className="rounded-full bg-white/10 px-2 py-0.5 text-[10px]">
                {label.name || label.slug}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
