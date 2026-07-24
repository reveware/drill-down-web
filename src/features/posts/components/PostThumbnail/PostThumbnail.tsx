import Image from 'next/image';
import { PostOverview } from '@/types/post.types';

interface PostThumbnailProps {
  post: PostOverview;
}

export const PostThumbnail = ({ post }: PostThumbnailProps) => {
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
};
