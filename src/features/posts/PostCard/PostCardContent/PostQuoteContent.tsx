import { QuotePostContent } from '@/types/post';

export const PostQuoteContent = ({ content }: { content: QuotePostContent }) => {
  const maxLength = 240;
  const quote =
    content.quote.length > maxLength ? content.quote.slice(0, maxLength) + '...' : content.quote;
  return (
    <div className="flex flex-col gap-2 px-4">
      <blockquote className="border-l-4 pl-4 italic text-lg text-foreground">
        “{quote}”<footer className="mt-2 text-xs text-right">— {content.author}</footer>
      </blockquote>
    </div>
  );
};
