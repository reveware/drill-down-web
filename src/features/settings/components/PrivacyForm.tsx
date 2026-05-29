'use client';

import { UserDetail } from '@/types/user';
import { useUpdateUser } from '@/features/user';
import { Switch } from '@/components/ui/switch';
import { SettingsSection } from './SettingsSection';

interface PrivacyFormProps {
  user: UserDetail;
}

export const PrivacyForm = ({ user }: PrivacyFormProps) => {
  const { mutate, isPending } = useUpdateUser();

  return (
    <SettingsSection title="Privacy">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium">Private profile</p>
          <p className="text-muted-foreground mt-1 text-xs">
            Only your followers can see your posts and likes.
          </p>
        </div>
        <Switch
          checked={user.is_private}
          disabled={isPending}
          onCheckedChange={(next) => mutate({ is_private: next })}
        />
      </div>
    </SettingsSection>
  );
};
