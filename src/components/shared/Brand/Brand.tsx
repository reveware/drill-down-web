import { LogoDark, LogoLight } from '@/assets/images';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

export const Brand: React.FC = () => {
  return (
    <Link href="/" className="flex cursor-pointer items-center gap-2">
      <Image src={LogoDark} alt="Logo" width={56} height={56} className="rounded dark:hidden" />
      <Image
        src={LogoLight}
        alt="Logo"
        width={56}
        height={56}
        className="hidden rounded dark:block"
      />
      <span className="font-brand text-2xl font-bold tracking-widest">Drill Down</span>
    </Link>
  );
};
