import { Logo } from '@/assets/images';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

export const Brand: React.FC = () => {
  return (
    <Link href="/" className="flex items-center gap-1 cursor-pointer">
      <Image src={Logo} alt="Logo" width={48} height={48} className="rounded" />
      <span className="font-title text-xl font-bold tracking-widest">Drill Down</span>
    </Link>
  );
};
