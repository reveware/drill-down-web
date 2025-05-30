'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm, useLogin } from '@/features/auth';

export default function LoginPage() {
  const { mutate: login, isPending } = useLogin();

  return (
    <main className="flex flex-col items-center justify-evenly min-h-screen p-4">
      <h1 className="text-on-background text-6xl font-bold font-title">Drill Down</h1>

      <Card className="w-full max-w-md mx-auto card shadow-none p-6">
        <CardHeader className="text-center">
          <CardTitle className="font-title text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription className="text-sm text-accent">Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm onSubmit={login} isLoading={isPending} />
        </CardContent>
      </Card>
    </main>
  );
}
