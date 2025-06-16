'use client';
import { useState } from 'react';
import { PostTypes } from '@/types/post';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PhotoPostForm } from './PhotoPostForm';
import { QuotePostForm } from './QuotePostForm';

export const CreatePost = () => {
  const [type, setType] = useState<PostTypes>(PostTypes.PHOTO);

  return (
    <Tabs
      className="flex flex-1 flex-col justify-between"
      value={type}
      onValueChange={(value) => setType(value as PostTypes)}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={PostTypes.PHOTO}>Photo</TabsTrigger>
        <TabsTrigger value={PostTypes.QUOTE}>Quote</TabsTrigger>
      </TabsList>

      <div className="flex-1">
        <TabsContent value={PostTypes.PHOTO} className="h-full">
          <PhotoPostForm />
        </TabsContent>

        <TabsContent value={PostTypes.QUOTE} className="h-full">
          <QuotePostForm />
        </TabsContent>
      </div>
    </Tabs>
  );
};
