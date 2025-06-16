'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateQuotePost, createQuotePostSchema, PostTypes, PostOverview } from '@/types/post';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TagInput } from '@/features/tags/components/TagInput';
import { Separator } from '@/components/ui/separator';
import { useCreatePost } from '../../hooks/useCreatePost';

interface QuotePostFormProps {
  onSuccess: (post: PostOverview) => void;
}

export const QuotePostForm = ({ onSuccess }: QuotePostFormProps) => {
  const { mutate: createPost, isPending, isSuccess } = useCreatePost(PostTypes.QUOTE, onSuccess);

  const form = useForm({
    resolver: zodResolver(createQuotePostSchema),
    defaultValues: { type: PostTypes.QUOTE, tags: [] },
  });

  const handleSubmit = (data: CreateQuotePost) => {
    createPost(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex h-full flex-col space-y-2">
      <div className="space-y-2">
        <Textarea
          {...form.register('quote')}
          placeholder="Enter your quote..."
          className="font-cursive text-foreground/90 h-52 resize-none text-2xl font-extralight"
        />
        {form.formState.errors.quote && (
          <p className="text-destructive text-sm">{form.formState.errors.quote.message}</p>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">Author</label>
        <Input {...form.register('author')} placeholder="Enter author name..." />
        {form.formState.errors.author && (
          <p className="text-destructive text-sm">{form.formState.errors.author.message}</p>
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

      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">Tags</label>
        <TagInput value={form.watch('tags')} onChange={(tags) => form.setValue('tags', tags)} />
      </div>

      <Button type="submit" className="mt-auto mb-4 w-full">
        Create Quote Post
      </Button>
    </form>
  );
};
