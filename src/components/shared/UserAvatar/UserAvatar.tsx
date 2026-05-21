'use client';
import Link from 'next/link';
import { UserOverview } from '@/types/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/components/shared/Icons';
import { cn, getInitials } from '@/lib/utils';

interface UserAvatarProps {
  src?: string | null;
  initials?: string;
  href?: string;
  alt?: string;
  className?: string;
}

export const UserAvatar = ({ src, initials, href, alt, className }: UserAvatarProps) => {
  const avatar = (
    <Avatar className={cn('h-10 w-10', className)}>
      <AvatarImage src={src} alt={alt} className="object-cover" />
      <AvatarFallback className="bg-primary text-primary-foreground">
        {initials || <User className="h-1/2 w-1/2" />}
      </AvatarFallback>
    </Avatar>
  );

  if (!href) {
    return avatar;
  }

  return (
    <Link href={href} className="flex items-center gap-3">
      {avatar}
    </Link>
  );
};

export const userAvatarProps = (user: UserOverview) => ({
  src: user.avatar,
  initials: getInitials([user.first_name, user.last_name]),
  href: `/user/${user.id}`,
  alt: user.username,
});
