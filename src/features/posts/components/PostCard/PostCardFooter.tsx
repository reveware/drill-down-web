import { Heart, MessageCircle } from '@/components/shared/Icons';
import { CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TagList } from './TagList';

export const PostCardFooter = ({
  likeCount,
  commentCount,
  tags,
}: {
  likeCount: number;
  commentCount: number;
  tags: string[];
}) => {
  return (
    <CardFooter className="flex flex-col gap-3 px-2 text-sm">
      <TagList tags={tags} />

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
