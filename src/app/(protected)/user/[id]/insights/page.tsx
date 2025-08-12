'use client';
import { useParams } from 'next/navigation';
import { AffinityTimeline } from '@/features/affinity';

export default function UserInsightsPage() {
  const params = useParams();
  const userId = params.id as string;

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-2 py-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Insights</h1>
        <p className="mt-2 text-gray-600">Explore your affinity patterns over time</p>
      </div>

      <div className="h-[700px] w-full">
        <AffinityTimeline userId={userId} />
      </div>
    </div>
  );
}
