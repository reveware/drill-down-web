import { Heart, MessageCircle } from '@/components/shared/Icons';

export default function PostFooter({
  likeCount,
  commentCount,
}: {
  likeCount: number;
  commentCount: number;
}) {
  return (
    <div className="flex items-center gap-6 text-sm text-muted-foreground">
      <span className="flex items-center gap-1 cursor-pointer">
        <Heart size={20} />
        {likeCount} likes
      </span>
      <span className="flex items-center gap-1 cursor-pointer">
        <MessageCircle size={20} />
        {commentCount} comments
      </span>
    </div>
  );
}
