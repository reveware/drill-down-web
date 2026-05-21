import { useAffinityMatch } from '@/features/affinity';
import { EmptyState, Spinner } from '@/components/shared';
import { UserAffinityScore, AffinityOverlap, AffinityRadar } from '@/features/affinity';

export const AffinityMatch = ({ userId }: { userId: string }) => {
  const { data: matchData, isPending: isLoading, error } = useAffinityMatch(userId);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <div className="text-center">
          <Spinner />
          <p className="text-muted-foreground">Loading affinity match data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        className="min-h-[60vh]"
        emoji="⚠️"
        title="Error Loading Match Data"
        subtitle={error.message}
      />
    );
  }

  if (!matchData) {
    return (
      <EmptyState
        className="min-h-[60vh]"
        emoji="🧬"
        title="No Match Data Found"
        subtitle="Unable to load affinity match information."
      />
    );
  }

  return (
    <>
      <div className="flex w-full flex-col gap-6 md:hidden">
        <UserAffinityScore matchData={matchData} />
        <AffinityRadar data={matchData} />
        <AffinityOverlap matchData={matchData} />
      </div>

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
