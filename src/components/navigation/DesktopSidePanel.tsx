import * as React from 'react';
import { UserOverview } from '@/types/user';
import { Brand } from '../shared/Brand/Brand';
import { UserSection } from './UserSection';
import { OnlineIndicator } from '../shared/OnlineIndicator/OnlineIndicator';
import { useChatSocket } from '../providers/ChatSocketProvider';
interface DesktopSidePanelProps {
  user: UserOverview;
}

export const DesktopSidePanel: React.FC<DesktopSidePanelProps> = ({ user }) => {
  const { isConnected } = useChatSocket();
  return (
    <aside className="bg-sidebar text-sidebar-foreground border-border hidden h-screen max-w-md flex-col gap-4 border-r-1 p-4 md:flex lg:w-md">
      <Brand />
      <UserSection user={user} />
      <div className="mt-auto">
        <OnlineIndicator isOnline={isConnected} />
      </div>
    </aside>
  );
};
