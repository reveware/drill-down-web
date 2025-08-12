import { useAffinityMatch } from '@/features/affinity';
import { Spinner } from '@/components/shared';
import { UserAffinityScore, AffinityOverlap, AffinityRadar } from '@/features/affinity';

export const AffinityMatch = ({ userId }: { userId: string }) => {
  const { data: matchData, isPending: isLoading, error } = useAffinityMatch(userId);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <div className="text-center">
          <Spinner />
          <p className="text-gray-600">Loading affinity match data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <div className="text-center">
          <h2 className="mb-2 text-xl font-semibold text-red-600">Error Loading Match Data</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!matchData) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <div className="text-center">
          <h2 className="mb-2 text-xl font-semibold text-gray-600">No Match Data Found</h2>
          <p className="text-gray-500">Unable to load affinity match information.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile: Single column layout */}
      <div className="flex w-full flex-col gap-6 md:hidden">
        <UserAffinityScore matchData={matchData} />
        <AffinityRadar data={matchData} />
        <AffinityOverlap matchData={matchData} />
      </div>

      {/* Desktop: Two column layout */}
      <div className="hidden h-full w-full justify-center gap-6 md:flex">
        <div className="flex w-full max-w-md flex-col gap-4">
          <UserAffinityScore matchData={matchData} />
          <AffinityRadar data={matchData} />
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-6">
          <AffinityOverlap matchData={matchData} />
        </div>
      </div>
    </>
  );
};
