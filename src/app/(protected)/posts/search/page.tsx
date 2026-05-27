'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { PostSearchGallery } from '@/features/posts';
import { TagInput } from '@/features/tags/components/TagInput';

export default function PostSearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tags = searchParams.getAll('tags');

  const handleTagsChange = (next: string[]) => {
    const params = new URLSearchParams();
    next.forEach((tag) => params.append('tags', tag));
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : '?');
  };

  return (
    <div className="mx-auto flex h-full min-h-0 w-full max-w-7xl flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <h2 className="mb-2 font-sans text-2xl font-bold">Search Posts</h2>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">Tags:</span>
          <TagInput value={tags} onChange={handleTagsChange} />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <PostSearchGallery search={{ tags: tags.length > 0 ? tags : undefined }} />
      </div>
    </div>
  );
}
