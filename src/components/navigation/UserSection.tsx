'use client';
import {
  User,
  Settings,
  Gift,
  LogOut,
  Activity,
  MessageCircle,
  ChevronDown,
} from '../shared/Icons';
import { Separator } from '../ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ThemeToggle } from './ThemeToggle';
import { UserAvatar, userAvatarProps } from '../shared';
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

  return (
    <div className="flex flex-col gap-4 p-4">
      <Link
        href={`/user/${user.id}`}
        className="hover:bg-sidebar-accent flex items-center gap-3 rounded-md p-2"
      >
        <UserAvatar {...userAvatarProps(user)} />
        <UserInfo user={user} />
      </Link>

      <ThemeToggle />

      <Separator />

      <DropdownMenu>
        <DropdownMenuTrigger className="hover:bg-sidebar-accent flex items-center gap-2 rounded-md p-2 outline-none">
          <User size={20} />
          <span className="flex-1 text-left">Account</span>
          <ChevronDown size={16} className="text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem asChild>
            <Link href={`/user/${user.id}`} className="flex items-center gap-2">
              <User size={16} /> Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/user/${user.id}/insights`} className="flex items-center gap-2">
              <Activity size={16} /> Insights
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="flex items-center gap-2">
              <Settings size={16} /> Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={logout} variant="destructive">
            <LogOut size={16} /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="hover:bg-sidebar-accent flex items-center gap-2 rounded-md p-2">
        <Notifications size={20} /> <Link href="/notifications">Notifications</Link>
      </div>

      <Link href="/chat" className="hover:bg-sidebar-accent flex items-center gap-2 rounded-md p-2">
        <MessageCircle size={20} /> Chat
      </Link>

      <Link
        href="/rewards"
        className="hover:bg-sidebar-accent flex items-center gap-2 rounded-md p-2"
      >
        <Gift size={20} /> Rewards
      </Link>
    </div>
  );
};
