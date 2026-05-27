import Image from 'next/image';
import { PostOverview, PostTypes } from '@/types/post';

interface PostThumbnailProps {
  post: PostOverview;
}

export const PostThumbnail = ({ post }: PostThumbnailProps) => {
  if (post.type === PostTypes.IMAGE) {
    return (
      <div className="bg-card relative h-full w-full overflow-hidden rounded-lg">
        <Image
          src={post.images[0].url}
          alt={post.description ?? ''}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
    );
  }

  return (
    <div className="bg-card text-card-foreground flex h-full w-full flex-col justify-between overflow-hidden rounded-lg p-3">
      <p className="line-clamp-6 font-serif text-sm leading-snug italic">
        &ldquo;{post.quote}&rdquo;
      </p>
      <p className="text-muted-foreground mt-2 text-xs">— {post.quote_author}</p>
    </div>
  );
};
