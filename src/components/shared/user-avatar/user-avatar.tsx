import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserOverview } from '@/types/user';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
interface UserAvatarProps {
  user: UserOverview;
}
export const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  const router = useRouter();
  return (
    <Avatar className="cursor-pointer" onClick={() => router.push(`/profile/${user.id}`)}>
      <AvatarImage src={user.avatar} alt={user.username} />
      <AvatarFallback className="bg-primary">{`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`}</AvatarFallback>
    </Avatar>
  );
};
