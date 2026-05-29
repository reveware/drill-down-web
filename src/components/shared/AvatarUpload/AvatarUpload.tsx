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
  size?: 'sm' | 'md';
  className?: string;
}

const SIZE = {
  md: { avatar: 'h-20 w-20 text-sm', badge: 'p-1.5', icon: 'h-3 w-3' },
  sm: { avatar: 'h-16 w-16 text-xs', badge: 'p-1', icon: 'h-2.5 w-2.5' },
};

export const AvatarUpload = ({
  value,
  onChange,
  initials,
  currentUrl,
  size = 'md',
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

  const s = SIZE[size];

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="relative">
        <Label htmlFor={inputId} className="block cursor-pointer">
          <UserAvatar src={src} initials={initials} className={s.avatar} />
        </Label>
        <Label
          htmlFor={inputId}
          className={cn(
            'bg-primary text-primary-foreground hover:bg-primary/90 absolute right-0 bottom-0 cursor-pointer rounded-full transition-colors',
            s.badge
          )}
        >
          <Upload className={s.icon} />
        </Label>
      </div>
      <Input id={inputId} type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </div>
  );
};
