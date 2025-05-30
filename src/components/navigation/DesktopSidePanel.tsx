'use client';
import * as React from 'react';
import { UserOverview } from '@/types/user';
import { Brand } from '../shared/Brand/Brand';
import { UserSection } from './UserSection';
interface DesktopSidePanelProps {
  user: UserOverview;
}

export const DesktopSidePanel: React.FC<DesktopSidePanelProps> = ({ user }) => {
  return (
    <aside className="hidden md:flex flex-col max-w-md lg:w-md h-screen p-4 gap-8 bg-primary text-on-primary border-r-1 border-border">
      <Brand />
      <UserSection user={user} />
    </aside>
  );
};
