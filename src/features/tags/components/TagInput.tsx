'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';

import { X } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { useTagSearch } from '../hooks/useTagSearch';
import { Tag } from '@/types/tag';

interface TagInputProps {
  value: string[];
  className?: string;
  onChange: (tags: string[]) => void;
}

export const TagInput: React.FC<TagInputProps> = ({ value, onChange, className }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const debounced = useDebounce(inputValue, 500);
  const { tags: suggestions = [] } = useTagSearch(debounced);

  const showSuggestions = isFocused && inputValue.trim() !== '' && suggestions.length > 0;

  const addTag = useCallback(
    (tag: string) => {
      const clean = tag.trim();
      if (!clean || value.includes(clean)) return;
      onChange([...value, clean]);
      setInputValue('');
      // keep focus so user can keep typing
      inputRef.current?.focus();
    },
    [onChange, value]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && inputValue === '' && value.length) {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div className="relative w-full">
      <div
        className={`border-input flex flex-wrap items-center gap-2 rounded border-1 px-2 py-1 ${showSuggestions ? 'rounded-b-none' : ''} ${className}`}
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((tag) => (
          <Badge key={tag} variant="default" className="flex items-center justify-center gap-1">
            <span>#{tag}</span>
            <button
              type="button"
              onClick={() => onChange(value.filter((t) => t !== tag))}
              className="focus:ring-ring rounded-full focus:ring-2 focus:ring-offset-1"
            >
              <X size={16} />
            </button>
          </Badge>
        ))}

        <input
          ref={inputRef}
          type="text"
          className="min-w-[60px] flex-1 bg-transparent outline-none"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={value.length ? '' : 'Add tags...'}
          autoComplete="off"
        />
      </div>

      {showSuggestions && <TagSuggestions suggestions={suggestions} onSelect={addTag} />}
    </div>
  );
};

interface TagSuggestionsProps {
  suggestions: Tag[];
  onSelect: (tag: string) => void;
}

const TagSuggestions = ({ suggestions, onSelect }: TagSuggestionsProps) => {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <ul className="card absolute z-10 mt-1 max-h-40 w-full overflow-auto !rounded-t-none opacity-70 shadow-md">
      {suggestions.map((tag) => (
        <li
          key={tag.id}
          onMouseDown={(e) => {
            e.preventDefault();
            onSelect(tag.name);
          }}
          className="cursor-pointer px-3 py-2 hover:bg-gray-100"
        >
          #{tag.name}
        </li>
      ))}
    </ul>
  );
};
