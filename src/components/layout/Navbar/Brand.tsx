import { Logo } from '@/app/assets/images';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

export const Brand: React.FC = () => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-1 cursor-pointer" onClick={() => router.push('/')}>
      <Image src={Logo} alt="Logo" width={48} height={48} className="rounded" />
      <span className="font-title text-xl font-bold tracking-widest">Drill Down</span>
    </div>
  );
};
