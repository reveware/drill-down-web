import * as React from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from '@/components/shared/Icons';
import { PostTag } from '@/types/post';

interface TagListProps {
  tags: PostTag[];
}

export const TagList: React.FC<TagListProps> = ({ tags }) => {
  const initialVisible = 4;
  const [expanded, setExpanded] = React.useState(false);

  if (tags.length === 0) return null;

  const visible = expanded ? tags : tags.slice(0, initialVisible);
  const hiddenCount = tags.length - visible.length;

  return (
    <div className="flex w-full flex-wrap gap-2 p-1">
      {visible.map((tag) => (
        <Link
          key={tag.slug}
          href={`/posts/search?tags=${encodeURIComponent(tag.slug)}`}
          className="text-muted-foreground cursor-pointer text-xs font-light tracking-wide hover:underline"
        >
          #{tag.name}
        </Link>
      ))}

      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="text-muted-foreground ml-auto flex items-center gap-1 text-xs font-light tracking-wide hover:underline"
        >
          ...more <ChevronDown size={14} />
        </button>
      )}

      {expanded && tags.length > initialVisible && (
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="text-muted-foreground ml-auto flex items-center gap-1 text-xs font-light tracking-wide hover:underline"
        >
          ...less <ChevronUp size={14} />
        </button>
      )}
    </div>
  );
};
