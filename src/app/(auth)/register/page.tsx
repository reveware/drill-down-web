'use client';

import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { RegisterForm, SsoActions, useRegister } from '@/features/auth';

export default function RegisterPage() {
  const { mutate: register, isPending } = useRegister();

  return (
    <Card className="border-none p-4 shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="font-sans text-2xl font-bold">Register</CardTitle>
        <CardDescription className="text-primary text-sm">Join our community today</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm onSubmit={register} isLoading={isPending} />
        <SsoActions />
      </CardContent>
    </Card>
  );
}
