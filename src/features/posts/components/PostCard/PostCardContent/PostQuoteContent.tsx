import { QuotePost } from '@/types/post';

export const PostQuoteContent = ({ post }: { post: QuotePost }) => {
  const maxLength = 240;
  const quote = post.quote.length > maxLength ? post.quote.slice(0, maxLength) + '...' : post.quote;
  return (
    <div className="flex flex-col gap-2 px-4">
      <blockquote className="text-foreground border-l-4 pl-4 text-lg italic">
        “{quote}”<footer className="mt-2 text-right text-xs">— {post.quote_author}</footer>
      </blockquote>
    </div>
  );
};
