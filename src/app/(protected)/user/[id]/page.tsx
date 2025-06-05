'use client';
import { useParams } from 'next/navigation';
import { ProfileOverview, ProfileStats, ProfileContent, useUserProfile } from '@/features/user';
import { Spinner } from '@/components/shared';

export default function UserProfilePage() {
  const params = useParams();
  const userId = params.id as string;
  const { data: user, isPending: isProfileUserLoading } = useUserProfile(+userId);

  if (isProfileUserLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  const canViewFullProfile =
    user.is_self || !user.is_private || (user.is_private && user.is_following);

  if (!canViewFullProfile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-6">
        <div className="w-full max-w-2xl">
          <ProfileOverview user={user} />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 flex items-center justify-center mx-auto">
      {/* Mobile: Single column layout */}
      <div className="flex flex-col gap-6 md:hidden">
        <ProfileOverview user={user} />
        <ProfileStats user={user} />
        <ProfileContent user={user} />
      </div>

      {/* Desktop: Two column layout */}
      <div className="hidden md:flex justify-center gap-6">
        {/* Left column: ProfileOverview and ProfileStats */}
        <div className="flex flex-col gap-4">
          <ProfileOverview user={user} />
          <ProfileStats user={user} />
        </div>
        <div>
          <ProfileContent user={user} />
        </div>
      </div>
    </div>
  );
}
