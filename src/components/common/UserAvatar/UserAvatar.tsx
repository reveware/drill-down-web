import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserOverview } from '@/app/types/user';
import { cn } from '@/lib/utils';
interface UserAvatarProps {
  user: UserOverview;

  className?: string;
}
export const UserAvatar: React.FC<UserAvatarProps> = ({ user, className }) => {
  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={user.avatar} alt={user.username} />
      <AvatarFallback className="bg-primary">{`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`}</AvatarFallback>
    </Avatar>
  );
};
