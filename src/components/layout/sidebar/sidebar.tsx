import * as React from 'react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../../ui/sheet';
import { Menu, User, LogOut, Gift, Users } from '@/components/shared/Icons';
import { ThemeToggle } from '../navbar/theme-toggle';
import { Separator } from '../../ui/separator';
import { UserAvatar } from '@/components/shared/user-avatar/user-avatar';
import { UserOverview } from '@/types/user';
import Link from 'next/link';

interface SidebarProps {
  user: UserOverview;
}
export const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2">
          <Menu size={24} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col gap-4 p-4 w-64">
        <SheetTitle>Settings</SheetTitle>
        <div className="flex items-center gap-2">
          <UserAvatar user={user} />
          <div className="flex flex-col">
            <span className="text-md font-semibold">{user.username}</span>
            <span className="text-sm text-accent">{`${user.first_name} ${user.last_name}`}</span>
          </div>
        </div>

        <ThemeToggle />

        <Separator />

        <Link href="/profile" className="flex items-center gap-2">
          <User size={20} /> Profile
        </Link>
        <Link href="/friends" className="flex items-center gap-2">
          <Users size={20} /> Friends
        </Link>
        <Link href="/assets" className="flex items-center gap-2">
          <Gift size={20} /> Assets
        </Link>

        <Separator />

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            /* TODO: handle logout */
          }}
        >
          <LogOut size={20} /> <span>Logout</span>
        </div>
      </SheetContent>
    </Sheet>
  );
};
