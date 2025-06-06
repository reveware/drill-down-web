import { UserOverview } from '@/types/user';
import { UserItem } from './UserItem';
import { UserItemSkeleton } from './UserItemSkeleton';

interface UserListProps {
  users: UserOverview[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  loaderRef: React.RefObject<HTMLDivElement | null>;
}

export const UserList = ({ users, isLoading, isFetchingNextPage, loaderRef }: UserListProps) => {
  return (
    <div className="w-full px-2 py-4">
      {isLoading && <LoadingState />}

      {!isLoading && (
        <>
          {users.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="flex flex-col items-center gap-4">
                {users.map((user) => (
                  <UserItem key={user.id} user={user} />
                ))}
              </div>
            </>
          )}
        </>
      )}

      <div ref={loaderRef} className="text-center">
        {isFetchingNextPage && <UserItemSkeleton />}
      </div>
    </div>
  );
};

const LoadingState = () => (
  <div className="flex flex-col items-center space-y-3">
    {Array.from({ length: 5 }).map((_, index) => (
      <UserItemSkeleton key={index} />
    ))}
  </div>
);

const EmptyState = () => (
  <div className="text-muted-foreground py-8 text-center">
    <div className="mb-2 text-lg">Nothing yet</div>
    <div className="text-sm">Start connecting with other users!</div>
  </div>
);
