import * as React from 'react';
import { Sheet, SheetContent } from '../ui/sheet';
import { User, LogOut, Gift, Users } from '@/components/shared/Icons';
import { ThemeToggle } from './ThemeToggle';
import { Separator } from '../ui/separator';
import { UserAvatar } from '@/components/shared/user-avatar/UserAvatar';
import { UserOverview } from '@/types/user';
import Link from 'next/link';

interface MobileSidebarProps {
  user: UserOverview;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ user, open, onOpenChange }) => {
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
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col gap-4 p-4 w-64">
        {userSection}
      </SheetContent>
    </Sheet>
  );
};
