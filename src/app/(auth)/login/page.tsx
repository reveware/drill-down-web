'use client';
import { redirect } from 'next/navigation';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { LoginDto } from '@/types/auth';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/providers/auth-provider';
import { useLogin } from '@/features/auth/hooks/useLogin';

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const { mutate: login } = useLogin();

  const handleLogin = async (data: LoginDto) => {
    console.log('Login attempt:', data);
    login(data);
  };

  if (isAuthenticated) {
    redirect('/home');
  }

  return (
    <div className="flex flex-col items-center justify-evenly min-h-screen p-4">
      <h1 className="text-primary text-6xl font-bold font-title">
        Drill Down
        {`${process.env.NEXT_PUBLIC_USE_MOCKS}`}
      </h1>

      <Card className="w-full max-w-md mx-auto card shadow-none p-6">
        <CardHeader className="text-center">
          <CardTitle className="font-title text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription className="text-sm text-accent">Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm onSubmit={handleLogin} isLoading={false} />
        </CardContent>
      </Card>
    </div>
  );
}
