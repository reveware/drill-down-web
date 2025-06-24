import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateComment, CreateCommentSchema } from '@/types/comment';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { X } from '@/components/shared/Icons';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useEffect } from 'react';

interface CreateCommentFormProps {
  postId: string;
  replyTo?: {
    commentId: string;
    username: string;
  };
  onCancelReply?: () => void;
  onSubmit: (data: CreateComment) => void;
  isCreatingComment: boolean;
}

export const CreateCommentForm = ({
  postId,
  replyTo,
  onCancelReply,
  onSubmit,
  isCreatingComment,
}: CreateCommentFormProps) => {
  const form = useForm<CreateComment>({
    resolver: zodResolver(CreateCommentSchema),
    defaultValues: {
      post_id: postId,
      message: '',
      reply_to: replyTo?.commentId || null,
    },
  });

  const handleSubmit = (data: CreateComment) => {
    onSubmit(data);
    form.reset();
  };

  useEffect(() => {
    form.setValue('reply_to', replyTo?.commentId || null);
  }, [replyTo, form]);

  const ReplyBanner = (replyTo: { commentId: string; username: string }) => (
    <div className="bg-muted/10 flex h-10 items-center justify-between rounded-lg p-3 text-sm">
      <span className="text-muted-foreground">
        Replying to <span className="text-foreground font-medium">@{replyTo.username}</span>
      </span>
      <Button variant="link" size="sm" onClick={onCancelReply} className="h-6 w-6 p-0">
        <X size={16} />
      </Button>
    </div>
  );

  return (
    <div className="space-y-3">
      {replyTo && ReplyBanner(replyTo)}

      {/* Comment form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder={replyTo ? 'Write your reply...' : 'Write a comment...'}
                    className="min-h-[80px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center gap-2">
            <Button type="submit" disabled={isCreatingComment}>
              {isCreatingComment ? 'Posting...' : replyTo ? 'Reply' : 'Post Comment'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
