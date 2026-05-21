'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm, SsoActions, useLogin } from '@/features/auth';

export default function LoginPage() {
  const { mutate: login, isPending } = useLogin();

  return (
    <Card className="border-none p-4 shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="font-sans text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription className="text-primary text-sm">Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm onSubmit={login} isLoading={isPending} />
        <SsoActions />
      </CardContent>
    </Card>
  );
}
