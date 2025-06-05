'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserOverview } from '@/types/user';
import Link from 'next/link';

interface UserAvatarProps {
  user: UserOverview;
  subtitle?: string;
  accent?: boolean;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user, subtitle, accent = false }) => {
  return (
    <Link href={`/user/${user.id}`} className="flex items-center gap-3">
      <Avatar className="cursor-pointer w-10 h-10">
        <AvatarImage src={user.avatar} alt={user.username} />
        <AvatarFallback className="bg-primary">{`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-md font-semibold">{user.username}</span>
        <span className={`text-xs font-semibold ${accent ? 'text-accent' : 'text-muted'}`}>
          {subtitle || `${user.first_name} ${user.last_name}`}
        </span>
      </div>
    </Link>
  );
};
