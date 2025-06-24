import { UserOverview } from '@/types/user';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface UserInfoProps {
  user: UserOverview;
  subtitle?: string;
}
export const UserInfo = ({ user, subtitle }: UserInfoProps) => {
  return (
    <Link href={`/user/${user.id}`} className={cn('flex items-center gap-3')}>
      <div className="flex flex-col">
        <span className="text-md font-semibold">@{user.username}</span>
        <span className={`text-muted text-xs font-light`}>
          {subtitle || `${user.first_name} ${user.last_name}`}
        </span>
      </div>
    </Link>
  );
};
