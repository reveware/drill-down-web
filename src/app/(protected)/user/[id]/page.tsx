'use client';
import { useParams } from 'next/navigation';
import { ProfileOverview, useUserProfile, ProfileContent } from '@/features/user';
import { Spinner } from '@/components/shared';

export default function UserProfilePage() {
  const params = useParams();
  const userId = params.id as string;
  const { data: user, isPending: isProfileUserLoading } = useUserProfile(userId);

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
      <div className="mx-auto flex h-full w-full max-w-2xl flex-col p-4">
        <ProfileOverview user={user} />
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-4 md:h-full md:min-h-0">
      <div className="flex w-full flex-col gap-4 md:hidden">
        <ProfileOverview user={user} />
        <ProfileContent user={user} />
      </div>

      <div className="hidden min-h-0 w-full flex-1 justify-center gap-4 md:flex">
        <div className="flex min-w-sm flex-col">
          <ProfileOverview user={user} />
        </div>
        <div className="flex min-h-0 w-full flex-1">
          <ProfileContent user={user} />
        </div>
      </div>
    </div>
  );
}
