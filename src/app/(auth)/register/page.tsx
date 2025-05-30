'use client';

import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { RegisterForm, useRegister } from '@/features/auth';
import Image from 'next/image';
import { Delorean } from '@/assets/images';

export default function RegisterPage() {
  const { mutate: register, isPending } = useRegister();

  return (
    <main className="flex items-center justify-center min-h-screen p-4">
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
              <RegisterForm onSubmit={register} isLoading={isPending} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
