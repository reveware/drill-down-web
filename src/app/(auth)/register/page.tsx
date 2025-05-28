'use client';

import { Delorean } from '@/assets/images';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { RegisterDto } from '@/types/auth';
import { useState } from 'react';
import Image from 'next/image';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (data: RegisterDto) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <div className="flex flex-col md:flex-row rounded-xl overflow-hidden shadow-lg w-full h-full neon-border md:max-w-5xl">
        <div className="relative w-full md:w-1/2 hidden md:block">
          <Image src={Delorean} alt="Delorean" fill className="object-cover" priority />
        </div>

        <div className="w-full md:w-1/2 overflow-y-auto flex items-center justify-center">
          <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
