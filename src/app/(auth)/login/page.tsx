'use client';

import { Button } from '@/components/shared/button/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useAuth } from '@/lib/auth/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  // If user is already authenticated, show logout option
  useEffect(() => {
    // Don't redirect automatically - let them choose to logout
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    // After logout, they'll stay on this page to login again
  };

  const handleGoToHome = () => {
    router.push('/home');
  };

  if (isAuthenticated) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Already Logged In</CardTitle>
          <CardDescription>
            You are currently logged in. You can go to the app or logout to login with a different
            account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleGoToHome} className="w-full" variant="primary">
            Go to App
          </Button>
          <Button onClick={handleLogout} className="w-full" variant="outline">
            Logout
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Please login to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Login form will be implemented next...
          </p>
          <Button className="w-full" disabled>
            Login (Coming Soon)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
