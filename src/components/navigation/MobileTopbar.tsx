'use client';
import React, { useState } from 'react';

import { Menu } from '@/components/shared/Icons';
import { MobileSidebar } from './MobileSidebar';
import { UserOverview } from '@/types/user';
import { Brand } from '@/components/shared/Brand/Brand';
import { Search } from '@/components/shared/Search/Search';
import { Notifications } from '@/components/shared/Notifications';

interface MobileTopbarProps {
  user: UserOverview;
}
export const MobileTopbar: React.FC<MobileTopbarProps> = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSearch = (query: string) => {
    alert(query);
  };

  return (
    <nav className="bg-primary text-on-primary shadow-secondary sticky top-0 z-50 flex items-center justify-between px-4 py-2 shadow-sm md:hidden">
      <div className="flex items-center gap-4">
        <Brand />
      </div>

      <div className="flex items-center gap-2">
        <Notifications className="text-on-primary" />
        <Search onSearch={handleSearch} />
        <Menu className="cursor-pointer" size={24} onClick={() => setSidebarOpen(true)} />
      </div>
      <MobileSidebar user={user} open={sidebarOpen} onOpenChange={setSidebarOpen} />
    </nav>
  );
};
