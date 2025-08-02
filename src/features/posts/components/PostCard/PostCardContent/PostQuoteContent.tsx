import { QuotePost } from '@/types/post';

export const PostQuoteContent = ({ post }: { post: QuotePost }) => {
  const maxLength = 240;
  const trimmedQuote = post.quote.trim();
  const quote =
    trimmedQuote.length > maxLength ? trimmedQuote.slice(0, maxLength) + '...' : trimmedQuote;
  return (
    <div className="flex flex-col gap-2 px-4">
      <blockquote className="text-foreground font-cursive border-l-4 pl-4 text-xl whitespace-break-spaces italic">
        {quote}
        <footer className="mt-2 text-right text-xs">— {post.quote_author}</footer>
      </blockquote>
    </div>
  );
};
