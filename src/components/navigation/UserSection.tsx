'use client';
import { User, Gift, LogOut, Activity } from '../shared/Icons';
import { Separator } from '../ui/separator';
import { ThemeToggle } from './ThemeToggle';
import { UserAvatar } from '../shared/UserAvatar/UserAvatar';
import { UserOverview } from '@/types/user';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { UserInfo } from '../shared/UserInfo/UserInfo';
import { Notifications } from '../shared/Notifications';

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
      <div className="flex items-center gap-3">
        <UserAvatar user={user} />
        <UserInfo user={user} />
      </div>

      <ThemeToggle />

      <Separator />
      <Link
        href={`/user/${user.id}`}
        className="hover:bg-muted flex items-center gap-2 rounded-md p-2"
      >
        <User size={20} /> Profile
      </Link>

      <div className="hover:bg-muted flex items-center gap-2 rounded-md p-2">
        <Notifications size={20} /> <Link href="/notifications">Notifications</Link>
      </div>

      <Link href="/rewards" className="hover:bg-muted flex items-center gap-2 rounded-md p-2">
        <Gift size={20} /> Rewards
      </Link>

      <Link
        href={`/user/${user.id}/insights`}
        className="hover:bg-muted flex items-center gap-2 rounded-md p-2"
      >
        <Activity size={20} /> Insights
      </Link>

      <Separator />

      <div
        className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-md p-2"
        onClick={handleLogout}
      >
        <LogOut size={20} /> <span>Logout</span>
      </div>
    </div>
  );
};
