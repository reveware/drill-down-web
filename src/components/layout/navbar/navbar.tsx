'use client';

import React from 'react';
import { Brand } from './brand';
import { Sidebar } from '../sidebar/sidebar';
import { Search } from './search';
import { mockUser } from '@/mocks/user';

export function Navbar() {
  const handleSearch = (query: string) => {
    alert(query);
  };

  return (
    <nav className="bg-primary text-on-primary px-4 py-2 flex items-center justify-between shadow-secondary shadow-sm rounded-md">
      <div className="flex items-center gap-4">
        <Brand />
      </div>

      <div className="flex items-center gap-2">
        <Search onSearch={handleSearch} />
        <Sidebar user={mockUser} />
      </div>
    </nav>
  );
}
