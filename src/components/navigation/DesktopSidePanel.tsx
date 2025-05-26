import * as React from 'react';
import { Separator } from '../ui/separator';
import { UserOverview } from '@/types/user';
import { Brand } from '../shared/brand/Brand';
import { UserSection } from './UserSection';
interface DesktopSidePanelProps {
  user: UserOverview;
}

export const DesktopSidePanel: React.FC<DesktopSidePanelProps> = ({ user }) => {
  return (
    <aside className="hidden md:flex flex-col w-md h-screen bg-primary text-on-primary border-l-0 border-1 border-border">
      <div className="p-4">
        <Brand />
      </div>

      <UserSection user={user} />
    </aside>
  );
};
