import { RegisterDto } from '@/types/auth';
import { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { AstroWelcome } from '@/assets/images';

export const useAvatarUpload = (setValue: UseFormSetValue<RegisterDto>) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    if (!validTypes.includes(file.type)) return;
    if (file.size > 5 * 1024 * 1024) return;

    setValue('avatar', file, { shouldValidate: true });
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  return { preview, handleChange };
};
