import { Command, CommandDialog } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/common/Button/Button';

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
        <Input
          placeholder="Search..."
          className="w-48 text-foreground bg-background border-1 border-border"
          onChange={handleSearchChange}
        />
      </div>

      <div className="md:hidden">
        <button className="p-2" onClick={() => setIsSearchOpen(true)}>
          <SearchIcon size={20} />
        </button>
        <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <Command>
            <div className="flex items-center gap-2 p-4">
              <Input
                placeholder="Search..."
                className="w-48 text-foreground bg-background border-1 border-border"
                onChange={handleSearchChange}
              />
              <Button variant="primary" onClick={() => onSearch(searchQuery)}>
                Search
              </Button>
            </div>
          </Command>
        </CommandDialog>
      </div>
    </div>
  );
};
