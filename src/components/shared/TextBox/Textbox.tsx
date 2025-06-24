import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TextboxProps {
  text: string;
  maxLength: number;
  className?: string;
}

export const Textbox: React.FC<TextboxProps> = ({ text, maxLength, className }) => {
  const [expanded, setExpanded] = useState(false);

  if (text.length <= maxLength) {
    return <p className={cn('text-foreground mb-2 text-left text-sm', className)}>{text}</p>;
  }

  return (
    <p className={cn('text-foreground mb-2 text-left text-sm', className)}>
      {expanded ? text : text.slice(0, maxLength) + '... '}
      <button
        className="text-info ml-1 text-xs underline"
        onClick={() => setExpanded((e) => !e)}
        type="button"
      >
        {expanded ? 'View less' : 'View more'}
      </button>
    </p>
  );
};
