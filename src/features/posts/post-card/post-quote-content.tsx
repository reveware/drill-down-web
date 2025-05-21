import { QuotePostContent } from '@/types/post';

export const PostQuoteContent = ({ content }: { content: QuotePostContent }) => {
  return (
    <blockquote className="border-l-4 pl-4 italic text-lg text-muted-foreground">
      “{content.quote}”<footer className="mt-2 text-xs text-right">— {content.author}</footer>
    </blockquote>
  );
};
