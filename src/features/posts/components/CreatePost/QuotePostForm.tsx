'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateQuotePost, createQuotePostSchema, PostOverview, PostTypes } from '@/types/post';
import { Button } from '@/components/ui/button';
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
import { Input } from '@/components/ui/input';

interface QuotePostFormProps {
  onSuccess: (post: PostOverview) => void;
}

export const QuotePostForm = ({ onSuccess }: QuotePostFormProps) => {
  const { mutate: createQuotePost } = useCreatePost(PostTypes.QUOTE, onSuccess);

  const form = useForm({
    resolver: zodResolver(createQuotePostSchema),
    defaultValues: {
      type: PostTypes.QUOTE,
      quote: '',
      author: '',
      date: '',
      location: '',
      tags: [],
      description: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: CreateQuotePost) => {
    createQuotePost(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col space-y-2 sm:space-y-4"
      >
        {/* Quote */}
        <FormField
          control={form.control}
          name="quote"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm">Quote*</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your quote..."
                  className="font-cursive min-h-[80px] resize-none text-lg sm:text-2xl"
                  {...field}
                />
              </FormControl>
              <FormMessage className="min-h-[1rem] text-xs font-light" />
            </FormItem>
          )}
        />

        {/* Author */}
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm">Author*</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  {...field}
                  className="font-cursive text-base sm:text-lg"
                />
              </FormControl>
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
              <FormLabel className="text-xs sm:text-sm">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add a description..."
                  className="resize-none text-sm sm:text-base"
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
              <FormLabel className="text-xs sm:text-sm">Tags*</FormLabel>
              <FormControl>
                <TagInput value={field.value} onChange={(tags) => field.onChange(tags)} />
              </FormControl>
              <FormMessage className="min-h-[1rem] text-xs font-light" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="mt-auto mb-2 w-full justify-self-end py-2 text-xs sm:text-sm"
          disabled={!form.formState.isValid}
        >
          Create Quote Post
        </Button>
      </form>
    </Form>
  );
};
