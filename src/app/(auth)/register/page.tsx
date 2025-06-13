'use client';

import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { RegisterForm, useRegister } from '@/features/auth';
import Image from 'next/image';
import { Delorean } from '@/assets/images';

export default function RegisterPage() {
  const { mutate: register, isPending } = useRegister();

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="neon-border flex h-full w-full flex-col overflow-hidden rounded-xl shadow-lg md:max-w-5xl md:flex-row">
        <div className="relative hidden w-full md:block md:w-1/2">
          <Image src={Delorean} alt="Delorean" fill className="object-cover" priority />
        </div>

        <div className="flex w-full items-center justify-center overflow-y-auto md:w-1/2">
          <Card className="w-full border-none p-6 shadow-none">
            <CardHeader className="text-center">
              <CardTitle className="font-title text-2xl font-bold">Register</CardTitle>
              <CardDescription className="text-accent text-sm">
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
