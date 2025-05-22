import { PhotoPostContent } from '@/types/post';

export const PostPhotoContent = ({ content }: { content: PhotoPostContent }) => {
  if (!content.urls.length) {
    return null;
  }
  return (
    <div className="w-full rounded-lg overflow-hidden aspect-[4/3]">
      <img src={content.urls[0]} alt="Post photo" className="w-full h-full object-cover" />
    </div>
  );
};
