import * as React from 'react';
import { User, LogOut, Gift, Users } from '@/components/shared/Icons';
import { ThemeToggle } from './ThemeToggle';
import { Separator } from '../ui/separator';
import { UserAvatar } from '@/components/shared/user-avatar/UserAvatar';
import { UserOverview } from '@/types/user';
import { Brand } from '../shared/brand/Brand';
import Link from 'next/link';
import { Search } from '../shared/search/Search';

interface DesktopSidePanelProps {
  user: UserOverview;
}

export const DesktopSidePanel: React.FC<DesktopSidePanelProps> = ({ user }) => {
  const userSection = (
    <>
      <div className="flex items-center gap-2">
        <UserAvatar user={user} />
        <div className="flex flex-col">
          <span className="text-md font-semibold">{user.username}</span>
          <span className="text-sm text-accent">{`${user.first_name} ${user.last_name}`}</span>
        </div>
      </div>

      <ThemeToggle />

      <Separator />

      <Link href="/profile" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
        <User size={20} /> Profile
      </Link>
      <Link href="/friends" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
        <Users size={20} /> Friends
      </Link>
      <Link href="/assets" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
        <Gift size={20} /> Assets
      </Link>

      <Separator />

      <div
        className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-muted"
        onClick={() => {
          /* TODO: handle logout */
        }}
      >
        <LogOut size={20} /> <span>Logout</span>
      </div>
    </>
  );

  return (
    <aside className="hidden md:flex flex-col w-96 h-screen bg-primary text-on-primary border-l-0 border-1 border-border">
      <div className="p-4">
        <Brand />
      </div>
      <Separator />
      <div className="flex flex-col gap-2 p-4">{<Search onSearch={() => {}} />}</div>
      <Separator />
      <div className="flex flex-col gap-4 p-4">{userSection}</div>
    </aside>
  );
};
