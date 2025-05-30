'use client';

import { useParams } from 'next/navigation';
import { ProfileHeader, ProfileStats, ProfileContent, useUserProfile } from '@/features/user';
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

  return (
    <div className="flex flex-col gap-6 h-full p-6 w-full mx-auto border-1 border-red-500">
      <ProfileHeader user={user} />
      <ProfileStats user={user} />
      <ProfileContent user={user} />
    </div>
  );
}
