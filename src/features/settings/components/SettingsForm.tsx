'use client';

import { UserDetail } from '@/types/user';
import { PrivacyForm } from './PrivacyForm';
import { IdentityForm } from './IdentityForm';
import { PasswordForm } from './PasswordForm';

interface SettingsFormProps {
  user: UserDetail;
}

export const SettingsForm = ({ user }: SettingsFormProps) => {
  return (
    <div className="flex flex-col gap-5">
      <PrivacyForm user={user} />
      <IdentityForm user={user} />
      <PasswordForm hasPassword={user.has_password} ssoProviders={user.sso_providers} />
    </div>
  );
};
