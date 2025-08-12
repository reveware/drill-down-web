import { AffinityTimelineBucket } from '@/types/affinity';

export function toAreaBumpSeries(
  buckets: AffinityTimelineBucket[],
  type: string
): {
  id: string;
  data: { x: string; y: number }[];
}[] {
  const grouped: Record<string, Record<string, number>> = {};

  for (const b of buckets) {
    if (b.type !== type) continue;

    if (!grouped[b.slug]) grouped[b.slug] = {};
    grouped[b.slug][b.bucket.slice(0, 10)] = b.total_weight;
  }

  const allDates = Array.from(new Set(buckets.map((b) => b.bucket.slice(0, 10)))).sort();

  return Object.entries(grouped).map(([slug, values]) => ({
    id: slug,
    data: allDates.map((date) => ({
      x: date,
      y: values[date] ?? 0,
    })),
  }));
}
