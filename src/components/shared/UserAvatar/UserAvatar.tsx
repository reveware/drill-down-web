'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserOverview } from '@/types/user';
import Link from 'next/link';
import { cn } from '@/lib/utils';
interface UserAvatarProps {
  user: UserOverview;
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user, className }) => {
  return (
    <Link href={`/user/${user.id}`} className={cn('flex items-center gap-3')}>
      <Avatar className={cn('h-10 w-10 cursor-pointer', className)}>
        <AvatarImage src={user.avatar} alt={user.username} />
        <AvatarFallback className="bg-primary">{`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`}</AvatarFallback>
      </Avatar>
    </Link>
  );
};
