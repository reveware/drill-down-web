'use client';
import { useParams } from 'next/navigation';
import { ProfileOverview, UserTags, ProfileContent, useUserProfile } from '@/features/user';
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
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <ProfileOverview user={user} />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-7xl justify-center px-2 py-4">
      {/* Mobile: Single column layout */}
      <div className="flex w-full flex-col gap-6 md:hidden">
        <ProfileOverview user={user} />
        <UserTags userId={user.id} />
        <ProfileContent user={user} />
      </div>

      {/* Desktop: Two column layout */}
      <div className="hidden h-full w-full justify-center gap-6 md:flex">
        {/* Left column: ProfileOverview and ProfileStats */}
        <div className="flex min-w-sm flex-col gap-4">
          <ProfileOverview user={user} />
          <UserTags userId={user.id} />
        </div>
        <div className="flex w-full items-center justify-center">
          <ProfileContent user={user} />
        </div>
      </div>
    </div>
  );
}
