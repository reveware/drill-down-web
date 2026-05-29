'use client';
import { useAuth } from '@/hooks/useAuth';
import { SettingsForm } from '@/features/settings';
import { Spinner } from '@/components/shared';

export default function SettingsPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-4">
      <div>
        <h2 className="font-sans text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground text-sm">Manage your profile and privacy.</p>
      </div>
      <SettingsForm user={user} />
    </div>
  );
}
