'use client';

import { useUserSearch } from '@/features/user/hooks/useUserSearch';
import { UserOverview } from '@/types/user';
import { PickerList, PickerRow, EmptyState } from '@/components/shared';

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

  return (
    <PickerRow
      avatar={user.avatar}
      title={fullName || user.username}
      subtitle={`@${user.username}`}
      onClick={() => onSelect(user.id)}
    />
  );
};

const UserEmpty = ({ isSearching }: { isSearching: boolean }) => (
  <EmptyState
    emoji={isSearching ? '🔍' : '🫂'}
    title={isSearching ? 'No matches' : 'No users to chat with yet'}
    subtitle={
      isSearching
        ? 'Try a different name or username.'
        : 'You can only message users you follow. Go Follow someone!'
    }
  />
);
