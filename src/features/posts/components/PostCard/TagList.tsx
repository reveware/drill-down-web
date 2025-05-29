'use client';
import * as React from 'react';
import { ChevronDown, ChevronUp } from '@/components/shared/Icons';

interface TagListProps {
  tags: string[];
}

export const TagList: React.FC<TagListProps> = ({ tags }) => {
  const initialVisible = 4;
  const [expanded, setExpanded] = React.useState(false);

  if (tags.length === 0) return null;

  const visible = expanded ? tags : tags.slice(0, initialVisible);
  const hiddenCount = tags.length - visible.length;

  return (
    <div className="w-full flex flex-wrap gap-2 p-1">
      {visible.map((tag) => (
        <span
          key={tag}
          className="text-xs font-light tracking-wide text-muted cursor-pointer hover:underline"
        >
          #{tag}
        </span>
      ))}

      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="ml-auto flex items-center gap-1 text-xs text-muted font-light tracking-wide hover:underline"
        >
          ...more <ChevronDown size={14} />
        </button>
      )}

      {expanded && tags.length > initialVisible && (
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="ml-auto flex items-center gap-1 text-xs text-muted font-light tracking-wide hover:underline"
        >
          ...less <ChevronUp size={14} />
        </button>
      )}
    </div>
  );
};
