import { User, Users, Gift, LogOut } from '../shared/Icons';
import { Separator } from '../ui/separator';
import { ThemeToggle } from './ThemeToggle';
import { UserAvatar } from '../shared/user-avatar/UserAvatar';
import { UserOverview } from '@/types/user';
import Link from 'next/link';

interface UserSectionProps {
  user: UserOverview;
}
export const UserSection = ({ user }: UserSectionProps) => {
  return (
    <div className="flex flex-col gap-4 p-4">
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
    </div>
  );
};
