import { AreaBumpComputedSerie } from '@nivo/bump';
import { TrendingDown, TrendingUp, ArrowRight, X } from '@/components/shared/Icons';
import { Separator } from '@/components/ui/separator';

export const AffinityTimelineTooltip = (props: {
  onDismiss: () => void;
  serie: AreaBumpComputedSerie<
    { x: string; y: number },
    { id: string; data: { x: string; y: number }[] }
  >;
}) => {
  const {
    serie: { id: label, data, color },
    onDismiss,
  } = props;

  const first = data.data[0];
  const last = data.data[data.data.length - 1];
  const isTrendingUp = last.y > first.y;

  return (
    <div
      className="card relative z-50 flex flex-col gap-2 p-2"
      onClick={() => console.log('clicked')}
    >
      <button
        onClick={() => {
          console.log('aksjdalskda');
          onDismiss();
        }}
        className="absolute top-2 right-2 rounded hover:bg-gray-100"
      >
        <X size={12} />
      </button>

      <div className="flex items-center gap-2 text-sm font-bold" style={{ color: color }}>
        {label}
        {isTrendingUp ? <TrendingUp /> : <TrendingDown />}
      </div>

      <Separator />
      <div className="font-xs flex items-center gap-2 font-bold">
        <span>{first.y.toFixed(1)}%</span>
        <ArrowRight className="h-3 w-3" />
        <span>{last.y.toFixed(1)}%</span>
      </div>
    </div>
  );
};
