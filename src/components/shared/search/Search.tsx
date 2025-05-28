import { Command, CommandDialog } from '@/components/ui/command';
import { Input } from '@/components/shared/input/Input';
import { Search as SearchIcon } from '@/components/shared/icons';
import React, { useState } from 'react';
import { Button } from '@/components/shared';

interface MobileSearchCommandProps {
  onSearch: (query: string) => void;
}

export const Search: React.FC<MobileSearchCommandProps> = ({ onSearch }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div>
      <div className="hidden md:block">
        <Input placeholder="Search..." className="w-full" onChange={handleSearchChange} />
      </div>
      <button className="p-2 flex gap-2 md:hidden" onClick={() => setIsSearchOpen(true)}>
        <SearchIcon size={20} />
      </button>
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <Command>
          <div className="flex items-center gap-2 p-4">
            <Input placeholder="Search..." className="w-full" onChange={handleSearchChange} />
            <Button variant="primary" onClick={() => onSearch(searchQuery)}>
              Search
            </Button>
          </div>
        </Command>
      </CommandDialog>
    </div>
  );
};
