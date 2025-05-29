'use client';

import { Delorean } from '@/assets/images';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { RegisterDto } from '@/types/auth';
import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '@/components/ui/card';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (data: RegisterDto) => {
    console.log(data);
    toast('handleRegister', { description: JSON.stringify(data) });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="flex flex-col md:flex-row rounded-xl overflow-hidden shadow-lg w-full h-full neon-border md:max-w-5xl">
        <div className="relative w-full md:w-1/2 hidden md:block">
          <Image src={Delorean} alt="Delorean" fill className="object-cover" priority />
        </div>

        <div className="w-full md:w-1/2 overflow-y-auto flex items-center justify-center">
          <Card className="w-full border-none shadow-none p-6">
            <CardHeader className="text-center">
              <CardTitle className="font-title text-2xl font-bold">Register</CardTitle>
              <CardDescription className="text-sm text-accent">
                Join our community today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
