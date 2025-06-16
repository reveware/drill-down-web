'use client';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPhotoPostSchema, PostTypes } from '@/types/post';
import { Button } from '@/components/ui/button';
import { GridContainer } from '@/components/shared/GridContainer/GridContainer';
import { X, Plus } from '@/components/shared/Icons';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { TagInput } from '@/features/tags/components/TagInput';
import { Textarea } from '@/components/ui/textarea';

export const PhotoPostForm = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const form = useForm({
    resolver: zodResolver(createPhotoPostSchema),
    defaultValues: { type: PostTypes.PHOTO, tags: [] },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
    form.setValue('photos', files);
  };

  const removeFile = (index: number) => {
    const updated = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updated);
    form.setValue('photos', updated);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: unknown) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full w-full flex-col space-y-2">
      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload Area */}
      <div className="flex max-h-72 flex-1 flex-col">
        {selectedFiles.length === 0 ? (
          <div
            className="border-muted/60 hover:bg-muted/20 flex flex-1 cursor-pointer items-center justify-center rounded-lg border border-dashed transition"
            onClick={triggerFileInput}
          >
            <div className="text-muted-foreground flex flex-col items-center">
              <Plus className="h-10 w-10" />
              <p className="mt-2 text-sm">Upload photos</p>
            </div>
          </div>
        ) : (
          <>
            <div className="text-foreground mb-2 self-end text-xs">
              {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected —{' '}
              <button
                type="button"
                onClick={triggerFileInput}
                className="hover:text-accent cursor-pointer underline underline-offset-2"
              >
                Change
              </button>
            </div>

            <ScrollArea className="max-h-60">
              <GridContainer>
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="relative aspect-square w-full overflow-hidden rounded-lg"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="bg-background/80 absolute top-1 right-1 z-10 rounded-full p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </GridContainer>
            </ScrollArea>
          </>
        )}
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          {...form.register('description')}
          placeholder="Add a description..."
          className="min-h-[60px] resize-none"
        />
      </div>

      <div className="flex w-full flex-col space-y-2">
        <label className="text-sm font-medium">Tags</label>
        <TagInput value={form.watch('tags')} onChange={(tags) => form.setValue('tags', tags)} />
      </div>

      <Button type="submit" className="mt-auto mb-4 w-full">
        Create Photo Post
      </Button>
    </form>
  );
};
