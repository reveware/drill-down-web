'use client';
import { User, Users, Gift, LogOut } from '../shared/Icons';
import { Separator } from '../ui/separator';
import { ThemeToggle } from './ThemeToggle';
import { UserAvatar } from '../shared/UserAvatar/UserAvatar';
import { UserOverview } from '@/types/user';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';

interface UserSectionProps {
  user: UserOverview;
}

export const UserSection = ({ user }: UserSectionProps) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <UserAvatar user={user} accent />

      <ThemeToggle />

      <Separator />

      <Link
        href={`/user/${user.id}`}
        className="flex items-center gap-2 p-2 rounded-md hover:bg-muted"
      >
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
        onClick={handleLogout}
      >
        <LogOut size={20} /> <span>Logout</span>
      </div>
    </div>
  );
};
