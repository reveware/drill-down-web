'use client';
import { useState } from 'react';
import { PostOverview, PostTypes } from '@/types/post';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImagePostForm } from './ImagePostForm';
import { QuotePostForm } from './QuotePostForm';

interface CreatePostProps {
  onSuccess: (post: PostOverview) => void;
}
export const CreatePost = ({ onSuccess }: CreatePostProps) => {
  const [type, setType] = useState<PostTypes>(PostTypes.IMAGE);

  return (
    <Tabs
      className="mx-auto flex w-full flex-1 flex-col justify-between"
      value={type}
      onValueChange={(value) => setType(value as PostTypes)}
    >
      <TabsList className="mb-2 grid w-full grid-cols-2">
        <TabsTrigger className="text-xs" value={PostTypes.IMAGE}>
          Image
        </TabsTrigger>
        <TabsTrigger className="text-xs" value={PostTypes.QUOTE}>
          Quote
        </TabsTrigger>
      </TabsList>

      <TabsContent value={PostTypes.IMAGE} className="flex min-h-0 flex-1 flex-col">
        <ImagePostForm onSuccess={onSuccess} />
      </TabsContent>

      <TabsContent value={PostTypes.QUOTE} className="flex min-h-0 flex-1 flex-col">
        <QuotePostForm onSuccess={onSuccess} />
      </TabsContent>
    </Tabs>
  );
};
