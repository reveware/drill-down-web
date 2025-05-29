import * as React from 'react';
import { Separator } from '../ui/separator';
import { UserOverview } from '@/types/user';
import { Brand } from '../shared/Brand/Brand';
import { UserSection } from './UserSection';
interface DesktopSidePanelProps {
  user: UserOverview;
}

export const DesktopSidePanel: React.FC<DesktopSidePanelProps> = ({ user }) => {
  return (
    <aside className="hidden md:flex flex-col max-w-md lg:w-md h-screen bg-primary text-on-primary border-r-1 border-border">
      <div className="p-4">
        <Brand />
      </div>

      <UserSection user={user} />
    </aside>
  );
};
