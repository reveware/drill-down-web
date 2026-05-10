import { useUserFollowers } from '@/features/follow';
import { UserItem } from '@/features/user/components/UserItem/UserItem';
import { UserItemSkeleton } from '@/features/user/components/UserItem/UserItemSkeleton';
import { Feed } from '@/components/shared/Feed/Feed';
import { UserOverview } from '@/types/user';

export const FollowerFeed = ({ userId }: { userId: string }) => {
  const { followers, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useUserFollowers(userId);

  return (
    <Feed<UserOverview>
      items={followers}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      renderItem={(u) => <UserItem key={u.id} user={u} />}
      renderSkeleton={() => <UserItemSkeleton />}
      renderEmptyState={() => <EmptyState />}
    />
  );
};

const EmptyState = () => (
  <div className="flex min-h-4/5 flex-col items-center justify-center p-8 text-center">
    <div className="mb-4 text-6xl">🐦‍⬛</div>
    <h2 className="mb-2 text-2xl font-bold">No followers</h2>
    <p className="text-muted-foreground max-w-md">This user has no followers yet.</p>
  </div>
);
