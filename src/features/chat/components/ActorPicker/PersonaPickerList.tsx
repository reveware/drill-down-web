'use client';

import { usePersonaSearch } from '@/features/persona/hooks/usePersonaSearch';
import { PersonaOverview } from '@/types/persona';
import { PickerList, PickerRow } from '@/components/shared';

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
  <div className="flex h-full flex-col items-center justify-center p-8 text-center">
    <div className="mb-4 text-6xl">{isSearching ? '🔍' : '🤖'}</div>
    <h2 className="mb-2 text-2xl font-bold">
      {isSearching ? 'No matches' : 'No personas available'}
    </h2>
    <p className="text-muted-foreground max-w-md">
      {isSearching ? 'Try a different name.' : 'No active personas right now. Check back later.'}
    </p>
  </div>
);
