'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OnboardingForm, useOnboarding } from '@/features/onboarding';

export default function OnboardingPage() {
  const { mutate: complete, isPending } = useOnboarding();

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-4">
      <h1 className="text-foreground font-sans text-6xl font-bold">Drill Down</h1>

      <Card className="card mx-auto w-full max-w-md p-6 shadow-none">
        <CardHeader className="text-center">
          <CardTitle className="font-sans text-2xl font-bold">Almost there</CardTitle>
          <CardDescription className="text-primary text-sm">
            Pick a username and confirm your date of birth
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OnboardingForm onSubmit={complete} isLoading={isPending} />
        </CardContent>
      </Card>
    </main>
  );
}
