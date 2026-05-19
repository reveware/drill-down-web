'use client';
import { useEffect, useId, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload } from '@/components/shared/Icons';
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/shared/UserAvatar/UserAvatar';

const VALID_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_BYTES = 5 * 1024 * 1024;

interface AvatarUploadProps {
  value?: File | null;
  onChange: (file: File) => void;
  initials?: string;
  currentUrl?: string | null;
  className?: string;
}

export const AvatarUpload = ({
  value,
  onChange,
  initials,
  currentUrl,
  className,
}: AvatarUploadProps) => {
  const inputId = useId();
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(value);
  }, [value]);

  const src = preview ?? currentUrl ?? undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !VALID_TYPES.includes(file.type) || file.size > MAX_BYTES) {
      return;
    }
    onChange(file);
  };

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="relative">
        <Label htmlFor={inputId} className="block cursor-pointer">
          <UserAvatar src={src} initials={initials} className="h-32 w-32 text-lg" />
        </Label>
        <Label
          htmlFor={inputId}
          className="bg-primary text-primary-foreground hover:bg-primary/90 absolute right-0 bottom-0 cursor-pointer rounded-full p-2 transition-colors"
        >
          <Upload className="h-4 w-4" />
        </Label>
      </div>
      <Input id={inputId} type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </div>
  );
};
