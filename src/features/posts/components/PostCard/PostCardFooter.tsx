import { Heart, MessageCircle } from '@/components/shared/icons';
import { CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const PostCardFooter = ({
  likeCount,
  commentCount,
}: {
  likeCount: number;
  commentCount: number;
}) => {
  return (
    <CardFooter className="flex flex-col gap-3 px-2 text-sm">
      <Separator />
      <div className="flex items-center gap-6">
        <span className="flex items-center gap-1 cursor-pointer">
          <Heart size={20} />
          {likeCount} likes
        </span>
        <span className="flex items-center gap-1 cursor-pointer">
          <MessageCircle size={20} />
          {commentCount} comments
        </span>
      </div>
    </CardFooter>
  );
};
