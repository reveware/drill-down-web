import * as React from 'react';
import { UserOverview } from '@/types/user';
import { Brand } from '../shared/Brand/Brand';
import { UserSection } from './UserSection';
interface DesktopSidePanelProps {
  user: UserOverview;
}

export const DesktopSidePanel: React.FC<DesktopSidePanelProps> = ({ user }) => {
  return (
    <aside className="bg-primary text-on-primary border-border hidden h-screen max-w-md flex-col gap-4 border-r-1 p-4 md:flex lg:w-md">
      <Brand />
      <UserSection user={user} />
    </aside>
  );
};
