import { UserOverview } from '@/types/user.types';
import Link from 'next/link';

interface UserInfoProps {
  user: UserOverview;
  subtitle?: string;
  href?: string | null;
}
export const UserInfo = ({ user, subtitle, href = `/user/${user.id}` }: UserInfoProps) => {
  const info = (
    <div className="flex flex-col">
      <span className="text-md font-semibold">@{user.username}</span>
      <span className="text-muted-foreground text-xs font-light">
        {subtitle || `${user.first_name} ${user.last_name}`}
      </span>
    </div>
  );

  if (!href) {
    return info;
  }

  return (
    <Link href={href} className="flex items-center gap-3">
      {info}
    </Link>
  );
};
