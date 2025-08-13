'use client';
import { useParams } from 'next/navigation';
import { AffinityTimeline } from '@/features/affinity';

export default function UserInsightsPage() {
  const params = useParams();
  const userId = params.id as string;

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-2 py-4">
      <h2 className="text-md font-title text-2xl font-bold">Insights</h2>
      <p className="text-muted text-sm">Explore your affinity patterns over time.</p>

      <div className="h-[700px] w-full">
        <AffinityTimeline userId={userId} />
      </div>
    </div>
  );
}
