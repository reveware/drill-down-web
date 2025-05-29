'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { LoginDto } from '@/types/auth';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/providers/auth-provider';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { Spinner } from '@/components/shared';

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const { mutate: login, isPending } = useLogin();
  const router = useRouter();

  const handleLogin = async (data: LoginDto) => {
    console.log('Login attempt:', data);
    login(data);
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/home');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading if auth is being checked or if user is authenticated (during navigation)
  if (isLoading || isAuthenticated) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col items-center justify-evenly min-h-screen p-4">
      <h1 className="text-primary text-6xl font-bold font-title">Drill Down</h1>

      <Card className="w-full max-w-md mx-auto card shadow-none p-6">
        <CardHeader className="text-center">
          <CardTitle className="font-title text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription className="text-sm text-accent">Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm onSubmit={handleLogin} isLoading={isPending} />
        </CardContent>
      </Card>
    </div>
  );
}
