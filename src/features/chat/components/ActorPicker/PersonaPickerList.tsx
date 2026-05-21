'use client';

import { usePersonaSearch } from '@/features/persona/hooks/usePersonaSearch';
import { PersonaOverview } from '@/types/persona';
import { PickerList, PickerRow, EmptyState } from '@/components/shared';

interface PersonaPickerListProps {
  query: string;
  onSelect: (personaSlug: string) => void;
}

export const PersonaPickerList = ({ query, onSelect }: PersonaPickerListProps) => {
  const search = usePersonaSearch({ query, isActive: true });
  const isSearching = query.trim().length > 0;

  return (
    <PickerList
      items={search.personas}
      isLoading={search.isLoading}
      isFetchingNextPage={search.isFetchingNextPage}
      hasNextPage={search.hasNextPage}
      fetchNextPage={search.fetchNextPage}
      renderRow={(persona) => <PersonaRow key={persona.id} persona={persona} onSelect={onSelect} />}
      renderEmpty={() => <PersonaEmpty isSearching={isSearching} />}
    />
  );
};

const PersonaRow = ({
  persona,
  onSelect,
}: {
  persona: PersonaOverview;
  onSelect: (slug: string) => void;
}) => (
  <PickerRow
    avatar={persona.avatar}
    title={persona.name}
    subtitle={persona.description}
    onClick={() => onSelect(persona.slug)}
  />
);

const PersonaEmpty = ({ isSearching }: { isSearching: boolean }) => (
  <EmptyState
    emoji={isSearching ? '🔍' : '🤖'}
    title={isSearching ? 'No matches' : 'No personas available'}
    subtitle={isSearching ? 'Try a different name.' : 'No active personas. Check back later.'}
  />
);
