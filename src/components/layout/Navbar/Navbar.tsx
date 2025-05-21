'use client';

import React from 'react';
import { Brand } from './Brand';
import { Sidebar } from '../Sidebar/Sidebar';
import { Search } from './Search';
import { mockUser } from '@/app/mocks/user';

export function Navbar() {
  const handleSearch = (query: string) => {
    alert(query);
  };

  return (
    <header className="bg-primary text-on-primary px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Brand />
      </div>

      <div className="flex items-center gap-2">
        <Search onSearch={handleSearch} />
        <Sidebar user={mockUser} />
      </div>
    </header>
  );
}
