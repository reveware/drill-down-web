'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserOverview } from '@/types/user';
import Link from 'next/link';
import { cn } from '@/lib/utils';
interface UserAvatarProps {
  user: UserOverview;
  subtitle?: string;
  accent?: boolean;
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  subtitle,
  accent = false,
  className,
}) => {
  return (
    <Link href={`/user/${user.id}`} className={cn('flex items-center gap-3', className)}>
      <Avatar className="h-10 w-10 cursor-pointer">
        <AvatarImage src={user.avatar} alt={user.username} />
        <AvatarFallback className="bg-primary">{`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-md font-semibold">@{user.username}</span>
        <span className={`text-xs font-semibold ${accent ? 'text-accent' : 'text-muted'}`}>
          {subtitle || `${user.first_name} ${user.last_name}`}
        </span>
      </div>
    </Link>
  );
};
