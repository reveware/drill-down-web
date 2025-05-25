'use client';

import React, { useState } from 'react';

import { Menu } from '@/components/shared/Icons';
import { MobileSidebar } from './MobileSidebar';
import { UserOverview } from '@/types/user';
import { Brand } from '@/components/shared/brand/Brand';
import { Search } from '@/components/shared/search/Search';

interface MobileTopbarProps {
  user: UserOverview;
}
export const MobileTopbar: React.FC<MobileTopbarProps> = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSearch = (query: string) => {
    alert(query);
  };

  return (
    <nav className="md:hidden sticky top-0 z-50 bg-primary text-on-primary px-4 py-2 flex items-center justify-between shadow-secondary shadow-sm">
      <div className="flex items-center gap-4">
        <Brand />
      </div>

      <div className="flex items-center gap-2">
        <Search onSearch={handleSearch} />
        <button className="p-2" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
          <Menu size={24} />
        </button>
      </div>
      <MobileSidebar user={user} open={sidebarOpen} onOpenChange={setSidebarOpen} />
    </nav>
  );
};
