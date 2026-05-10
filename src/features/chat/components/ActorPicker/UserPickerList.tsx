'use client';

import { useUserSearch } from '@/features/user/hooks/useUserSearch';
import { UserOverview } from '@/types/user';
import { PickerList, PickerRow } from '@/components/shared';

interface UserPickerListProps {
  query: string;
  onSelect: (userId: string) => void;
}

export const UserPickerList = ({ query, onSelect }: UserPickerListProps) => {
  const search = useUserSearch({ query, isFollowing: true });
  const isSearching = query.trim().length > 0;

  return (
    <PickerList
      items={search.users}
      isLoading={search.isLoading}
      isFetchingNextPage={search.isFetchingNextPage}
      hasNextPage={search.hasNextPage}
      fetchNextPage={search.fetchNextPage}
      renderRow={(user) => <UserRow key={user.id} user={user} onSelect={onSelect} />}
      renderEmpty={() => <UserEmpty isSearching={isSearching} />}
    />
  );
};

const UserRow = ({
  user,
  onSelect,
}: {
  user: UserOverview;
  onSelect: (userId: string) => void;
}) => {
  const fullName = `${user.first_name} ${user.last_name}`.trim();
  const fallback =
    `${user.first_name.charAt(0)}${user.last_name.charAt(0)}` || user.username.charAt(0);

  return (
    <PickerRow
      avatar={user.avatar}
      avatarAlt={user.username}
      avatarFallback={fallback}
      title={fullName || user.username}
      subtitle={`@${user.username}`}
      onClick={() => onSelect(user.id)}
    />
  );
};

const UserEmpty = ({ isSearching }: { isSearching: boolean }) => (
  <div className="flex h-full flex-col items-center justify-center p-8 text-center">
    <div className="mb-4 text-6xl">{isSearching ? '🔍' : '🫂'}</div>
    <h2 className="mb-2 text-2xl font-bold">
      {isSearching ? 'No matches' : 'No users to chat with yet'}
    </h2>
    <p className="text-muted-foreground max-w-md">
      {isSearching
        ? 'Try a different name or username.'
        : 'You can only message users you follow. Follow someone to start a conversation.'}
    </p>
  </div>
);
