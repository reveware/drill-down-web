'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from '@/components/shared/Icons';
import { ModeToggle } from '@/components/shared';
import { UserPickerList } from './UserPickerList';
import { PersonaPickerList } from './PersonaPickerList';

type Mode = 'users' | 'personas';

const MODE_OPTIONS = [
  { value: 'users' as const, label: 'Users' },
  { value: 'personas' as const, label: 'Personas' },
];

interface ActorPickerProps {
  onSelectUser: (userId: string) => void;
  onSelectPersona: (personaSlug: string) => void;
}

export const ActorPicker = ({ onSelectUser, onSelectPersona }: ActorPickerProps) => {
  const [mode, setMode] = useState<Mode>('users');
  const [query, setQuery] = useState('');

  const handleModeChange = (next: Mode) => {
    setMode(next);
    setQuery('');
  };

  return (
    <div className="flex h-full w-full flex-col gap-3">
      <ModeToggle value={mode} options={MODE_OPTIONS} onChange={handleModeChange} />

      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={mode === 'users' ? 'Search users you follow...' : 'Search personas...'}
          className="pl-9"
        />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {mode === 'users' ? (
          <UserPickerList query={query} onSelect={onSelectUser} />
        ) : (
          <PersonaPickerList query={query} onSelect={onSelectPersona} />
        )}
      </div>
    </div>
  );
};
