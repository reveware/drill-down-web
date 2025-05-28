'use client';

import { Button } from '@/components/shared/button/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function RegisterPage() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Sign up to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Registration form will be implemented next...
          </p>
          <Button className="w-full" disabled>
            Register (Coming Soon)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
