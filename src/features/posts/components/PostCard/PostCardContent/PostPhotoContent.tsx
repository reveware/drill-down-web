import { PhotoPostContent } from '@/types/post';
import Image from 'next/image';

export const PostPhotoContent = ({ content }: { content: PhotoPostContent }) => {
  if (!content.urls.length) {
    return null;
  }

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden">
      <Image
        src={content.urls[0]}
        alt="Post photo"
        fill
        className="photo object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};
