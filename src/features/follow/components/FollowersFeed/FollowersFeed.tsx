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
  <div className="text-foreground py-8 text-center">
    <div className="mb-2 text-lg">This user has no followers</div>
  </div>
);
