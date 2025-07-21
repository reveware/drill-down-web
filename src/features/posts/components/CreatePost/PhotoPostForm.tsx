'use client';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreatePhotoPost, createPhotoPostSchema, PostOverview, PostTypes } from '@/types/post';
import { Button } from '@/components/ui/button';
import { GridContainer } from '@/components/shared/GridContainer/GridContainer';
import { X, Plus } from '@/components/shared/Icons';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { TagInput } from '@/features/tags/components/TagInput';
import { Textarea } from '@/components/ui/textarea';
import { useCreatePost } from '../../hooks/useCreatePost';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface PhotoPostFormProps {
  onSuccess: (post: PostOverview) => void;
}

export const PhotoPostForm = ({ onSuccess }: PhotoPostFormProps) => {
  const { mutate: createPhotoPost } = useCreatePost(PostTypes.PHOTO, onSuccess);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    resolver: zodResolver(createPhotoPostSchema),
    defaultValues: {
      type: PostTypes.PHOTO,
      photos: [],
      tags: [],
      description: '',
    },
    mode: 'onChange',
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
    form.setValue('photos', files, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const removeFile = (index: number) => {
    const updated = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updated);
    form.setValue('photos', updated, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: CreatePhotoPost) => {
    createPhotoPost(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col space-y-2"
      >
        <input
          type="file"
          multiple
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Photos Upload */}
        <FormField
          control={form.control}
          name="photos"
          render={({ field }) => (
            <FormItem className="flex max-h-72 flex-1 flex-col">
              <FormLabel>Photos*</FormLabel>
              {selectedFiles.length === 0 ? (
                <div
                  className={cn(
                    'border-muted/60 hover:bg-muted/20 flex flex-1 cursor-pointer items-center justify-center rounded-lg border border-dashed transition',
                    form.formState.errors.photos && 'border-red-500'
                  )}
                  onClick={triggerFileInput}
                >
                  <div className="text-muted flex flex-col items-center">
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

                  <Preview selectedFiles={selectedFiles} removeFile={removeFile} />
                </>
              )}
              <FormMessage className="min-h-[1rem] text-xs font-light" />
            </FormItem>
          )}
        />

        <Separator className="my-4" />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add a description..."
                  className="min-h-[60px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage className="min-h-[1rem] text-xs font-light" />
            </FormItem>
          )}
        />

        {/* Tags */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags*</FormLabel>
              <FormControl>
                <TagInput value={field.value} onChange={(tags) => field.onChange(tags)} />
              </FormControl>
              <FormMessage className="min-h-[1rem] text-xs font-light" />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-auto mb-4 w-full" disabled={!form.formState.isValid}>
          Create Photo Post
        </Button>
      </form>
    </Form>
  );
};

const Preview = ({
  selectedFiles,
  removeFile,
}: {
  selectedFiles: File[];
  removeFile: (index: number) => void;
}) => (
  <ScrollArea className="max-h-40 sm:max-h-60">
    <GridContainer>
      {selectedFiles.map((file, index) => (
        <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={URL.createObjectURL(file)}
            alt={`Preview ${index + 1}`}
            className="h-full w-full object-cover"
            width={100}
            height={100}
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
);
