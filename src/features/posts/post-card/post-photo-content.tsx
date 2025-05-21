import { PhotoPostContent } from '@/types/post';

export const PostPhotoContent = ({ content }: { content: PhotoPostContent }) => {
  if (!content.urls.length) {
    return null;
  }
  return (
    <img
      src={content.urls[0]}
      alt="Post photo"
      className="w-full rounded-lg object-cover max-h-64"
    />
  );
};
